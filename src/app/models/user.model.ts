import { Schema, model } from "mongoose";
import { convertDateTimeToAsiaBkk } from "../../utils/convert-datetime-to-asia-bkk";

export interface IUser {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  createdAt: { type: Date, default: convertDateTimeToAsiaBkk },
  updatedAt: { type: Date, default: convertDateTimeToAsiaBkk },
});

schema.index({
  first_name: 1,
  last_name: 1,
  email: 1,
  createdAt: -1,
});

export const UserModel = model<IUser>("User", schema);
