import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LeftPane from "./component/LeftPane/LeftPane";
import RightPane from "./component/RightPane/RightPane";
import Introduce from "./pages/Introduce/Introduce";
import Login from "./pages/Login/Login";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [activeChat, setActiveChat] = useState([]);
  const [savedChats, setSavedChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [width, setWidth] = useState(300);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가
  const [repositories, setRepositories] = useState([]); // Repositories 상태 추가

  useEffect(() => {
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

  const fetchRepositories = async (githubUrl) => {
    try {
      const username = githubUrl.split("github.com/")[1]; // URL에서 username 추출
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      const data = await response.json();

      if (response.ok) {
        setRepositories(data); // Repository 상태 업데이트
      } else {
        alert("Failed to fetch repositories. Please check the GitHub URL.");
      }
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Introduce />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/main"
          element={
            <div style={{ display: "flex", height: "100vh" }}>
              <LeftPane
                activeChat={activeChat}
                setActiveChat={setActiveChat} // setActiveChat 전달
                savedChats={savedChats}
                setSavedChats={setSavedChats}
                createNewChat={createNewChat}
                loadChat={loadChat}
                updateChatTitle={updateChatTitle}
                deleteChat={deleteChat}
                width={width}
                onResize={handleResize}
                profileImageUrl={profileImageUrl}
                openRepositoryModal={() => setShowModal(true)} // 모달 열기 함수 전달
                repositories={repositories} // Repository 상태 전달
                setRepositories={setRepositories}
              />
              <RightPane
                activeChat={activeChat}
                setActiveChat={setActiveChat}
                fetchRepositories={fetchRepositories} // Repository fetch 함수 전달
                showModal={showModal}
                setShowModal={setShowModal}
              />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
