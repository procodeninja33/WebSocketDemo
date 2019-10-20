const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const devConfig = require('../config/devConfig');
const responseHandler = require('../utils/responseHandler')

module.exports.socketConnect = function () {

    var loggedInUsers = [];

    io.on("connection", socket => {

        console.log(" *** user connected with id : ", socket.id);

        io.emit('counteLogin', {
            status: 200,
            message: 'New user Login.',
            data: loggedInUsers
        });

        /** Log whenever a client disconnects from our websocket server */
        socket.on("disconnect", function () {
            console.log(" *** user disconnected with id : ", socket.id);
        });

        /** When new user registrerd */
        socket.on('addedUser', result => {

            io.emit('newUser', {
                status: 200,
                message: 'New user registred.',
                data: JSON.parse(result)
            });
        });

        socket.on('login', result => {
            result = JSON.parse(result);
            loggedInUsers.push(result['_id']);

            io.emit('counteLogin', {
                status: 200,
                message: 'New user Login.',
                data: loggedInUsers
            });
        });

        socket.on('logout', result => {
            result = JSON.parse(result);

            let index = loggedInUsers.indexOf(result);
            if(index > -1) {
                loggedInUsers.splice(index, 1);

                io.emit('counteLogin', {
                    status: 200,
                    message: 'New user Login.',
                    data: loggedInUsers
                });
            }

        })
    });

    // Initialize our websocket server on port 8081
    http.listen(devConfig.port.webSocket, () => {
        console.log(`--- WebSocket listing at port number ${devConfig.port.webSocket} ---`);
    });
}