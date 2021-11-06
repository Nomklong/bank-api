import { WalletInstance } from "../app/services/wallet.service";

export async function generateWalletNumber(): Promise<any> {
  const number = Math.floor(
    Math.random() * (1000000000 - 9999999999 + 1) + 9999999999
  );

  const duplicateNumber = await WalletInstance.findByNumber(number);

  if (duplicateNumber) {
    return generateWalletNumber();
  }

  return number;
}
