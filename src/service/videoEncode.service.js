export const requestVideoEncode = async (encodingPushServer, vid) => {
    await encodingPushServer.send(vid);
};
