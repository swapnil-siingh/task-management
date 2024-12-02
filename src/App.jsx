import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import TaskList from "./components/TaskList"; // Assuming these are default exports
import AddTaskModal from "./components/AddTaskModal";

function App() {
    // Initialize dark mode state with localStorage or system preference
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem("darkMode");
        if (savedMode !== null) {
            return JSON.parse(savedMode);
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    // Toggle dark mode classes on the HTML element
    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    return (
        <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 dark:text-white">
            {/* Header */}
            <header className="bg-white dark:bg-zinc-800 shadow">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Task Manager</h1>
                        <button
                            onClick={() => setDarkMode((prev) => !prev)}
                            className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700"
                            aria-label="Toggle dark mode">
                            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                <TaskList />
                <AddTaskModal />
            </main>
        </div>
    );
}

export default App;
