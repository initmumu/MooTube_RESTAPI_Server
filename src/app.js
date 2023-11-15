import express from "express";
import { LogPrinter } from "./util/LogPrinter";
import userRouter from "./router/user.router";
import { jwtAuth } from "./service/auth.service";
import videoRouter from "./router/video.router";

const HOST = process.argv[3] ? process.argv[3] : "localhost";
const PORT = process.argv[2] ? process.argv[2] : 3000;

const app = express();
app.use(express.json());
app.use("/user", userRouter);
app.use("/video", videoRouter);

app.get("/auth/need", jwtAuth, (req, res) => {
    res.send("인증이 필요한 서비스");
});

app.listen(PORT, HOST, () => {
    LogPrinter.info(`Server is running at http://${HOST}:${PORT}`);
});
