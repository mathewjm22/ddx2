import React from 'react';

const ConfirmationModal = ({ show, specialty, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="glass-modal-content p-8 rounded-lg text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">Start Case</h2>
        <p className="mb-6">Do you want to generate a new {specialty} case?</p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={onConfirm}
            className="glass-button py-2 px-6 rounded-lg font-semibold"
          >
            Confirm
          </button>
          <button 
            onClick={onCancel}
            className="bg-gray-600/50 hover:bg-gray-600/80 py-2 px-6 rounded-lg font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
