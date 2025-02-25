import { IoMdCloseCircleOutline } from "react-icons/io";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <div
      className="flex items-center bg-purple-500 text-white text-sm font-medium px-3 py-1 rounded-lg m-1 cursor-pointer transition hover:bg-purple-600"
      onClick={handleFunction}
    >
      <span>{user?.name || "No Name Available"}</span>
      <IoMdCloseCircleOutline className="ml-1 text-lg" />
    </div>
  );
};

export default UserBadgeItem;
