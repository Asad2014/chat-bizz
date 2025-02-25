import React from "react";

const ChatLoading = () => {
  return (
    <div className="flex gap-5">
      <div className="flex-1 space-y-4">
        <div className="h-12 bg-gray-300 animate-pulse rounded-md"></div>
        <div className="h-12 bg-gray-300 animate-pulse rounded-md"></div>
        <div className="h-12 bg-gray-300 animate-pulse rounded-md"></div>
        <div className="h-12 bg-gray-300 animate-pulse rounded-md"></div>
      </div>
    </div>
  );
};

export default ChatLoading;