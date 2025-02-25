import React from "react";

const UserProfileModal = ({ show, onClose, user }) => {
  if (!show || !user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg w-96 border border-white/20">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
        >
          ✕
        </button>
        <div className="text-center">
          <img
            src={user.pic || "https://via.placeholder.com/150"}
            alt={user.name}
            className="w-24 h-24 mx-auto rounded-full border-4 border-green-400 shadow-lg"
          />
          <h4 className="mt-3 text-xl font-bold text-white">{user.name}</h4>
          <p className="text-gray-300">{user.email}</p>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
