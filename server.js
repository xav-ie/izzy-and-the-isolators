const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
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
        console.log(data);
    });

});

// const getApiAndEmit = socket => {
//     const response = new Date();
//     // Emitting a new message. Will be consumed by the client
//     socket.emit("FromAPI", response);
// };

server.listen(port, () => console.log(`Socket server listening on port ${port}; if you would like to start the app, you will need to "cd client" and run "npm start" there, too.`));