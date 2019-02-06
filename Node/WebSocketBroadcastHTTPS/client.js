var text;     // variable for the text div you'll create
var socket = new WebSocket("wss://localhost:8081");
var value;

function setup() {
    createCanvas(1200, 100);
    // The socket connection needs two event listeners:
    socket.onopen = openSocket;
    socket.onmessage = showData;
    // make a new div and position it at 10, 10:
    text = createDiv("Sensor reading: ");
    text.position(40, 50);
}

function draw() {
    if (value == 0) {
        background(120);
    } else if (value == 1023) {
        background(220);
    }
}

function openSocket() {
    text.html("Socket open");
    socket.send("Hello server");
}

function showData(result) {
    // when the server returns, show the result in the div:
    value = map(result.data, 0, 4095, 0, 1023);
    text.html("Sensor reading: " + value);
    var xPos = int(value);        // convert result to an integer
    if (xPos != 0) {
        text.position(xPos, 50);        // position the text
    } else if (xPos == 0) {
        text.position(xPos + 40, 50);
    }
}