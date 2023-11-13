import express from "express";
import { LogPrinter } from "./util/LogPrinter";
import userRouter from "./router/user.router";

const HOST = process.argv[3] ? process.argv[3] : "localhost";
const PORT = process.argv[2] ? process.argv[2] : 3000;

const app = express();
app.use(express.json());
app.use("/user", userRouter);

app.listen(PORT, HOST, () => {
  LogPrinter.info(`Server is running at http://${HOST}:${PORT}`);
});
