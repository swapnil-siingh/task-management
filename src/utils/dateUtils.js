import { format, isToday, isTomorrow, isYesterday, isAfter } from "date-fns";

/**
 * @param {Date} date
 * @returns {string}
 */
export function getRelativeDate(date) {
    if (isYesterday(date)) return "Yesterday";
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "PPP");
}

/**
 * @param {{dueDate: Date, completed: boolean}} task
 * @returns {boolean}
 */
export function isOverdue(task) {
    return !task.completed && isAfter(new Date(), task.dueDate);
}
