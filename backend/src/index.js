const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const http = require('http');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app); //server fora do app

setupWebsocket(server);

// mongodb (nao relacional)
mongoose.connect('mongodb+srv://brunodiego5:brunodiego5@cluster0-fwtlo.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json()); //use todos os tipo de http, express.json deve vir antes do routes
app.use(routes);

server.listen(3333);