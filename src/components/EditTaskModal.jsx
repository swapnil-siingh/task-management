import { useState, useEffect } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { format } from "date-fns";

export function EditTaskModal({ task }) {
    const updateTask = useTaskStore((state) => state.updateTask);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState(format(task.dueDate, "yyyy-MM-dd"));

    useEffect(() => {
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(format(task.dueDate, "yyyy-MM-dd"));
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !dueDate) return;

        updateTask(task.id, {
            title,
            description,
            dueDate: new Date(dueDate),
        });

        const dialog = document.getElementById(`edit-task-modal-${task.id}`);
        dialog.close();
    };

    return (
        <dialog
            id={`edit-task-modal-${task.id}`}
            className="p-6 rounded-lg shadow-xl dark:bg-zinc-900 dark:text-white">
            <form
                onSubmit={handleSubmit}
                className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Edit Task</h2>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border rounded dark:bg-transparent dark:border-zinc-600"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border rounded dark:bg-transparent  dark:border-zinc-600"
                        rows={3}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Due Date
                    </label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full px-3 py-2 border rounded dark:bg-transparent dark:invert dark:text-black dark:border-zinc-600"
                        required
                    />
                </div>

                <div className="flex justify-end gap-2 mt-6">
                    <button
                        type="button"
                        onClick={() => {
                            const dialog = document.getElementById(
                                `edit-task-modal-${task.id}`
                            );
                            dialog.close();
                        }}
                        className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Save Changes
                    </button>
                </div>
            </form>
        </dialog>
    );
}
