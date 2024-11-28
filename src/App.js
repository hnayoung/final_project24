import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LeftPane from "./component/LeftPane/LeftPane";
import RightPane from "./component/RightPane/RightPane";
import Introduce from "./pages/Introduce/Introduce";

function App() {
  const [activeChat, setActiveChat] = useState([]);
  const [savedChats, setSavedChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [width, setWidth] = useState(300);
  const [profileImageUrl, setProfileImageUrl] = useState("");

  useEffect(() => {
    // 프로필 이미지 URL 백엔드에서 가져오기
    fetch("https://your-backend-api/profile-url")
      .then((response) => response.json())
      .then((data) => setProfileImageUrl(data.url))
      .catch((error) => console.error("Error fetching profile image:", error));
  }, []);

  const createNewChat = () => {
    saveCurrentChat();
    const newChatId = `chat-${Date.now()}`;
    const newChat = { id: newChatId, name: `Chat ${savedChats.length + 1}`, content: [] };
    setSavedChats((prevChats) => [...prevChats, newChat]);
    setActiveChat([]);
    setCurrentChatId(newChatId);
  };

  const saveCurrentChat = () => {
    if (!currentChatId) return;
    setSavedChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === currentChatId ? { ...chat, content: activeChat } : chat
      )
    );
  };

  const loadChat = (chatId) => {
    saveCurrentChat();
    const chatToLoad = savedChats.find((chat) => chat.id === chatId);
    if (chatToLoad) {
      setActiveChat(chatToLoad.content);
      setCurrentChatId(chatId);
    }
  };

  const updateChatTitle = (chatId, newTitle) => {
    setSavedChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId ? { ...chat, name: newTitle } : chat
      )
    );
  };

  const deleteChat = (chatId) => {
    setSavedChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
    if (currentChatId === chatId) {
      setActiveChat([]);
      setCurrentChatId(null);
    }
  };

  const handleResize = (newWidth) => {
    setWidth(newWidth);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Introduce />} />
        <Route
          path="/main"
          element={
            <div style={{ display: "flex", height: "100vh" }}>
              <LeftPane
                savedChats={savedChats}
                setSavedChats={setSavedChats}
                createNewChat={createNewChat}
                loadChat={loadChat}
                updateChatTitle={updateChatTitle}
                deleteChat={deleteChat}
                width={width}
                onResize={handleResize}
                profileImageUrl={profileImageUrl} // 프로필 이미지 URL 전달
              />
              <RightPane
                activeChat={activeChat}
                setActiveChat={setActiveChat}
              />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
