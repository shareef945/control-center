require("dotenv").config();
import express, { Express } from "express";
import { expressjwt } from "express-jwt";
import http from "http";
import morgan from "morgan";
import todoRoutesV1 from "./src/routes/v1/todo-routes";
import authRoutesV1 from "./src/routes/v1/auth-routes";
import { API_PASSWORD, INVALID_TOKEN_MESSAGE, UNPROTECTED_ROUTES, port } from "./src/config/config";
import { notFound } from "./src/utils/not-found";
import cors from "cors";

const router: Express = express();
const auth = expressjwt({ secret: API_PASSWORD!, algorithms: ["HS256"] }).unless({ path: UNPROTECTED_ROUTES });

router.use(morgan("dev"));
router.use(cors());
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

/** ROUTES */
router.use("/v1/auth", auth, authRoutesV1);
router.use("/v1/todos", auth, todoRoutesV1);

router.get("/", (req, res) => {
  res.send("Server is running, please use the correct endpoint");
});

/** ERROR HANDLING */
router.use((err: Error, req: any, res: any, next: any) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: INVALID_TOKEN_MESSAGE });
  }
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

router.use((req, res, next) => {
  res.status(404).send(notFound);
});

/** SERVER */
const httpServer = http.createServer(router);
const PORT: any = port;
httpServer.listen(PORT, () => console.log(`Server is running on ${PORT}`));