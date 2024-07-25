const config = require('./config');
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { routerApi } = require('./src/routes/index');

app.set('port', config.app.port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routerApi(app);

module.exports = { server, app };