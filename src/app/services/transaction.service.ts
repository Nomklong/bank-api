import { TransactionModel } from "../models/transaction.model";

class QueryWithHelpers {}

export type TransactionType = {
  to_user_id: string;
  to_wallet_number: number;
  current_balance: number;
  from_user_id?: string;
  from_wallet_number?: number;
  action: string | "deposit" | "withdraw" | "transfer" | "receive";
  transfer_balance: number;
};

type ListCondition = {
  action: string;
  from_user_id?: string;
  to_user_id?: string;
};

class TransactionService {
  async get(userId: string, action: string): Promise<QueryWithHelpers> {
    let condition: ListCondition = { action };

    if (condition.action === "receive") {
      condition.action = "transfer";
    }

    console.log(action);
    const walletOut = ["withdraw", "transfer"];
    if (walletOut.includes(action)) {
      condition = {
        ...condition,
        from_user_id: userId,
      };
    } else {
      condition = {
        ...condition,
        to_user_id: userId,
      };
    }
    return await TransactionModel.find(condition).sort({ createdAt: -1 });
  }

  store(parameter: TransactionType) {
    return TransactionModel.create(parameter);
  }
}

const TransactionInstance = new TransactionService();

export { TransactionService, TransactionInstance };
