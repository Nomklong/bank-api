import { generateWalletNumber } from "../../utils/generate-wallet-number";
import { IWallet, WalletModel } from "../models/wallet.model";
import { TransactionInstance, TransactionType } from "./transaction.service";

class QueryWithHelpers {}

class WalletService {
  async store(userId: string): Promise<QueryWithHelpers> {
    const walletNumber = await generateWalletNumber();
    const parameters = {
      user_id: userId,
      wallet_number: walletNumber,
      balance: 0,
    };
    return WalletModel.create(parameters);
  }

  findByNumber(walletNumber: number): QueryWithHelpers {
    return WalletModel.findOne({ wallet_number: walletNumber });
  }

  findByUserId(userId: string) {
    return WalletModel.findOne({ user_id: userId });
  }

  findByWalletNumber(walletNumber: number, userId: string) {
    return WalletModel.findOne({
      wallet_number: walletNumber,
      user_id: { $ne: userId },
    });
  }

  depositByUserId(userId: string, balance: number): QueryWithHelpers {
    return WalletModel.findOneAndUpdate(
      { user_id: userId },
      { $inc: { balance } }
    );
  }

  withdrawByUserId(userId: string, balance: number): QueryWithHelpers {
    return WalletModel.findOneAndUpdate(
      { user_id: userId },
      { $inc: { balance: -balance } }
    );
  }

  async transfer(fromNumber: number, toNumber: number, balance: number) {
    const session = await WalletModel.startSession();

    session.withTransaction(async () => {
      const from = await WalletModel.findOneAndUpdate(
        { wallet_number: fromNumber },
        { $inc: { balance: -balance } }
      );

      if (!from) {
        //
      }

      const to = await WalletModel.findOneAndUpdate(
        { wallet_number: toNumber },
        { $inc: { balance: balance } }
      );

      if (from && to) {
        const parameters: TransactionType = {
          to_user_id: to.user_id,
          to_wallet_number: toNumber,
          current_balance: from.balance - balance,
          from_user_id: from.user_id,
          from_wallet_number: fromNumber,
          action: "transfer",
          transfer_balance: balance,
        };
        await TransactionInstance.store(parameters);
      }
    });

    await session.endSession();
  }
}

const WalletInstance = new WalletService();

export { WalletService, WalletInstance };
