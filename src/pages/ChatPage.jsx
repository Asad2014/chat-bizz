import React, { useState } from "react";
import SideDrawer from "../components/miscellanous/SideDrawer";
import MyChats from "../components/miscellanous/MyChats";
import ChatBox from "../components/miscellaneous/ChatBox";
import { chatState } from "../context/ChatProvider";

const ChatPage = () => {
  const { user } = chatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  if (!user) return null;

  return (
    <div className="w-full">
      <SideDrawer />
      <div className="flex justify-between w-full h-[91.5vh] p-4">
        <MyChats fetchAgain={fetchAgain} />
        <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </div>
    </div>
  );
};

export default ChatPage;
