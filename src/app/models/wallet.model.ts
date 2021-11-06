import { Schema, model, Document } from "mongoose";
import { convertDateTimeToAsiaBkk } from "../../utils/convert-datetime-to-asia-bkk";

export interface IWallet extends Document {
  user_id: number;
  balance: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<IWallet>({
  user_id: { type: Number, required: true },
  balance: { type: Number, required: true },
  createdAt: { type: Date, default: convertDateTimeToAsiaBkk },
  updatedAt: { type: Date, default: convertDateTimeToAsiaBkk },
});

schema.index({
  user_id: 1,
  balance: 1,
  createdAt: -1,
});

export const WalletModel = model<IWallet>("Wallet", schema);
