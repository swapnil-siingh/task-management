import { useState } from "react";
import { useTaskStore } from "../store/useTaskStore";

export default function AddTaskModal() {
    const addTask = useTaskStore((state) => state.addTask);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !dueDate) return;

        addTask({
            title,
            description,
            dueDate: new Date(dueDate),
            completed: false,
        });

        setTitle("");
        setDescription("");
        setDueDate("");

        const dialog = document.getElementById("add-task-modal");
        dialog.close();
    };

    return (
        <dialog
            id="add-task-modal"
            className="p-6 rounded-lg shadow-xl dark:bg-zinc-900 dark:text-white w-4/6 max-w-screen-md  md:w-[350px]">
            <form
                onSubmit={handleSubmit}
                className="space-y-4 ">
                <h2 className="text-xl font-bold mb-4">Add New Task</h2>

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
                        className="w-full px-3 py-2 border rounded dark:bg-transparent dark:border-zinc-600 overflow-auto scrollbar-hide"
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
                        className="w-full px-3 py-2 border rounded dark:border-zinc-600 hover:cursor-pointer dark:text-black dark:invert dark:bg-transparent"
                        required
                    />
                </div>

                <div className="flex justify-end gap-2 mt-6">
                    <button
                        type="button"
                        onClick={() => {
                            const dialog =
                                document.getElementById("add-task-modal");
                            dialog.close();
                        }}
                        className="px-4 py-2 text-zinc-600 dark:text-zinc-300">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Add Task
                    </button>
                </div>
            </form>
        </dialog>
    );
}
