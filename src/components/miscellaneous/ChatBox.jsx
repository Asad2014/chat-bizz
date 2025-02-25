import React from 'react'
import { chatState } from '../../context/ChatProvider'
import SingleChat from './SingleChat'

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = chatState()

  return (
    <div 
      className={`
        flex flex-col items-center p-3
        ${selectedChat ? 'flex' : 'hidden md:flex'}
        w-full md:w-[68%] 
        rounded-lg border border-white/30 shadow-lg 
        bg-white
      `}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  )
}

export default ChatBox
