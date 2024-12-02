import { create } from "zustand";

export const useTaskStore = create((set) => ({
    tasks: [],

    addTask: (task) =>
        set((state) => ({
            tasks: [
                ...state.tasks,
                {
                    ...task,
                    id: crypto.randomUUID(),
                    createdAt: new Date(),
                },
            ],
        })),

    updateTask: (id, updatedTask) =>
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === id ? { ...task, ...updatedTask } : task
            ),
        })),

    deleteTask: (id) =>
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id),
        })),

    reorderTasks: (tasks) =>
        set(() => ({
            tasks,
        })),
}));
