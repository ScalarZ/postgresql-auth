import { google } from "googleapis";
import { createTransport } from "nodemailer";
import { config } from "dotenv";

config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

export const sendVerification = async (token: string) => {
  const accessToken = await oAuth2Client.getAccessToken();

  const transporter = createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "rahalifares0@gmail.com",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken as string,
    },
  });

  let info = await transporter.sendMail({
    from: "Fares 🚀 <rahalifares0@gmail.com>",
    to: "gajoh26171@orlydns.com",
    subject: "Hello ✔",
    text: "Hello world?",
    html: `<h1>Hello world?</h1>
          <a href='http://localhost:8080/verify${token}'>click to confirem</a>`,
  });

  console.log("Message sent: %s", info.messageId);
};
