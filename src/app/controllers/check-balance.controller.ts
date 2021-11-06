import { Request, Response } from "express";
import { successHandler } from "../common/response";
import { WalletInstance } from "../services/wallet.service";

const pointBalance = async (req: Request, res: Response): Promise<void> => {
  const userId = req.body.user._id;
  const wallet = await WalletInstance.findByUserId(userId);

  if (wallet) {
    return successHandler(res, wallet);
  }

  const newWallet = await WalletInstance.store(userId);

  return successHandler(res, newWallet);
};

export { pointBalance };
