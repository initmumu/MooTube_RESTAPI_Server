const zmq = require("zeromq");

export const createPushServer = async () => {
    const encodingPushServer = new zmq.Push();
    await encodingPushServer.bind("tcp://127.0.0.1:6329");
    return encodingPushServer;
};
