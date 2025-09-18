import { Router } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Group from "../models/Group";
import User from "../models/User";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

function auth(req: any, res: any, next: any) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ success: false, message: "Missing auth header" });
  const token = header.replace("Bearer ", "");
  try {
    const payload: any = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
}

// Create Group
router.post("/", auth, async (req, res) => {
  try {
    const { groupName, members = [], purpose } = req.body;
    if (!groupName) return res.status(400).json({ success: false, message: "groupName is required" });
    const creator = new mongoose.Types.ObjectId(req.userId);
    const memberIds: mongoose.Types.ObjectId[] = [creator, ...members.filter((m: string) => m && m !== req.userId).map((m: string) => new mongoose.Types.ObjectId(m))];
    const uniqueMembers = Array.from(new Set(memberIds.map(String))).map((id) => new mongoose.Types.ObjectId(id));

    const contributions = uniqueMembers.map((id) => ({ memberId: id, amountPaid: 0 }));
    const group = await Group.create({ groupName, createdBy: creator, members: uniqueMembers, purpose, expenses: [], contributions });
    res.status(201).json({ success: true, message: "Group created", data: group });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Add Member(s)
router.post("/:groupId/members", auth, async (req, res) => {
  try {
    const { groupId } = req.params;
    const { members } = req.body as { members: string[] };
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ success: false, message: "Group not found" });
    if (String(group.createdBy) !== String(req.userId)) return res.status(403).json({ success: false, message: "Only creator can add members" });
    const toAdd = (members || []).map((m) => new mongoose.Types.ObjectId(m));
    const existing = new Set(group.members.map(String));
    for (const m of toAdd) {
      if (!existing.has(String(m))) {
        group.members.push(m);
        group.contributions.push({ memberId: m, amountPaid: 0 });
      }
    }
    await group.save();
    res.json({ success: true, message: "Members added", data: group });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Remove Member
router.delete("/:groupId/members/:memberId", auth, async (req, res) => {
  try {
    const { groupId, memberId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ success: false, message: "Group not found" });
    if (String(group.createdBy) !== String(req.userId)) return res.status(403).json({ success: false, message: "Only creator can remove members" });
    const memberStr = String(memberId);
    if (memberStr === String(group.createdBy)) return res.status(400).json({ success: false, message: "Creator cannot be removed" });
    group.members = group.members.filter((m: any) => String(m) !== memberStr) as any;
    group.contributions = group.contributions.filter((c: any) => String(c.memberId) !== memberStr) as any;
    await group.save();
    res.json({ success: true, message: "Member removed", data: group });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// View Group Details
router.get("/:groupId", auth, async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId).populate("members", "accountName accountNumber ifsc");
    if (!group) return res.status(404).json({ success: false, message: "Group not found" });
    if (!group.members.map(String).includes(String(req.userId))) return res.status(403).json({ success: false, message: "Not a member of this group" });
    res.json({ success: true, message: "Group details", data: group });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Add Expense to Group + update contributions
router.post("/:groupId/expenses", auth, async (req, res) => {
  try {
    const { groupId } = req.params;
    const { description, amount, paidBy } = req.body as { description: string; amount: number; paidBy: string };
    if (!description || !amount || !paidBy) return res.status(400).json({ success: false, message: "Missing fields" });
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ success: false, message: "Group not found" });
    const isMember = group.members.map(String).includes(String(req.userId));
    if (!isMember) return res.status(403).json({ success: false, message: "Not a member of this group" });
    if (!group.members.map(String).includes(String(paidBy))) return res.status(400).json({ success: false, message: "paidBy must be a group member" });

    // Track contribution
    const c = group.contributions.find((c: any) => String(c.memberId) === String(paidBy));
    if (c) c.amountPaid += Number(amount);
    else group.contributions.push({ memberId: new mongoose.Types.ObjectId(paidBy), amountPaid: Number(amount) } as any);

    await group.save();
    res.status(201).json({ success: true, message: "Expense recorded", data: { contributions: group.contributions } });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// View Group Expenses & Split (balances)
router.get("/:groupId/balances", auth, async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId).populate("members", "accountName");
    if (!group) return res.status(404).json({ success: false, message: "Group not found" });
    if (!group.members.map(String).includes(String(req.userId))) return res.status(403).json({ success: false, message: "Not a member of this group" });

    const total = group.contributions.reduce((sum: number, c: any) => sum + (c.amountPaid || 0), 0);
    const share = group.members.length > 0 ? total / group.members.length : 0;
    const details = group.members.map((m: any) => {
      const paid = group.contributions.find((c: any) => String(c.memberId) === String(m._id))?.amountPaid || 0;
      const balance = paid - share; // positive => should get back, negative => owes
      return { memberId: m._id, name: m.accountName, amountPaid: paid, balance };
    });
    res.json({ success: true, message: "Balances computed", data: { total, share, details } });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete Group (creator only)
router.delete("/:groupId", auth, async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ success: false, message: "Group not found" });
    if (String(group.createdBy) !== String(req.userId)) return res.status(403).json({ success: false, message: "Only creator can delete group" });
    await group.deleteOne();
    res.json({ success: true, message: "Group deleted" });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;


