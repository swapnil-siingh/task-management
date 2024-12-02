import { useMemo, useState } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useTaskStore } from "../store/useTaskStore";
import { Task } from "../types/task";
import { TaskItem } from "./TaskItem";
import { TaskFilters } from "./TaskFilters";
import { Plus } from "lucide-react";
import { isOverdue } from "../utils/dateUtils";
import { isToday, isTomorrow, isYesterday } from "date-fns";

export default function TaskList() {
    const { tasks, reorderTasks } = useTaskStore();
    const [search, setSearch] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            if (
                search &&
                !task.title.toLowerCase().includes(search.toLowerCase())
            ) {
                return false;
            }

            if (dateFilter) {
                if (
                    (dateFilter === "yesterday" &&
                        !isYesterday(task.dueDate)) ||
                    (dateFilter === "today" && !isToday(task.dueDate)) ||
                    (dateFilter === "tomorrow" && !isTomorrow(task.dueDate))
                ) {
                    return false;
                }
            }

            switch (statusFilter) {
                case "completed":
                    if (!task.completed) return false;
                    break;
                case "pending":
                    if (task.completed) return false;
                    break;
                case "overdue":
                    if (!isOverdue(task)) return false;
                    break;
            }

            return true;
        });
    }, [tasks, search, dateFilter, statusFilter]);

    function handleDragEnd(event) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = tasks.findIndex((task) => task.id === active.id);
        const newIndex = tasks.findIndex((task) => task.id === over.id);
        const newTasks = arrayMove(tasks, oldIndex, newIndex);
        reorderTasks(newTasks);
    }

    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            <div className="flex justify-end mb-6">
                <button
                    onClick={() => {
                        const modal = document.getElementById("add-task-modal");
                        modal.showModal();
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    <Plus size={20} /> Add Task
                </button>
            </div>

            <TaskFilters
                onSearchChange={setSearch}
                onDateFilterChange={setDateFilter}
                onStatusFilterChange={setStatusFilter}
            />

            {filteredTasks.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">
                        No tasks found
                    </p>
                </div>
            ) : (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}>
                    <SortableContext
                        items={filteredTasks}
                        strategy={verticalListSortingStrategy}>
                        <div className="space-y-3">
                            {filteredTasks.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            )}
        </div>
    );
}
