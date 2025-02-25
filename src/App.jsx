import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ChatPage from './pages/ChatPage'

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/chat" element={<ChatPage/>}/>
      </Routes>
    </div>
  )
}

export default App
