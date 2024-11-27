import React, { useState } from "react";

const GitHub = ({ onClose, backendUrl }) => {
  const [repoUrl, setRepoUrl] = useState(""); // 사용자가 입력한 GitHub URL

  const handleInputChange = (e) => {
    setRepoUrl(e.target.value);
  };

  const handleFetchRepo = () => {
    console.log("Fetching repository:", repoUrl);
    // 서버로 URL 전송
    fetch(`${backendUrl}/fetch-repo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: repoUrl }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Repository data:", data);
        alert("Repository fetched successfully!");
      })
      .catch((error) => {
        console.error("Error fetching repository:", error);
      });
  };

  return (
    <div>
      <h3>GitHub Repository URL</h3>
      <textarea
        value={repoUrl}
        onChange={handleInputChange}
        placeholder="Enter your GitHub repository URL..."
      ></textarea>
      <button onClick={handleFetchRepo}>Fetch Repository</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default GitHub;
