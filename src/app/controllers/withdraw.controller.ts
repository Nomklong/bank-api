import { Request, Response } from "express";
import { successHandler } from "../common/response";
import { WalletInstance } from "../services/wallet.service";
import { WalletException } from "../common/exceptions/wallet.exception";

const withdrawController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.body.user._id;
  const balance: number = req.body.balance;
  const wallet = await WalletInstance.findByUserId(userId);

  if (!wallet) {
    throw WalletException.notFound();
  }

  if (wallet.balance < balance) {
    throw WalletException.notOnlyYourBalance();
  }

  await WalletInstance.withdrawByUserId(userId, balance);

  const response = {
    message: "Withdraw successfully",
  };

  return successHandler(res, response);
};

export { withdrawController };
