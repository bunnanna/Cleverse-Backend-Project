import express from "express";
import "express-async-errors";
import { PORT } from "./configs";
import authRouter from "./routers/Auth/Auth.router";
import ErrorHandler from "./middlewares/errorHandler";

const app = express();
const errorHandler = new ErrorHandler();
app.use(express.json());

app.use("/user", authRouter);
app.use(errorHandler.httpErrorHandler);

app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));
