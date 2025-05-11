import type { FC } from "react";

interface DeleteConfirmModalProps {
  carName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal: FC<DeleteConfirmModalProps> = ({
  carName,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className="bg-white rounded-2xl shadow-xl px-10 py-8 w-[380px] flex flex-col items-center gap-6 animate-fadeIn"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
      >
        <img
          src="src/assets/DELETE_ICON.svg"
          alt="Delete Icon"
          className="w-6 h-6"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <h2 id="delete-modal-title" className="text-lg font-bold text-center">
          Delete <span className="text-black">{carName}</span>?
        </h2>
        <p className="text-sm text-center text-gray-500">
          Are you sure you want to delete this car?
        </p>
        <div className="flex gap-4 mt-2">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
