const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const devConfig = require('../config/devConfig')

module.exports.socketConnect = function () {

    io.on("connection", socket => {

        console.log(" *** user connected ***");

        // Log whenever a client disconnects from our websocket server
        socket.on("disconnect", function () {
            console.log(" *** user disconnected ***");
        });

        socket.on("addedUser", result => {
            io.emit("newUser", { status: 200, data: JSON.parse(result) });
        });
    });

    // Initialize our websocket server on port 8081
    http.listen(devConfig.port.webSocket, () => {
        console.log(`--- WebSocket listing at port number ${devConfig.port.webSocket} ---`);
    });
}