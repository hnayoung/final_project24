import React, { useState } from "react";
import "./LeftPane.css";
import { Container } from "react-bootstrap";

const LeftPane = ({
  activeChat,
  setActiveChat,
  savedChats,
  setSavedChats,
  currentChatId,
  createNewChat,
  loadChat,
  updateChatTitle,
  deleteChat,
  width,
  onResize,
  openRepositoryModal,
  profileImageUrl = "https://avatars.githubusercontent.com/u/9919?s=200&v=4",
  repositories = [],
}) => {
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [optionsChatId, setOptionsChatId] = useState(null);
  const [editingChatId, setEditingChatId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const handleCheckboxChange = (repo) => {
    setSelectedRepos((prev) => {
      if (prev.includes(repo)) {
        return prev.filter((item) => item !== repo);
      }
      if (prev.length < 3) {
        return [...prev, repo];
      }
      alert("You can select up to 3 repositories only.");
      return prev;
    });
  };

  const handleRepositoryClick = () => {
    if (savedChats.length === 0) {
      alert("Please create a new chat before accessing repositories.");
      return;
    }
    openRepositoryModal();
  };

  const handleSubmit = () => {
    if (selectedRepos.length === 0) {
      alert("Please select at least one repository.");
      return;
    }

    const repoNames = selectedRepos.map((repo) => repo.name).join(", ");
    const newMessage = { sender: "user", text: `Selected Repositories: ${repoNames}` };
    setActiveChat((prevChat) => [...prevChat, newMessage]);

    setSelectedRepos([]);
  };

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

  return (
    <div className="left-pane" style={{ width: `${width}px` }}>
      <div className="content">
        <Container>
          <div className="button-section">
            <button className="repository-btn" onClick={handleRepositoryClick}>
              Repository
            </button>
            <button className="new-chat-btn" onClick={createNewChat}>
              + New Chat
            </button>
          </div>
          <div className="divider"></div>

          {/* Repository 목록 */}
          <div className="repository-list">
            {repositories.length === 0 ? (
              <p className="no-repositories">No repositories to display.</p>
            ) : (
              <ul>
                {repositories.map((repo) => (
                  <li key={repo.id} className="repository-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedRepos.includes(repo)}
                        onChange={() => handleCheckboxChange(repo)}
                      />
                      {repo.name}
                    </label>
                  </li>
                ))}
              </ul>
            )}
            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>

          {/* Chat 목록 */}
          <div className="divider"></div>
          <div className="chat-list">
            {savedChats.map((chat) => (
              <div key={chat.id} className="chat-summary">
                <div
                  className="chat-title"
                  onClick={() => loadChat(chat.id)}
                >
                  {chat.name}
                </div>
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
