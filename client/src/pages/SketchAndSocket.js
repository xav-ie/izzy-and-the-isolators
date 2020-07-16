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
            let clearButton;
            let saveButton;
            let textButton;
            let inputBar;
            let submitButton;
            let weight = 5;
            let slider;
            let index = -1;
            let globalSize = 10;
            let type2 = "";
            let msg = "";

        p.setup = () => {
            

            p.createCanvas(p.windowWidth, p.windowHeight);
            p.background(20);
            
            //create color picker
            colorPicker = p.createColorPicker('#ed225d');
            colorPicker.position(10, 100);
            
            //create slider
            slider = p.createSlider(1, 20, 5, 1);
            slider.position(10, 50);
            slider.style('width', '80px');

            //create butoons
            drawButton = p.createButton('DRAW');
            drawButton.position(10, 150);
            drawButton.mousePressed(p.drawStuff);

            eraseButton = p.createButton('ERASE');
            eraseButton.position(10, 200);
            eraseButton.mousePressed(p.erase);

            circleButton = p.createButton('CIRCLE');
            circleButton.position(10, 250);
            circleButton.mousePressed(p.circle);

            squareButton = p.createButton('SQUARE');
            squareButton.position(10, 300);
            squareButton.mousePressed(p.square);

            inputBar = p.createInput();
            inputBar.id('inputBar');
            inputBar.position(0, 350)
            submitButton = p.createButton('Submit comment');
            submitButton.position(10, 400)
            submitButton.mousePressed(p.insertText);

            clearButton = p.createButton('CLEAR CANVAS');
            clearButton.position(10, 450);
            clearButton.mousePressed(p.clearCanvas)

            saveButton = p.createButton('SAVE CANVAS');
            saveButton.position(10, 500);
            saveButton.mousePressed(p.saveCanvas)

            p.noStroke();
            socket.on("mouseMoved", ({ x, y , px, py, color, size, type}) => {
                if(type === "circle"){
                    p.fill(color)
                    p.ellipse(x,y,size,size)
                }
                else if (type === "rect"){
                    p.fill(color)
                    p.rect(x,y,size,size)
                }else if (type === "clear"){
                    p.clear();
                    p.background(20);
                }
                else{
                    p.stroke(color);
                    p.strokeWeight(size*2);
                    p.line(x, y, px, py);
                }
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
            let shapeSize = slider.value()*20;
            let colors = colorPicker.value();
            let brushSize = slider.value();
            let data = {
                x: p.mouseX,
                y: p.mouseY,
                px: p.pmouseX,
                py: p.pmouseY,
                color: colors,
                size: shapeSize,
                type: ""
            };
            if(index == 0){
                p.fill(colors);
                p.ellipse(p.mouseX, p.mouseY, shapeSize, shapeSize);
                index = -1;
                data.type = "circle";
                socket.emit("mouseMoved", data);

            }
            if (index == 1){
                p.fill(colors);
                p.rect(p.mouseX, p.mouseY, shapeSize, shapeSize);
                index = -1;
                data.type = "rect";
                socket.emit("mouseMoved", data);
            }
            if(index == 2){
                msg = inputBar.value();
                p.textSize(shapeSize);
                p.fill(0);
                p.stroke(colors);
                p.strokeWeight(shapeSize/10);
                p.text(msg, p.mouseX, p.mouseY);
                index = -1;
            }
        }
        
        p.drawStuff = () => {
            index = -1;
        }
        p.circle = () => {
            index = 0;
        }
        p.square = () => {
            console.log("THATS AMORE");
            index = 1;
        }
        p.erase = () => {
            index = 3;
        }
        p.insertText = () =>{
            index = 2;
        }
        p.clearCanvas = () =>{
            p.clear();
            p.background(20);
            let data = {
                x: p.mouseX,
                y: p.mouseY,
                px: p.pmouseX,
                py: p.pmouseY,
                color: "",
                size: "",
                type: "clear"
            };
            socket.emit("mouseMoved", data);
        }
        p.saveCanvas = () =>{
            p.save('canvas.jpg')
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