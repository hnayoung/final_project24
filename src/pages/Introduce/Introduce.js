import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Introduce.css";

const Introduce = () => {
  const navigate = useNavigate();

  const handleStartChatting = () => {
    navigate("/login"); // "/main" 페이지로 이동
  };

  return (
    <div className="intro">
      <Container fluid>
        <div className="intro-header animate"> {/* 애니메이션 클래스 추가 */}
          <div className="intro-logo">
            <img
              src="https://github.com/hnayoung/image/blob/main/logo.png?raw=true" // 로고 이미지 URL
              alt="Logo"
              className="intro-logo-img"
            />
            <span className="intro-title">MUJE</span>
          </div>
        </div>

        <div className="intro-body animate"> {/* 애니메이션 클래스 추가 */}
          <h1>MUJE Chatbot</h1>
          <p>Chat with our fine-tuned Ollama & StarCoder</p>
          <button className="start-btn" onClick={handleStartChatting}>
            Start Chatting →
          </button>
        </div>

        <div className="intro-footer animate"> {/* 애니메이션 클래스 추가 */}
          <span>Built by ZEROTWORAE</span>
        </div>
      </Container>
    </div>
  );
};

export default Introduce;
