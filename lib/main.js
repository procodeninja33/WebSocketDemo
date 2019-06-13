const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const envConfig = require('./config');
const socketConnect = require('./WebSocket/webSocketConnect');
const devConfig = require('./config/devConfig');

/** connection of database */
envConfig.dbConfig((err) => {

    if (err) {
        console.error(err, 'exiting the app.');
        return;
    }

    /** declare the api route */
    require('./route')(app);

    /** create admin if there have no any admin */
    envConfig.adminConfig(devConfig.superAdminConfig);
    /** here is socket connection */
    socketConnect.socketConnect();

    /** listen the server */
    app.listen(devConfig.port.server, () => {
        console.log(`--- Server listing at port number ${devConfig.port.server} ---`);
    });
})



