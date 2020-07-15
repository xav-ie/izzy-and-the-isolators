import React from 'react';
var p5 = require("p5");

class Sketchy extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
    }

    Sketch = (p) => {
        // var socket;
        p.setup = () => {
            // socket = io();
            p.createCanvas(p.windowWidth, p.windowHeight);
            p.background(20);
            p.noStroke();
        }

        p.draw = () => {

        }
    }

    componentDidMount() {
        this.myP5 = new p5(this.Sketch, this.myRef.current)
    }

    render() {
        return (
            <div ref={this.myRef}>

            </div>
        )
    }
}

export default Sketchy;



// var socket;

// function setup() {
//     socket = io();
//     createCanvas(windowWidth, windowHeight);
//     
//     background(40);

//     //   const happy = () => {
//     //     socket.emit("happy", {
//     //       reason: "I am learning WebSockets",
//     //     });
//     //   };

//     socket.on("serverMsg", (data) => {
//         console.log(`server message: ${data.msg}`);
//     });

//     socket.on("mouseMoved", ({ x, y }) => {
//         fill(255, 255, 0);
//         ellipse(x, y, 60);
//     });
//     socket.on("connect", function () {
//         console.log("client connected to server");
//         console.log(socket.id);
//     });
// }

// function draw() { }

// function mouseDragged() {
//     console.log(`${mouseX}, ${mouseY}`);
//     fill(255);
//     ellipse(mouseX, mouseY, 60);
//     const data = {
//         x: mouseX,
//         y: mouseY,
//     };
//     socket.emit("mouseMoved", data);
// }