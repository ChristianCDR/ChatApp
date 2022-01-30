import io from "socket.io-client";

const ENDPOINT = "http://localhost:4000";

const connection= io(ENDPOINT);

export default connection;