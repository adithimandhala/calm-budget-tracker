import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

function auth(req: any, res: any, next: any) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "Missing auth header" });
  const token = header.replace("Bearer ", "");
  try {
    const payload: any = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

router.post("/", auth, async (req, res) => {
  try {
    const { budgetAmount, totalSpent = 0, timePeriod, customRange } = req.body;
    if (!budgetAmount || !timePeriod) return res.status(400).json({ error: "Missing fields" });
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    const totalSaved = budgetAmount - totalSpent;
    user.budgets.push({ budgetAmount, totalSpent, totalSaved, timePeriod, customRange });
    await user.save();
    res.status(201).json(user.budgets[user.budgets.length - 1]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:budgetId", auth, async (req, res) => {
  try {
    const { budgetId } = req.params;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    const b: any = user.budgets.id(budgetId);
    if (!b) return res.status(404).json({ error: "Budget not found" });
    if (req.body.budgetAmount !== undefined) b.budgetAmount = req.body.budgetAmount;
    if (req.body.totalSpent !== undefined) b.totalSpent = req.body.totalSpent;
    b.totalSaved = b.budgetAmount - b.totalSpent;
    if (req.body.timePeriod) b.timePeriod = req.body.timePeriod;
    if (req.body.customRange) b.customRange = req.body.customRange;
    await user.save();
    res.json(b);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;


