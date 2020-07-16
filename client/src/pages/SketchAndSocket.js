import React from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";
const p5 = require("p5");
const socket = socketIOClient(ENDPOINT);
socket.on("connect", function () {
    console.log("client connected to server");
    console.log(socket.id);
});


class SketchAndSocket extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
        console.log(props);
    }

    Sketch = (p) => {
        p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight);
            p.background(20);
            p.noStroke();
            socket.on("mouseMoved", ({ x, y }) => {
                p.fill(255, 255, 0);
                p.ellipse(x, y, 60);
            });
            p.textSize(32);
            p.fill(255);
        }

        p.draw = () => {
            p.text('word', 10, 30);
        }

        p.mouseDragged = () => {
            console.log(`${p.mouseX}, ${p.mouseY}`);
            p.fill(255);
            p.ellipse(p.mouseX, p.mouseY, 60);
            const data = {
                x: p.mouseX,
                y: p.mouseY,
            };
            socket.emit("mouseMoved", data);
        }
    }

    componentDidMount() {
        this.myP5 = new p5(this.Sketch, this.myRef.current)
    }

    render() {
        return (<div ref={this.myRef}></div>);
    }
}

export default SketchAndSocket;