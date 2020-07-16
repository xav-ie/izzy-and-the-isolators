

var socket;
let colorPicker;
let button;
let weight = 10;
let slider;
let index = -1;
let globalSize = 10;


function setup() {

    createCanvas(100, 100);
    colorPicker = createColorPicker('#ed225d');
    colorPicker.position(10, 200);



    socket = io();
    createCanvas(windowWidth, windowHeight);
    noStroke();
    background(40);

    socket.on("serverMsg", (data) => {
        console.log(`server message: ${data.msg}`);
    });

    socket.on("mouseMoved", ({ x, y, px, py, color, size, type}) => {
        if(type == "circle"){
            fill(color)
            ellipse(x,y,size,size)
        }
        else if (type == "rect"){
            fill(color)
            rect(x,y,size,size)
        }else{
            stroke(color);
            strokeWeight(size);
            line(x, y, px, py);
        }

    });
    socket.on("connect", function () {
        console.log("client connected to server");
        console.log(socket.id);
    });

    slider = createSlider(1, 20, 5, 1);
    slider.position(10, 100);
    slider.style('width', '80px');

}

function draw() { }

function mouseDragged() {
    if(index == 3){
        let brushSize = slider.value();
        colors = '#282828';
        console.log("is this even hit?")
        
        stroke(40,40,40)
        strokeWeight(brushSize);
        line(mouseX, mouseY, pmouseX, pmouseY);
    
        let data = {
            x: mouseX,
            y: mouseY,
            px: pmouseX,
            py: pmouseY,
            color: colors,
            size: brushSize,
            type: ""
        };
        data.type = "erase";
        socket.emit("mouseMoved", data);
    }

    if(index == -1){
    let brushSize = slider.value();
    colors = colorPicker.value();

    stroke(colorPicker.color());
    strokeWeight(brushSize);
    line(mouseX, mouseY, pmouseX, pmouseY);
    
    const data = {
        x: mouseX,
        y: mouseY,
        px: pmouseX,
        py: pmouseY,
        color: colors,
        size: brushSize,
        type: ""
    };
    socket.emit("mouseMoved", data);
    }
}

function mouseReleased(){
    let shapeSize = slider.value()*10;
    colors = colorPicker.value();
    let data = {
        x: mouseX,
        y: mouseY,
        px: pmouseX,
        py: pmouseY,
        color: colors,
        size: shapeSize,
        type: ""
    };
    if(index==0){
        fill(colors)
        ellipse(mouseX, mouseY, shapeSize, shapeSize)
        index = -1
        data.type = "circle"
        socket.emit("mouseMoved", data);
    }
    if (index==1){
        fill(colors)
        rect(mouseX, mouseY, shapeSize, shapeSize);
        index = -1
        data.type = "rect"
        socket.emit("mouseMoved", data);
    }
    index = -1
}
function drawCircle(){
    index = 0;
    console.log("circle was pressed")
}
function drawSquare(){
    index = 1;
    console.log("circle was pressed")
}
function eraseIndexChange(){
    index=3;
}