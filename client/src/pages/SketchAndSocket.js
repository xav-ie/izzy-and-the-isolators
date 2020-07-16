import React from "react";
import socketIOClient from "socket.io-client";
//import { text } from "express";
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
            let colorPicker;
            let drawButton;
            let eraseButton;
            let circleButton;
            let squareButton;
            let textButton;
            let inputBar;
            let submitButton;
            let weight = 5;
            let slider;
            let index = -1;
            let globalSize = 10;
            let type = "";
            let msg = "";

        p.setup = () => {
            

            p.createCanvas(p.windowWidth, p.windowHeight);
            p.background(20);
            
            //create color picker
            colorPicker = p.createColorPicker('#ed225d');
            colorPicker.position(10, 200);
            
            //create slider
            slider = p.createSlider(1, 20, 5, 1);
            slider.position(10, 100);
            slider.style('width', '80px');

            //create butoons
            drawButton = p.createButton('DRAW');
            drawButton.position(10, 250);
            drawButton.mousePressed(p.drawStuff);

            eraseButton = p.createButton('ERASE');
            eraseButton.position(10, 300);
            eraseButton.mousePressed(p.erase);

            circleButton = p.createButton('CIRCLE');
            circleButton.position(10, 350);
            circleButton.mousePressed(p.circle);

            squareButton = p.createButton('SQUARE');
            squareButton.position(10, 400);
            //squareButton.mousePressed(square);

            inputBar = p.createInput();
            inputBar.id('inputBar');
            inputBar.position(0, 500)
            submitButton = p.createButton('Submit comment');
            submitButton.position(10, 550)
            submitButton.mousePressed(p.insertText);

            p.noStroke();
            socket.on("mouseMoved", ({ x, y , px, py, color, size, type}) => {
                p.stroke(color);
                p.strokeWeight(size);
                p.line(x, y, px, py);
            });
            p.textSize(32);
            
        }

        p.mouseDragged = () => {
            if(index == -1){
                let brushSize = slider.value();
                let colors = colorPicker.value();

                p.stroke(colorPicker.color());
                p.strokeWeight(brushSize*2);
                p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
                const data = {
                    x: p.mouseX,
                    y: p.mouseY,
                    px: p.pmouseX,
                    py: p.pmouseY,
                    color: colors,
                    size: brushSize,
                    type: ""
                };
                socket.emit("mouseMoved", data);
            }
            if(index == 2){
                msg = inputBar.value;
                p.textSize(30);
                p.text(msg, p.mouseX, p.mouseY);
            }
            if(index == 3){
                let brushSize = slider.value();
                let colors = '#141414'
                p.stroke(20);
                p.strokeWeight(brushSize*2);
                p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
                let data = {
                    x: p.mouseX,
                    y: p.mouseY,
                    px: p.pmouseX,
                    py: p.pmouseY,
                    color: colors,
                    size: brushSize,
                    type: "erase"
                };
                socket.emit("mouseMoved", data);
            }
        }
        p.mouseReleased = () => {

        }
        
        p.drawStuff = () => {
            index = -1;
        }
        p.circle = () => {
            index = 0;
        }
        p.square = () => {
            index = 1;
        }
        p.erase = () => {
            index = 3;
        }
        p.insertText = () =>{
            index = 2;
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