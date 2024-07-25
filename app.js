const config = require('./config');
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

app.set('port', config.app.port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = { server, app };