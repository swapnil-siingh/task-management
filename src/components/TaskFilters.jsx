import { useState } from "react";
import { Search } from "lucide-react";

export const TaskFilters = ({
    onSearchChange,
    onDateFilterChange,
    onStatusFilterChange,
}) => {
    const [search, setSearch] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const handleSearchChange = (value) => {
        setSearch(value);
        onSearchChange(value);
    };

    const handleDateFilterChange = (value) => {
        setDateFilter(value);
        onDateFilterChange(value);
    };

    const handleStatusFilterChange = (value) => {
        setStatusFilter(value);
        onStatusFilterChange(value);
    };

    return (
        <div className="space-y-4 mb-6">
            {/* Search Input */}
            <div className="relative">
                <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
                    size={20}
                />
                <input
                    type="text"
                    placeholder="Search tasks by title or description..."
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded border dark:bg-zinc-900 dark:border-zinc-700"
                    aria-label="Search tasks"
                />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Date Filter */}
                <select
                    value={dateFilter}
                    onChange={(e) => handleDateFilterChange(e.target.value)}
                    className="px-4 py-2 rounded border dark:bg-zinc-900 dark:border-zinc-700"
                    aria-label="Filter by date">
                    <option value="">All Days</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="today">Today</option>
                    <option value="tomorrow">Tomorrow</option>
                </select>

                {/* Status Filter */}
                <select
                    value={statusFilter}
                    onChange={(e) => handleStatusFilterChange(e.target.value)}
                    className="px-4 py-2 rounded border dark:bg-zinc-900 dark:border-zinc-700"
                    aria-label="Filter by status">
                    <option value="all">All Tasks</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="overdue">Overdue</option>
                </select>
            </div>
        </div>
    );
};

export default TaskFilters;
