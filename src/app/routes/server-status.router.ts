import { Router } from "express";
import { SERVER_STATUS_ENDPOINT } from "../../constants/endpoint";
import { getRoutes } from "../services/server.status.service";

export const router: Router = Router();

// getStatus
router.get(SERVER_STATUS_ENDPOINT + "/", (_req, res) => {
  res.status(200).send({
    status: "server is running",
  });
});

// getRoutes
router.get(SERVER_STATUS_ENDPOINT + "/routes", (_req, res) => {
  const routes = getRoutes();
  res.status(200).send({
    numberOfRoutes: routes.length,
    routes: routes,
  });
});
