import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { successHandler } from "../common/response";

// Export module for registering router in express app
export const router: Router = Router();

// Define your routes here
router.get("/", authMiddleware, (req, res) => {
  const response = {
    message: "GET request from sample router",
  };
  successHandler(res, response);
});

router.post("/", (req, res) => {
  res.status(200).send({
    message: "POST request from sample router",
  });
});

router.put("/", (req, res) => {
  res.status(200).send({
    message: "PUT request from sample router",
  });
});

router.delete("/", (req, res) => {
  res.status(200).send({
    message: "DELETE request from sample router",
  });
});
