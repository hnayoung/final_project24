import React, { useState } from "react";
import "./LeftPane.css";
import { Container } from "react-bootstrap";

const LeftPane = ({
  savedChats,
  setSavedChats,
  createNewChat,
  loadChat,
  updateChatTitle,
  deleteChat,
  width,
  onResize,
  profileImageUrl = "https://avatars.githubusercontent.com/u/9919?s=200&v=4", // 백엔드에서 제공하는 URL
}) => {
  const [icons, setIcons] = useState([
    {
      id: 1,
      src: "https://github.com/hnayoung/image/blob/main/profile.png?raw=true",
      alt: "Profile Icon",
    },
    {
      id: 2,
      src: "https://github.com/hnayoung/image/blob/main/folder.png?raw=true",
      alt: "Folder1 Icon",
    },
    {
      id: 3,
      src: "https://github.com/hnayoung/image/blob/main/folder.png?raw=true",
      alt: "Folder2 Icon",
    },
    {
      id: 4,
      src: "https://github.com/hnayoung/image/blob/main/folder.png?raw=true",
      alt: "Folder3 Icon",
    },
  ]);

  const [optionsChatId, setOptionsChatId] = useState(null);
  const [editingChatId, setEditingChatId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const handleMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = width;

    const onMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      if (newWidth >= 200 && newWidth <= 600) {
        onResize(newWidth);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const addNewIcon = () => {
    setIcons((prevIcons) => [
      ...prevIcons,
      {
        id: Date.now(),
        src: "https://github.com/hnayoung/image/blob/main/folder.png?raw=true",
        alt: `Folder${prevIcons.length + 1} Icon`,
      },
    ]);
  };

  const toggleOptions = (chatId) => {
    setOptionsChatId((prev) => (prev === chatId ? null : chatId));
    setEditingChatId(null);
  };

  const startEditing = (chatId, currentName) => {
    setEditingChatId(chatId);
    setNewTitle(currentName);
  };

  const saveNewTitle = (chatId) => {
    if (newTitle.trim()) {
      updateChatTitle(chatId, newTitle);
    }
    setEditingChatId(null);
  };

  const saveCurrentChat = () => {
    if (!editingChatId) return;
    setSavedChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === editingChatId ? { ...chat, name: newTitle } : chat
      )
    );
  };

  const startNewChat = () => {
    saveCurrentChat(); // 현재 채팅 저장
    createNewChat(); // 새 채팅 생성
  };

  const loadSavedChat = (chatId) => {
    saveCurrentChat(); // 현재 채팅 저장
    loadChat(chatId); // 선택된 채팅 불러오기
  };

  return (
    <div className="left-pane" style={{ width: `${width}px` }}>
      {/* 왼쪽 아이콘 */}
      <div className="left-icons">
        {icons.map((icon) => (
          <div key={icon.id} className="icon">
            <img src={icon.src} alt={icon.alt} className="icon-img" />
          </div>
        ))}
        <div className="icon" onClick={addNewIcon} style={{ cursor: "pointer" }}>
          +
        </div>
        <div className="icon-profile">
        <img
          src="{profileImageUrl}" // 백엔드 url 
          alt="profile"
          className="icon-img"
        />
      </div>

      </div>

      {/* 콘텐츠 */}
      <div className="content">
        <Container>
          <div className="button-section">
            <button className="new-chat-btn" onClick={startNewChat}>
              + New Chat
            </button>
          </div>
          <div className="divider"></div>
          <div className="chat-list">
            {savedChats.map((chat) => (
              <div key={chat.id} className="chat-summary">
                <div
                  className="chat-title"
                  onClick={() => loadSavedChat(chat.id)}
                >
                  {editingChatId === chat.id ? (
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      onBlur={() => saveNewTitle(chat.id)}
                      autoFocus
                      className="edit-input"
                    />
                  ) : (
                    <span>{chat.name}</span>
                  )}
                </div>
                <div
                  className="options-button"
                  onClick={() => toggleOptions(chat.id)}
                >
                  ⋮
                </div>

                {optionsChatId === chat.id && (
                  <div className="options-menu">
                    <div
                      onClick={() => startEditing(chat.id, chat.name)}
                      className="option-item"
                    >
                      <img
                        src="https://github.com/hnayoung/image/blob/main/color_pencil.png?raw=true"
                        alt="Edit"
                        className="option-icon"
                      />
                      이름 바꾸기
                    </div>
                    <div
                      onClick={() => alert("공유하기는 구현되지 않았습니다.")}
                      className="option-item"
                    >
                      <img
                        src="https://github.com/hnayoung/image/blob/main/color_share.png?raw=true"
                        alt="Share"
                        className="option-icon"
                      />
                      공유하기
                    </div>
                    <div
                      onClick={() => alert("보관하기는 구현되지 않았습니다.")}
                      className="option-item"
                    >
                      <img
                        src="https://github.com/hnayoung/image/blob/main/folder.png?raw=true"
                        alt="Keep"
                        className="option-icon"
                      />
                      보관하기
                    </div>
                    <div
                      onClick={() => deleteChat(chat.id)}
                      className="option-item"
                    >
                      <img
                        src="https://github.com/hnayoung/image/blob/main/delete.png?raw=true"
                        alt="Delete"
                        className="option-icon"
                      />
                      삭제하기
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </div>

      <div className="resizer" onMouseDown={handleMouseDown}></div>
    </div>
  );
};

export default LeftPane;
