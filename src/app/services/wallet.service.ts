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
}

const WalletInstance = new WalletService();

export { WalletService, WalletInstance };
