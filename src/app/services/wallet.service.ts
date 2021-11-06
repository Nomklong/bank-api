import { generateWalletNumber } from "../../utils/generate-wallet-number";
import { WalletModel } from "../models/wallet.model";

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

  findByUserId(userId: string): QueryWithHelpers {
    return WalletModel.findOne({ user_id: userId });
  }
}

const WalletInstance = new WalletService();

export { WalletService, WalletInstance };
