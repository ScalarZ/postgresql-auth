import { Router } from "express";
import { verify } from "jsonwebtoken";
import { pool } from "../db";

interface User {
  username: string;
  email: string;
}

const router = Router();

router.get("/verify:token", (req, res) => {
  try {
    const user = verify(req.params?.token, process.env.JWT || "") as User;
    return pool.query(
      `UPDATE users SET verified = true WHERE email = '${user?.email}'`,
      (err, result) => {
        if (err) {
          res.status(403).json(err);
        }
        res.status(200).json({ verified: true });
      }
    );
  } catch (error) {
    res.status(200).json({ verified: false });
  }
});

export default router;
