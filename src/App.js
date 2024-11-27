import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LeftPane from "./component/LeftPane/LeftPane";
import RightPane from "./component/RightPane/RightPane";
import Introduce from "./pages/Introduce/Introduce";

function App() {
  const [activeChat, setActiveChat] = useState([]); // 현재 활성화된 대화 내용
  const [savedChats, setSavedChats] = useState([]); // 저장된 대화 리스트
  const [currentChatId, setCurrentChatId] = useState(null); // 현재 활성화된 대화 ID
  const [width, setWidth] = useState(300); // LeftPane의 너비

  const createNewChat = () => {
    saveCurrentChat(); // 현재 채팅 저장
    const newChatId = `chat-${Date.now()}`;
    const newChat = { id: newChatId, name: `Chat ${savedChats.length + 1}`, content: [] };
    setSavedChats((prevChats) => [...prevChats, newChat]); // 새로운 채팅 저장
    setActiveChat([]); // 새로운 채팅 내용 초기화
    setCurrentChatId(newChatId); // 새로운 채팅 ID 설정
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
    saveCurrentChat(); // 현재 대화 저장
    const chatToLoad = savedChats.find((chat) => chat.id === chatId);
    if (chatToLoad) {
      setActiveChat(chatToLoad.content); // 선택된 대화 내용 로드
      setCurrentChatId(chatId); // 선택된 대화 ID 설정
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
      setActiveChat([]); // 현재 대화 초기화
      setCurrentChatId(null); // ID 초기화
    }
  };

  const handleResize = (newWidth) => {
    setWidth(newWidth);
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Introduce />} />
          <Route
            path="/main"
            element={
              <div style={{ display: "flex", height: "100vh" }}>
                <LeftPane
                  savedChats={savedChats} // 저장된 대화 전달
                  setSavedChats={setSavedChats} // setSavedChats 전달
                  createNewChat={createNewChat}
                  loadChat={loadChat}
                  updateChatTitle={updateChatTitle}
                  deleteChat={deleteChat}
                  width={width}
                  onResize={handleResize}
                />
                <RightPane
                  activeChat={activeChat} // 활성화된 대화 전달
                  setActiveChat={setActiveChat} // 대화 업데이트 함수 전달
                />
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
