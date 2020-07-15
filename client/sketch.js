

var socket;
let colorPicker;
let button;
let weight = 10;
let slider;


function setup() {

    createCanvas(100, 100);
    colorPicker = createColorPicker('#ed225d');
    colorPicker.position(0, height + 5);



    socket = io();
    createCanvas(windowWidth, windowHeight);
    noStroke();
    background(40);

    //   const happy = () => {
    //     socket.emit("happy", {
    //       reason: "I am learning WebSockets",
    //     });
    //   };

    socket.on("serverMsg", (data) => {
        console.log(`server message: ${data.msg}`);
    });

    socket.on("mouseMoved", ({ x, y, px, py, color, size}) => {
        //fill(255, 255, 0);
        stroke(color);
        strokeWeight(size);
        line(x, y, px, py);
        //ellipse(x, y, 60);
    });
    socket.on("connect", function () {
        console.log("client connected to server");
        console.log(socket.id);
    });

    button = createButton('BIG');
    button.position(19, 19);
    button.mousePressed(weight = weight+1);


    slider = createSlider(1, 20, 5, 1);
    slider.position(10, 10);
    slider.style('width', '80px');

}

function draw() { }

function increaseWeight() {
    console.log("Hello");
}



function mouseDragged() {
    //console.log(`${mouseX}, ${mouseY}`);
    //fill(colorPicker.color());
    let brushSize = slider.value();
    colors = colorPicker.value();

    stroke(colorPicker.color());
    strokeWeight(brushSize);
    //ellipse(mouseX, mouseY, 10);
    line(mouseX, mouseY, pmouseX, pmouseY);
    
    const data = {
        x: mouseX,
        y: mouseY,
        px: pmouseX,
        py: pmouseY,
        color: colors,
        size: brushSize
    };
    socket.emit("mouseMoved", data);
}