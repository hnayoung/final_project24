const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = "Ov23livITPwx6AsCtyO0";
const CLIENT_SECRET = "3338d57bdcd9ea6c3497acf1994a2e5180854b48";

app.get("/oauth/github/callback", async (req, res) => {
  const { code } = req.query;

  try {
    // GitHub로 액세스 토큰 요청
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const accessToken = response.data.access_token;

    // 액세스 토큰을 사용해 사용자 정보 요청
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const user = userResponse.data;

    // 사용자 정보 확인 후 클라이언트로 리디렉션
    res.redirect("http://localhost:3000/main"); // main 페이지로 리디렉션
  } catch (error) {
    console.error("GitHub OAuth Error:", error);
    res.status(500).send("Authentication failed");
  }
});

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
