import { Request, Response } from "express";
import { successHandler } from "../common/response";
import { WalletInstance } from "../services/wallet.service";
import { WalletException } from "../common/exceptions/wallet.exception";
import { TransactionInstance } from "../services/transaction.service";

const transactionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.body.user._id;
  const { action } = req.body;
  const response = await TransactionInstance.get(userId, action);

  return successHandler(res, response);
};

export { transactionController };
