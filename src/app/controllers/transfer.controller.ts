import { Request, Response } from "express";
import { successHandler } from "../common/response";
import { WalletInstance } from "../services/wallet.service";
import { WalletException } from "../common/exceptions/wallet.exception";

const transferController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.body.user._id;
  const wallet = await WalletInstance.findByUserId(userId);

  if (!wallet) {
    throw WalletException.notFound();
  }

  const { balance, transfer_number } = req.body;

  const transferWallet = await WalletInstance.findByWalletNumber(
    transfer_number,
    userId
  );

  if (!transferWallet) {
    throw WalletException.notFoundTransferNumber();
  }

  if (wallet.balance < balance) {
    throw WalletException.notOnlyYourBalance();
  }

  await WalletInstance.transfer(wallet.wallet_number, transfer_number, balance);

  const response = {
    message: "Transfer successfully",
  };

  return successHandler(res, response);
};

export { transferController };
