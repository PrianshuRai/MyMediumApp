interface DialogProps {
    message: string;
    isOpen: boolean;
    onClose?: () => void;
}

export const Dialog = ({ message, isOpen, onClose }: DialogProps) => {
    if (!isOpen) return null;
    return (
        <dialog className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" open>
            <div>
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-lg font-bold">{message}</h2>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </dialog>
    )
}