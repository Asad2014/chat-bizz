import { useState } from "react";
import axios from "axios";
import UserBadgeItem from "../../UserAvatar/UserBadgeItem";
import UserListItem from "../../UserAvatar/UserListItem";
import { chatState } from "../../context/ChatProvider";


const GroupChatModal = ({ children }) => {
  const [show, setShow] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = chatState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      alert("User already added");
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) return;

    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.get(
        `https://chatapp-production-31d4.up.railway.app/api/user?search=${query}`,
        config
      );
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      alert("Failed to Load the Search Results");
      setLoading(false);
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers.length) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.post(
        `https://chatapp-production-31d4.up.railway.app/api/chat/group`,
        { name: groupChatName, users: JSON.stringify(selectedUsers.map((u) => u._id)) },
        config
      );
      setChats([data, ...chats]);
      handleClose();
      alert("New Group Chat Created!");
    } catch (error) {
      alert("Failed to Create the Chat");
    }
  };

  return (
    <>
      <span onClick={handleShow}>{children}</span>

      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            {/* Header */}
            <div className="flex justify-between items-center pb-3 border-b">
              <h2 className="text-xl font-semibold">Create Group Chat</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-red-500 transition"
              >
                ✕
              </button>
            </div>

            {/* Chat Name Input */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Chat Name"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </div>

            {/* User Search Input */}
            <div className="mt-3">
              <input
                type="text"
                placeholder="Add Users (e.g., John, Piyush, Jane)"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            {/* Selected Users Badges */}
            <div className="flex flex-wrap mt-3 space-x-2">
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </div>

            {/* Search Results */}
            <div className="mt-3 space-y-2">
              {loading ? (
                <div className="text-center text-blue-500">Loading...</div>
              ) : (
                searchResult?.slice(0, 4).map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
              )}
            </div>

            {/* Buttons */}
            <div className="mt-5 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                onClick={handleSubmit}
              >
                Create Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupChatModal;
