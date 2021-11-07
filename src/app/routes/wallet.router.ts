import { Router } from "express";

import { asyncHelper } from "../../utils/async-helper";
import validate from "../middleware/validation.middleware";
import { authMiddleware } from "../middleware/auth.middleware";
import { checkBalance } from "../controllers/check-balance.controller";
import { depositController } from "../controllers/deposit.controller";
import { depositWithdrawValidation } from "../validations/deposit-withdraw.validation";
import { withdrawController } from "../controllers/withdraw.controller";
import { transferController } from "../controllers/transfer.controller";
import { transferValidation } from "../validations/transfer.validation";
import { transactionController } from "../controllers/transaction.controller";

// Export module for registering router in express app
export const router: Router = Router();

// Define your routes here

router.post("/check-balance", authMiddleware, asyncHelper(checkBalance));

router.patch(
  "/deposit",
  validate(depositWithdrawValidation),
  authMiddleware,
  asyncHelper(depositController)
);

router.patch(
  "/withdraw",
  validate(depositWithdrawValidation),
  authMiddleware,
  asyncHelper(withdrawController)
);

router.post(
  "/transfer",
  validate(transferValidation),
  authMiddleware,
  asyncHelper(transferController)
);

router.get("/transections", authMiddleware, asyncHelper(transactionController));
