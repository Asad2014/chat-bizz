
import { useContext, useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import UpdateGroupChatModal from "./UpdateGroupChatModal.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import ScrollAbleChat from "./ScrollAbleChat.jsx";
import { io } from "socket.io-client";
import { chatState } from "../../context/ChatProvider.jsx";
import UserProfileModal from "./UserProfileModal.jsx";
import { getSender, getSenderFull } from "../../config/ChatLogics.jsx";

const ENDPOINT = "https://chatapp-production-31d4.up.railway.app";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = chatState();
  const [showModal, setShowModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);
      const { data } = await axios.get(
        `${ENDPOINT}/api/message/${selectedChat._id}`,
        config
      );

      if (!Array.isArray(data)) {
        toast.error("Unexpected response format from server");
        return;
      }

      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast.error("Failed to Load Messages");
    }
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  const sendMessage = async () => {
    if (!newMessage || !selectedChat || !user) return;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const messageToSend = newMessage;
      setNewMessage("");

      const { data } = await axios.post(
        `${ENDPOINT}/api/message`,
        { content: messageToSend, chatId: selectedChat._id },
        config
      );

      socket.emit("send Message", data);
      setMessages([...messages, data]);
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
        // Handle notification
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  return (
    <>
      {selectedChat ? (
        <>
          {!selectedChat.isGroupChat && (
            <UserProfileModal show={showModal} onClose={() => setShowModal(false)} user={getSenderFull(user, selectedChat.users)} />
          )}

          <div className="flex flex-col justify-end w-full h-full p-4 bg-gray-400 border border-white/30 shadow-lg rounded-lg mt-4 overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="messages overflow-y-auto max-h-[60vh] p-2">
                <ScrollAbleChat messages={messages} />
              </div>
            )}

            <div className="flex items-center mt-3 w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg">
              <input
                type="text"
                placeholder="Enter your message..."
                className="flex-1 px-4 py-2 text-white bg-transparent outline-none"
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
                onKeyDown={(event) => event.key === "Enter" && sendMessage()}
                required
              />
              <button onClick={sendMessage} className="p-3 text-blue-600 hover:text-gray-300">
                <IoSend size={24} />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-xl text-gray-300">Click on a user to start chatting</p>
        </div>
      )}
    </>
  );
};

export default SingleChat;
