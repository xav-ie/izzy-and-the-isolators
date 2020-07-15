const PORT = 5555;
var express = require("express");
var app = express();
var serv = require("http").Server(app);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/client/index.html");
});
app.use("/client", express.static(__dirname + "/client"));
app.get("/favicon.ico", function (req, res) {
    res.sendFile(__dirname + "/client/img/bullet.png");
});

serv.listen(PORT);
console.log(`Server started on port ${PORT}...`);

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
