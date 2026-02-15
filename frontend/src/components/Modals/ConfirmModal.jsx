import './index.css'

const ConfirmModal = ({
    title = "Are you sure?",
    message = "This action cannot be undone.",
    confirmText = "Confirm",
    cancelText = "Cancel",
    confirmColor = "#e11d48", 
    onConfirm,
    onCancel
}) => {
    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
                <h3 className="confirm-title">{title}</h3>
                <p className="confirm-message">{message}</p>
                <div className="confirm-actions">
                    <button
                        className="confirm-cancel-btn"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>

                    <button
                        className="confirm-confirm-btn"
                        style={{ backgroundColor: confirmColor }}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal