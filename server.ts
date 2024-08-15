import express, { Request, Response, NextFunction } from 'express';
import indexRouter from "./src/router";
import prisma from './src/config/prisma';

const app = express();

app.use(express.json());
app.use("/", indexRouter);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
