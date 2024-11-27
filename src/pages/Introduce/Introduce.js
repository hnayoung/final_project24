import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Introduce.css";

const Introduce = () => {
  const navigate = useNavigate();

  const handleStartChatting = () => {
    navigate("/main"); // "/main" 페이지로 이동
  };

  return (
    <div className="intro">
      <Container fluid>
        <div className="intro-header animate"> {/* 애니메이션 클래스 추가 */}
          <div className="intro-logo">
            <img
              src="https://github.com/hnayoung/image/blob/main/MUGE.png?raw=true" // 로고 이미지 URL
              alt="Logo"
              className="intro-logo-img"
            />
            <span className="intro-title">MUGE</span>
          </div>
          <div className="intro-nav">
            <a href="/about" className="nav-link">
              About
            </a>
            <a href="/demo" className="nav-link">
              Demo
            </a>
            <a href="/contact" className="nav-link">
              Contact
            </a>
            <button className="login-btn">Login</button>
            <button className="signup-btn">Sign up</button>
          </div>
        </div>

        <div className="intro-body animate"> {/* 애니메이션 클래스 추가 */}
          <h1>MUGE Chatbot</h1>
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
