import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const onClickSocialLogin = () => {
    const client_id = "Ov23livITPwx6AsCtyO0";
    const redirect_uri = "http://localhost:8080/oauth/github/callback";
    const scope = "read:user user:email";
    const allow_signup = true;

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(
      redirect_uri
    )}&scope=${scope}&allow_signup=${allow_signup}`;

    window.location.href = githubAuthUrl;
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Login</h2>
        <hr style={{ position: "relative", top: "-40px" }} />
        <button className="github-button" onClick={onClickSocialLogin}>
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub Logo"
            className="github-logo"
          />
          Login with GitHub
        </button>
      </div>
    </div>
  );
};

export default Login;
