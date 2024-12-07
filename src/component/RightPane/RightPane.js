import React, { useState } from "react";
import { Container, Modal, Form, Button } from "react-bootstrap";
import "./RightPane.css";

const RightPane = ({ activeChat, setActiveChat, showModal, setShowModal, fetchRepositories }) => {
  const [githubUrl, setGithubUrl] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedRepos, setSelectedRepos] = useState([]); // 선택된 Repository 상태 추가

  // 실제 AI 모델 API 호출 함수
  const fetchAIResponse = async (userMessage) => {
    try {
      const response = await fetch("https://your-ai-model-api-url.com/chat", { // 여기에 실제 ai api 입력 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }), // 사용자 메시지를 API로 전달
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI response");
      }

      const data = await response.json();
      return data.response; // AI 모델에서 반환된 응답 텍스트
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Sorry, I couldn't process your message. Please try again later.";
    }
  };

  // 모달 제출 처리
  const handleModalSubmit = async () => {
    if (!githubUrl || !/^https:\/\/github\.com\/[a-zA-Z0-9_-]+$/.test(githubUrl)) {
      alert("Please enter a valid GitHub profile URL (e.g., https://github.com/username).");
      return;
    }

    fetchRepositories(githubUrl); // Repository 가져오기 호출

    setActiveChat((prev) => [
      ...prev,
      { sender: "user", text: `GitHub Profile: ${githubUrl}` },
      { sender: "model", text: "Your GitHub profile has been successfully processed." },
    ]);

    try {
      // AI 모델 응답 가져오기
      const aiResponse = await fetchAIResponse(inputValue);

      // AI 응답 추가
      const aiMessage = { sender: "model", text: aiResponse };
      setActiveChat((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error handling message:", error);

      const errorMessage = {
        sender: "model",
        text: "Sorry, I couldn't process your request. Please try again later.",
      };
      setActiveChat((prev) => [...prev, errorMessage]);
    }

    // 입력 필드 초기화
    setInputValue("");
    setGithubUrl(""); // 입력 초기화
    setShowModal(false); // 모달 닫기
  };

  // Repository 선택 핸들러
  const handleRepoSelect = (repo) => {
    setSelectedRepos((prev) => {
      if (prev.includes(repo)) {
        return prev.filter((item) => item !== repo); // 선택 해제
      }
      if (prev.length < 3) {
        return [...prev, repo]; // 최대 3개까지 추가
      }
      alert("You can select up to 3 repositories only.");
      return prev;
    });
  };

  const handleDragStart = (e) => {
    if (selectedRepos.length > 3) {
      alert("You can drag and drop only up to 3 repositories.");
      return; // 드래그 동작 중단
    }

    if (selectedRepos.length < 3) {
      alert("Please select exactly 3 repositories to proceed.");
      return; // 드래그 동작 중단
    }

    // 텍스트로 구분 추가
    const zipContent = selectedRepos
      .map(
        (repo, index) =>
          `Repository ${index + 1}:\nName: ${repo.name}\nURL: ${repo.html_url}`
      )
      .join("\n\n---\n\n"); // 줄바꿈 및 구분선 추가

    const blob = new Blob([zipContent], { type: "application/zip" });
    const file = new File([blob], "repositories.zip");

    // 드래그 데이터 설정
    e.dataTransfer.setData("application/zip", file);
    e.dataTransfer.setData("text/plain", zipContent); // 줄바꿈된 텍스트 추가
  };

  // 메시지 입력 핸들러
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // 메시지 전송 처리
  const handleSubmit = async () => {
    if (!inputValue.trim()) return;

    setActiveChat((prev) => [
      ...prev,
      { sender: "user", text: inputValue },
    ]);

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

    setInputValue("");
  };

  // GitHub 프로필 이미지 (임시 URL)
  const githubProfileImageUrl =
    "https://avatars.githubusercontent.com/u/9919?s=200&v=4";

  return (
    <div className="right-pane">
      {/* 모달 창 */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        dialogClassName="custom-modal-position"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <img
              src="https://github.com/hnayoung/image/blob/main/MUGE%206.png?raw=true"
              alt="Icon"
              style={{ width: "70px", margin: "-15px" }}
            />
            Enter GitHub Profile URL
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>GitHub Profile URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://github.com/username"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 배경 로고 */}
      <div className="background-logo">
        <img
          src="https://github.com/hnayoung/image/blob/main/logo.png?raw=true"
          alt="MUJE Logo"
          className="muje-logo"
        />
      </div>

      {/* 프로필 이미지 */}
      <div className="profile-container">
        <img
          src={githubProfileImageUrl}
          alt="GitHub Profile"
          className="profile-image"
        />
      </div>

      {/* 채팅 콘텐츠 */}
      <div className="content">
        <Container fluid>
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

    </div>
  );
};

export default RightPane;
