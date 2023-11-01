import express from "express";
import { PORT } from "./configs";
import authRouter from "./routers/Auth/Auth.router";

const app = express();
app.use(express.json());

app.use("/user", authRouter);

app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));
