import mongoose, { Schema, InferSchemaType } from "mongoose";

const contributionSchema = new Schema(
  {
    memberId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amountPaid: { type: Number, required: true, default: 0 },
  },
  { _id: false }
);

const groupSchema = new Schema(
  {
    groupName: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    purpose: { type: String },
    expenses: [{ type: Schema.Types.ObjectId, ref: "Expense" }],
    contributions: [contributionSchema],
  },
  { timestamps: true }
);

export type Group = InferSchemaType<typeof groupSchema> & { _id: mongoose.Types.ObjectId };

export default mongoose.models.Group || mongoose.model("Group", groupSchema);


