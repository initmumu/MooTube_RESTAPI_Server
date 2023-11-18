import { requestVideoEncode } from "../src/service/videoEncode.service.js";
import { createPushServer } from "../src/serverConnection/encodingPushServer.js";

// ZMQ PUSH 서버 객체 생성
const server = await createPushServer();

// TEST 함수
const test = async (vid) => {
    console.log("[test] 호출");
    await requestVideoEncode(server, vid);
};

test(12);
