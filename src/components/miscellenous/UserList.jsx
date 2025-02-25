import React from "react";

const UserList = ({ user, handleFunction }) => {
  return (
    <div
      onClick={handleFunction}
      className="flex items-center gap-4 p-3 bg-white hover:bg-gray-100 rounded-lg shadow-md cursor-pointer transition-all duration-200"
    >
      <img
        src={user.pic}
        alt={user.name}
        className="w-12 h-12 rounded-full border-2 border-gray-200"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </div>
  );
};

export default UserList;
