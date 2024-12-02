export function DeleteConfirmation({
    onConfirm,
    onCancel,
    dialogId = "delete-confirmation",
}) {
    return (
        <dialog
            id={dialogId}
            className="p-6 rounded-lg shadow-xl dark:bg-zinc-800 dark:text-white"
            aria-labelledby={`${dialogId}-title`}
            aria-describedby={`${dialogId}-description`}>
            <div className="space-y-4">
                <h2
                    id={`${dialogId}-title`}
                    className="text-xl font-bold">
                    Delete Task
                </h2>
                <p id={`${dialogId}-description`}>
                    Are you sure you want to delete this task?
                </p>

                <div className="flex justify-end gap-2 mt-6">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-zinc-600 dark:text-zinc-300"
                        autoFocus>
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        Delete
                    </button>
                </div>
            </div>
        </dialog>
    );
}

export default DeleteConfirmation;
