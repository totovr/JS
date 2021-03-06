var text;     // variable for the text div you'll create
var socket = new WebSocket("ws://localhost:8081");

let font,
    fontsize = 40;

var value;

function setup() {
    createCanvas(800, 600);
    // The socket connection needs two event listeners:
    socket.onopen = openSocket;
    socket.onmessage = showData;
    // make a new div and position it at 10, 10:
    text = createDiv("Sensor reading: ");
    text.position(20, 20);
}

function draw()
{
    if(value == 0)
    {
        background(255);
    } else if (value == 1023)
    {
        background(204);
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
    xPos = int(value);        // convert result to an integer
    text.position(xPos, 20);        // position the text
}