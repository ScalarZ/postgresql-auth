import { Router } from "express";
import { JsonWebTokenError, verify } from "jsonwebtoken";

const router = Router();

router.get("/profile", (req, res) => {
  let accessToken = req.headers.authorization || "Bearer";
  accessToken = accessToken.replace("Bearer", "");
  console.log(`Access token: ${accessToken}`);
  if (!accessToken) {
    return res
      .status(200)
      .json({ access: false, message: "access token not provided!" });
  }
  try {
    const payload = verify(accessToken, process.env.JWT || "");
    return res.status(200).json({ access: true, payload });
  } catch (error) {
    return res
      .status(200)
      .json({ access: false, message: "access token not valid!" });
  }
});

export default router;
