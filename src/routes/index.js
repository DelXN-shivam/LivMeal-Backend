import express from "express";
import messRouter from "./messRoutes.js";
import { studentRouter } from "./studentRoutes.js";
import { adminRouter } from "./adminRoutes.js";
import authRouter from "./authRoutes.js";
import { reviewRouter } from "./reviewRoutes.js";
import menuRouter from "./menuRoutes.js";

const rootRouter = express.Router();

//routes
rootRouter.use("/mess", messRouter);
rootRouter.use("/student", studentRouter);
rootRouter.use("/admin", adminRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/review", reviewRouter);
rootRouter.use("/menu", menuRouter);

export default rootRouter;
