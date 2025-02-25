
import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import { toast } from "react-toastify";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserList from "./UserList";
import { chatState } from "../../context/ChatProvider";
import { IoIosNotifications } from "react-icons/io";

const SideDrawer = () => {
  const { user, setSelectedChat, chats, setChats } = chatState();
  const [showProfile, setShowProfile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logouthandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast.warning("Please enter a search term");
      return;
    }
    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(
        `https://chatapp-production-31d4.up.railway.app/api/user?search=${search}`,
        config
      );
      setSearchResult(data);
    } catch (error) {
      toast.error("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = { headers: { "content-type": "application/json", Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post(`https://chatapp-production-31d4.up.railway.app/api/chat`, { userId }, config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setIsDrawerOpen(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingChat(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center bg-purple-500 p-3 border-b border-gray-700 relative">
        {/* Search Button */}
        <button className="flex items-center text-white" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
          <IoSearchSharp size={20} className="mr-2" />
          <span className="hidden md:inline">Search </span>
        </button>

        


          {/* Profile Dropdown */}
          <div className="relative">
            <img
              src={user.pic}
              alt={user.name}
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            />

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                <button
                  className="block w-full text-left text-black px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setShowProfile(true);
                    setMenuOpen(false);
                  }}
                >
                  Profile
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  onClick={logouthandler}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      

      {/* Profile Modal */}
      {showProfile && <ProfileModal user={user} onClose={() => setShowProfile(false)} />}

      {/* Search Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex">
          <div className="bg-gray-900 w-80 p-5 h-full overflow-y-auto">
            <h2 className="text-white text-lg font-semibold mb-3">Search </h2>
            <div className="flex mb-3">
              <input
                type="text"
                placeholder="Search by Name or Email"
                className="flex-1 p-2 rounded bg-gray-800 text-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button onClick={handleSearch} className="ml-2 p-2 bg-green-500 text-white rounded">
                Search
              </button>
            </div>
            {loading ? (
              <ChatLoading />
            ) : searchResult.length > 0 ? (
              searchResult.map((user) => (
                <UserList key={user._id} user={user} handleFunction={() => accessChat(user._id)} />
              ))
            ) : (
              <p className="text-white">No users found.</p>
            )}
            {loadingChat && <p className="text-white">Loading chat...</p>}
            <button className="mt-4 p-2 w-full bg-red-500 text-white rounded" onClick={() => setIsDrawerOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SideDrawer;
