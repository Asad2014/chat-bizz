import React from "react";

const ProfileModal = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg w-96 p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold text-gray-800">User Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✖
          </button>
        </div>

        {/* Profile Picture & Info */}
        <div className="flex flex-col items-center py-4">
          <img
            src={user.pic}
            alt={user.name}
            className="w-28 h-28 rounded-full border-4 border-gray-200 shadow-md"
          />
          <h3 className="mt-3 text-xl font-bold text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        {/* Footer */}
        <div className="mt-4">
          <button
            onClick={onClose}
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
