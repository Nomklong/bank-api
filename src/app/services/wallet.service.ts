import { generateWalletNumber } from "../../utils/generate-wallet-number";
import { IWallet, WalletModel } from "../models/wallet.model";

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
      await WalletModel.findOneAndUpdate(
        { wallet_number: fromNumber },
        { $inc: { balance: -balance } }
      );

      await WalletModel.findOneAndUpdate(
        { wallet_number: toNumber },
        { $inc: { balance: balance } }
      );
    });

    await session.endSession();
  }
}

const WalletInstance = new WalletService();

export { WalletService, WalletInstance };
