import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

router.post("/signup", async (req, res) => {
  try {
    const { accountName, accountNumber, ifsc, password } = req.body;
    if (!accountName || !accountNumber || !ifsc || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const existing = await User.findOne({ accountNumber });
    if (existing) {
      return res.status(409).json({ error: "User already exists" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ accountName, accountNumber, ifsc, passwordHash, budgets: [] });
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ token, user: { id: user._id, accountName, accountNumber, ifsc } });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { accountNumber, password } = req.body;
    const user = await User.findOne({ accountNumber });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user._id, accountName: user.accountName, accountNumber: user.accountNumber, ifsc: user.ifsc } });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;


