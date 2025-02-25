import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoAddCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./GroupChatModal";
import { chatState } from "../../context/ChatProvider";
import { getSender } from "../../config/ChatLogics";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } = chatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`https://chatapp-production-31d4.up.railway.app/api/chat`, config);
      setChats(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <div
      className={`${
        selectedChat ? "hidden" : "flex"
      } md:flex flex-col w-full md:w-1/4 bg-gray-500 text-white p-4 rounded-lg shadow-lg`}
    >
      {/* Header */}
      <div className="flex justify-center items-center pb-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold">My Chats</h2>
        {/* <GroupChatModal>
          <button className="flex items-center gap-2 bg-blue-700 hover:bg-blue-900 px-4 py-2 rounded-lg text-white font-medium transition">
            <IoAddCircleOutline size={20} />
            New Group
          </button>
        </GroupChatModal> */}
      </div>

      {/* Chat List */}
      <div className="mt-4 space-y-2 overflow-y-auto h-[calc(100vh-150px)]">
        {chats ? (
          chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => setSelectedChat(chat)}
              className="flex items-center gap-4 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg cursor-pointer transition"
            >
              <img
                src={
                  chat.users.find((u) => u._id !== loggedUser?._id)?.pic ||
                  "https://via.placeholder.com/50"
                }
                alt="User"
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
              />
              <h3 className="text-lg font-medium">
                {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
              </h3>
            </div>
          ))
        ) : (
          <ChatLoading />
        )}
      </div>
    </div>
  );
};

export default MyChats;
