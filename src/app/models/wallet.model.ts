import { Schema, model } from "mongoose";
import { convertDateTimeToAsiaBkk } from "../../utils/convert-datetime-to-asia-bkk";
import { UserModel } from "./user.model";

export interface IWallet {
  user_id: string;
  balance: number;
  wallet_number: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<IWallet>({
  user_id: { type: String, required: true, ref: UserModel },
  balance: { type: Number, required: true },
  wallet_number: { type: Number, required: true },
  createdAt: { type: Date, default: convertDateTimeToAsiaBkk },
  updatedAt: { type: Date, default: convertDateTimeToAsiaBkk },
});

schema.index({
  user_id: 1,
  wallet_number: 1,
  balance: 1,
  createdAt: -1,
});

export const WalletModel = model<IWallet>("Wallet", schema);
