import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { chatState } from "../../context/ChatProvider";
import UserBadgeItem from "../../UserAvatar/UserBadgeItem";
import UserListItem from "../../UserAvatar/UserListItem";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const [show, setShow] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const { user, selectedChat, setSelectedChat } = chatState();

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast.error("Only admins can remove members!");
      return;
    }
    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.put(
        "https://chatapp-production-31d4.up.railway.app/api/chat/removegroup",
        { chatId: selectedChat._id, userId: user1._id },
        config
      );
      user1._id === user._id ? setSelectedChat(null) : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast.warning("User already exists!");
      return;
    }
    if (selectedChat.groupAdmin._id !== user._id) {
      toast.warning("Only admins can add members!");
      return;
    }
    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.put(
        "https://chatapp-production-31d4.up.railway.app/api/chat/addgroup",
        { chatId: selectedChat._id, userId: user1._id },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;
    try {
      setRenameLoading(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.put(
        "https://chatapp-production-31d4.up.railway.app/api/chat/rename",
        { chatId: selectedChat._id, chatName: groupChatName },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  return (
    <>
      <button
        className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600"
        onClick={() => setShow(true)}
      >
        Group's Setting
      </button>

      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-md border border-white/30">
            <h2 className="text-xl font-bold text-white text-center mb-4">
              {selectedChat.chatName}
            </h2>

            <div className="flex flex-wrap gap-2 mb-4">
              {selectedChat.users.map((u) => (
                <UserBadgeItem key={u._id} user={u} handleFunction={() => handleRemove(u)} />
              ))}
            </div>

            <input
              type="text"
              placeholder="Enter new chat name"
              className="w-full px-3 py-2 bg-gray-800 text-white rounded-md mb-3 focus:outline-none"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
            <button
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 mb-3"
              onClick={handleRename}
              disabled={renameLoading}
            >
              {renameLoading ? "Updating..." : "Update"}
            </button>

            <input
              type="text"
              placeholder="Add Users"
              className="w-full px-3 py-2 bg-gray-800 text-white rounded-md mb-3 focus:outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />

            {searchResult?.map((user) => (
              <UserListItem key={user._id} user={user} handleFunction={() => handleAddUser(user)} />
            ))}

            <div className="flex justify-between mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={() => handleRemove(user)}
              >
                Leave Group
              </button>
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                onClick={() => setShow(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateGroupChatModal;