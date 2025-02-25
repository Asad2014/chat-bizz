const UserListItem = ({ user, handleFunction }) => {
    return (
      <div
        className="flex items-center gap-4 bg-green-500 text-white rounded-lg mt-4 p-3 cursor-pointer hover:bg-green-600 transition"
        onClick={() => handleFunction(user)}
      >
        <img
          src={user.pic}
          alt="User"
          className="w-12 h-12 object-cover rounded-full"
        />
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-xs text-gray-200">
            <b>Email: </b>{user.email}
          </p>
        </div>
      </div>
    );
  };
  
  export default UserListItem;
  