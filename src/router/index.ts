import { Router } from "express";
import productRouter from './productRouter';
import customerRouter from "./customerRouter";
import transactionRouter from "./transactionRouter";

const indexRouter = Router();
indexRouter.use("/customer", customerRouter);
indexRouter.use("/product", productRouter);
indexRouter.use("/transaction", transactionRouter);

export default indexRouter;