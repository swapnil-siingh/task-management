import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { format } from "date-fns";
import { Trash2, GripVertical, Edit2 } from "lucide-react";
import { useTaskStore } from "../store/useTaskStore";
import { EditTaskModal } from "./EditTaskModal";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { isOverdue } from "../utils/dateUtils";

export function TaskItem({ task }) {
    const { updateTask, deleteTask } = useTaskStore();
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const handleDelete = () => {
        const dialog = document.getElementById("delete-confirmation");
        dialog.showModal();
    };

    const handleEdit = () => {
        const dialog = document.getElementById(`edit-task-modal-${task.id}`);
        dialog.showModal();
    };

    const confirmDelete = () => {
        deleteTask(task.id);
        const dialog = document.getElementById("delete-confirmation");
        dialog.close();
    };

    const cancelDelete = () => {
        const dialog = document.getElementById("delete-confirmation");
        dialog.close();
    };

    return (
        <>
            <div
                ref={setNodeRef}
                style={style}
                className={`flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 rounded-lg shadow ${
                    isOverdue(task) ? "border-l-4 border-red-500" : ""
                }`}>
                <button
                    {...attributes}
                    {...listeners}>
                    <GripVertical className="text-zinc-400" />
                </button>

                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={(e) =>
                        updateTask(task.id, { completed: e.target.checked })
                    }
                    className="w-5 h-5"
                />

                <div className="flex-1">
                    <h3
                        className={`font-medium ${
                            task.completed ? "line-through text-zinc-400" : ""
                        }`}>
                        {task.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {task.description}
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">
                        Due: {format(task.dueDate, "PPP")}
                    </p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handleEdit}
                        className="text-blue-500 hover:text-blue-600">
                        <Edit2 size={20} />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="text-red-500 hover:text-red-600">
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>

            <EditTaskModal task={task} />
            <DeleteConfirmation
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </>
    );
}
