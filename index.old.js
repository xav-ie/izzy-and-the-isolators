const express = require('express');
const path = require('path');

const app = express();
var serv = require("http").Server(app);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
const io = require("socket.io")(serv, {});
io.sockets.on("connection", (socket) => {
    const SOCKETID = socket.id;
    console.log(`new socket connection: ${SOCKETID}`);

    socket.on("happy", (data) => {
        console.log(`Some is happy and the reason is: ${data.reason}`);
        socket.emit("serverMsg", {
            msg: "WE KNOW THAT YOU ARE HAPPY",
        });
    });
    socket.emit("serverMsg", {
        msg: "This is a server message",
    });

    socket.on("mouseMoved", (data) => {
        socket.broadcast.emit("mouseMoved", data);
        // the below funciton will emit to all sockets, including yourself
        // io.sockets.emit("mouseMoved", data);
        console.log(data);
    });
});