import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "hello word!" });
});

router.post("/", (req, res) => {
  console.log(req.body);
});

export default router;
