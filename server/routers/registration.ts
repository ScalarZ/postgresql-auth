import { Router } from "express";
import { genSalt, hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";
import { pool } from "../db";
import { sendVerification } from "../config/email";

config();

interface User {
  username: string;
  email: string;
  password: string;
}

const router = Router();

router.post("/signin", (req, res) => {
  const { email, password } = req.body as User;
  pool.query(
    `SELECT username, email, password FROM users WHERE email='${email}';`,
    (err, { rows }) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Email or password is not correct!", code: 403 });
      }
      compare(password, rows[0].password, (err, same) => {
        if (err)
          return res.status(403).json({
            message: "Server error, please try again!",
            code: 403,
          });
        if (!same) {
          return res.status(403).json({
            message: "Email or password is not correct!",
            code: 403,
            accesstoken: null,
          });
        }
        console.log(rows[0]?.username);
        const accessToken = sign(
          { username: rows[0]?.username, email },
          process.env.JWT || "",
          {
            expiresIn: "2h",
          }
        );
        console.log(accessToken);
        res.cookie("access_token", accessToken);
        res.status(200).json({
          message: "Singed in seccessfully!",
          code: 200,
          accessToken,
        });
      });
    }
  );
});

router.post("/signup", (req, res) => {
  const { username, email, password } = req.body as User;
  const saltRounds = 10;
  genSalt(saltRounds, (err, salt) => {
    if (err) return console.log(err);
    hash(password, salt, (err, hash) => {
      if (err) return console.log(err);
      req.body.password = undefined;
      pool.query(
        `INSERT INTO users(username, email, password, verified) VALUES ('${username}', '${email}', '${hash}', false);`,
        (err) => {
          if (err) {
            return res
              .status(403)
              .json({ message: "Email has already been used!", code: 403 });
          }
          const verificationToken = sign(
            { username, email },
            process.env.JWT || "",
            {
              expiresIn: "2h",
            }
          );
          sendVerification(verificationToken);
          res.status(200).json({
            message:
              "singed up successfully! please verify you're email address",
            code: 200,
          });
        }
      );
    });
  });
});

export default router;
