import React, { useRef } from "react";

const File = ({ onFileSelect }) => {
  const fileInputRef = useRef(null); // 파일 입력 참조 생성

  const handleAttachClick = () => {
    // 파일 입력 필드를 클릭하도록 트리거
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected compressed folder:", file.name);
      onFileSelect(file.name); // 부모 컴포넌트로 파일 이름 전달
    }
  };

  return (
    <div className="file-component">
      {/* Attach Icon */}
      <img
        src="https://github.com/hnayoung/image/blob/main/%ED%8F%B4%EB%8D%94.png?raw=true"
        alt="Attach"
        className="attach-icon"
        onClick={handleAttachClick} // 클릭 시 파일 입력 트리거
      />
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef} // 참조 설정
        style={{ display: "none" }} // 화면에서 숨김
        onChange={handleFileChange} // 파일 선택 시 실행
        accept=".zip,.rar,.7z" // 압축 파일 형식만 허용
      />
    </div>
  );
};

export default File;
