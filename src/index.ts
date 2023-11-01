import express from "express";
import { PrismaClient } from "@prisma/client";
import { PORT } from "./configs";

const client = new PrismaClient();
const app = express();

app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));
