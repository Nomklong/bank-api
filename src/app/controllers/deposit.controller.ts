import { Request, Response } from "express";
import { successHandler } from "../common/response";
import { WalletInstance } from "../services/wallet.service";
import { WalletException } from "../common/exceptions/wallet.exception";

const depositController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.body.user._id;
  const balance: number = req.body.balance;
  const wallet = await WalletInstance.findByUserId(userId);

  if (!wallet) {
    throw WalletException.notFound();
  }

  await WalletInstance.depositByUserId(userId, balance);

  const response = {
    message: "Deposit successfully",
  };

  return successHandler(res, response);
};

export { depositController };
