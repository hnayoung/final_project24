import React, { useState } from "react";
import "./RightPane.css";
import { Container } from "react-bootstrap";

const RightPane = ({ activeChat, setActiveChat }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { sender: "user", text: inputValue };
    setActiveChat((prev) => [...prev, userMessage]);
    setInputValue("");

    try {
      const response = await fetch("https://your-backend-api-url.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      });

      const data = await response.json();
      const modelMessage = { sender: "model", text: data.response };

      setActiveChat((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error("Error fetching model response:", error);

      const errorMessage = {
        sender: "model",
        text: "Sorry, there was an error processing your request. Please try again.",
      };
      setActiveChat((prev) => [...prev, errorMessage]);
    }
  };

  const handleFileSelect = (file) => {
    if (!file) return;

    const fileName = file.name;
    const userMessage = { sender: "user", text: `File uploaded: ${fileName}` };

    setActiveChat((prev) => [...prev, userMessage]);

    setActiveChat((prev) => [
      ...prev,
      { sender: "model", text: "Your file has been uploaded successfully." },
    ]);
  };

  const handleGitHubSelect = () => {
    const repoUrl = prompt("Enter your GitHub repository URL:");
    if (!repoUrl) return;

    const userMessage = { sender: "user", text: `GitHub Repository: ${repoUrl}` };

    setActiveChat((prev) => [...prev, userMessage]);

    setActiveChat((prev) => [
      ...prev,
      { sender: "model", text: "Your GitHub repository has been processed." },
    ]);
  };

  return (
    <div className="right-pane">
      <div className="content">
        <Container fluid>
          {/* 메시지 표시 영역 */}
          <div className="chat-container">
            {activeChat.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${
                  message.sender === "user" ? "user-message" : "model-message"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
        </Container>
      </div>
      
      {/* 입력 영역 */}
      <div className="chat-input-wrapper">
      <div className="chat-input-box">
        
        <img
          src="https://github.com/hnayoung/image/blob/main/MUGE.png?raw=true"
          alt="Transparent Overlay"
          className="overlay-image"
        />
      
        <textarea
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your message..."
          className="chat-input"
          rows="1"
        ></textarea>

        <div className="icon-row">
          <div className="icon-left">
            <input
              type="file"
              style={{ display: "none" }}
              id="upload-file"
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />
            <label htmlFor="upload-file">
              <img
                src="https://github.com/hnayoung/image/blob/main/%ED%8F%B4%EB%8D%94.png?raw=true"
                alt="Upload File"
                className="attach-icon"
              />
            </label>

            <img
              src="https://github.com/hnayoung/image/blob/main/%EA%B9%83%ED%97%88%EB%B8%8C%EC%9D%B4%EB%AF%B8%EC%A7%80.png?raw=true"
              alt="GitHub Repository"
              className="globe-icon"
              onClick={handleGitHubSelect}
            />
          </div>

          <img
            src="https://github.com/hnayoung/image/blob/main/upload.png?raw=true"
            alt="Submit"
            className="submit-icon"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default RightPane;
