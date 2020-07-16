const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const session = require('express-session');
var cookieSession = require('cookie-session');

const app = express();

app.set('trust proxy', 1) // trust first proxy

// app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));
// app.use(express.cookieSession({
//     key: 'app.sess',
//     secret: 'SUPERsekret'
// }));
// app.use(cookieSession({
//     name: 'session',
//     keys: ['key1', 'key2'],
//     secret: "woo"
// }))
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 60 * 1000
}));



app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.use(index);
const server = http.createServer(app);
const io = socketIo(server);

const CONNECTED_CLIENTS = {};


io.on("connection", (socket) => {
    console.log("New client connected");
    console.log(socket.id);
    socket.on("disconnect", () => {
        console.log("Client disconnected");

    });

    // server events that we may define them here 🎆
    socket.on("happy", (data) => {
        console.log(`Some is happy and the reason is: ${data.reason}`);
        socket.emit("serverMsg", {
            msg: "WE KNOW THAT YOU ARE HAPPY",
        });
    });

    socket.on("mouseMoved", (data) => {
        // this function broadcasts the mouseMoved event to aall other clients
        socket.broadcast.emit("mouseMoved", data);
        // the below funciton will emit to all sockets, including yourself
        // io.sockets.emit("mouseMoved", data);
        // console.log(data);
    });

});

// const getApiAndEmit = socket => {
//     const response = new Date();
//     // Emitting a new message. Will be consumed by the client
//     socket.emit("FromAPI", response);
// };

server.listen(port, () => console.log(`Socket server listening on port ${port}; if you would like to start the app, you will need to "cd client" and run "npm start" there, too.`));