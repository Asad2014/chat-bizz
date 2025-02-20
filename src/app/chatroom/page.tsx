
"use client";
import React, { useState } from "react";
import { auth } from "@/firebaseConfig"; 
import LogoutButton from "@/app/components/LogoutButton"; 

const ChatRoom = () => {
  const [messages, setMessages] = useState<{ id: string; text: string; user: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: Date.now().toString(),
        text: newMessage,
        user: auth.currentUser?.email || "Anonymous",
      };
      setMessages((prevMessages) => [...prevMessages, newMsg]);
      setNewMessage(""); 
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-500 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">Chat Room</h2>
        <LogoutButton /> 
      </div>

      <div className="h-96 overflow-y-scroll p-4 border-b">
        {messages.map((message) => (
          <div key={message.id} className="mb-4">
            <div className="bg-white p-3 rounded-lg">
              <span className="text-sm text-gray-500">{message.user || "User"}</span>
              <p className="mt-1 text-gray-800">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center mt-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg mr-4"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;


