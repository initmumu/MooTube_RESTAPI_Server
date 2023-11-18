import express from "express";
import { LogPrinter } from "./util/LogPrinter";
import userRouter from "./router/user.router";
import videoRouter from "./router/video.router";
import { createPushServer } from "./serverConnection/encodingPushServer";

const HOST = process.argv[3] ? process.argv[3] : "localhost";
const PORT = process.argv[2] ? process.argv[2] : 3000;

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path);
    next();
});
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/video"));
app.use("/user", userRouter);
app.use("/video", videoRouter);

(async () => {
    app.encodingServer = await createPushServer();
})();

app.listen(PORT, HOST, () => {
    LogPrinter.info(`Server is running at http://${HOST}:${PORT}`);
});
