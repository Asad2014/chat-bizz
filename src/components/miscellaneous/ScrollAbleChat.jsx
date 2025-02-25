"use client";

import React from "react";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "../../config/ChatLogics";
import ScrollToBottom from "react-scroll-to-bottom";
import clsx from "clsx";
import { chatState } from "../../context/ChatProvider";

const ScrollAbleChat = ({ messages }) => {
  const { user } = chatState();

  return (
    <ScrollToBottom className="h-full overflow-y-auto pb-16"> {/* Smooth scroll enabled */}
      {messages?.map((m, i) => (
        <div key={m._id} className={clsx("flex items-center mb-2", {
          "justify-end": m.sender._id === user._id,
          "justify-start": m.sender._id !== user._id
        })}>
          {(isSameSender(messages, m, i, user._id) || isLastMessage(messages, i, user._id)) && (
            <img
              src={m.sender.pic}
              alt="User"
              className="w-8 h-8 rounded-full object-cover mr-2"
            />
          )}

          <span className={clsx(
            "rounded-xl px-4 py-2 max-w-[75%] text-sm shadow-md",
            {
              "bg-purple-700 text-white": m.sender._id === user._id,
              "bg-green-300 text-black": m.sender._id !== user._id,
            }
          )}
          style={{
            marginLeft: isSameSenderMargin(messages, m, i, user._id),
            marginTop: isSameUser(messages, m, i, user._id) ? "5px" : "12px",
          }}>
            {m.content}
          </span>
        </div>
      ))}
    </ScrollToBottom>
  );
};

export default ScrollAbleChat;
