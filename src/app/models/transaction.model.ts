import { Schema, model } from "mongoose";
import { convertDateTimeToAsiaBkk } from "../../utils/convert-datetime-to-asia-bkk";
import { UserModel } from "./user.model";

export interface ITransaction {
  to_user_id: string;
  to_wallet_number: number;
  current_balance: number;
  from_user_id?: string;
  from_wallet_number?: number;
  action: string | "deposit" | "withdraw" | "transfer" | "receive";
  transfer_balance: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<ITransaction>({
  to_user_id: { type: String, required: true, ref: UserModel },
  to_wallet_number: { type: Number, required: true },
  current_balance: { type: Number, required: true },
  from_user_id: { type: String, ref: UserModel },
  from_wallet_number: { type: Number },
  action: { type: String, required: true },
  transfer_balance: { type: Number, required: true },
  createdAt: { type: Date, default: convertDateTimeToAsiaBkk },
  updatedAt: { type: Date, default: convertDateTimeToAsiaBkk },
});

schema.index({
  user_id: 1,
  wallet_number: 1,
  balance: 1,
  createdAt: -1,
});

export const TransactionModel = model<ITransaction>("Transaction", schema);
