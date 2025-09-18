import mongoose, { Schema, InferSchemaType } from "mongoose";

const budgetSchema = new Schema(
  {
    budgetAmount: { type: Number, required: true },
    totalSpent: { type: Number, default: 0 },
    totalSaved: { type: Number, default: 0 },
    timePeriod: { type: String, enum: ["monthly", "weekly", "custom"], required: true },
    customRange: {
      startDate: { type: Date },
      endDate: { type: Date },
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const userSchema = new Schema(
  {
    accountName: { type: String, required: true },
    accountNumber: { type: String, required: true, unique: true },
    ifsc: { type: String, required: true },
    passwordHash: { type: String, required: true },
    budgets: [budgetSchema],
  },
  { timestamps: true }
);

export type User = InferSchemaType<typeof userSchema> & { _id: mongoose.Types.ObjectId };

export default mongoose.models.User || mongoose.model("User", userSchema);


