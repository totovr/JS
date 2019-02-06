// Serial port
var SerialPort = require('serialport');// include the library
// get port name from the command line:
var portName = process.argv[2];
// Setup the port
var myPort = new SerialPort(portName, { baudRate: 115200 });
var Readline = SerialPort.parsers.Readline; // make instance of Readline parser
var parser = new Readline(); // make a new parser to read ASCII lines

// Events for the serial reading
myPort.pipe(parser); // pipe the serial stream to the parser
myPort.on('open', showPortOpen);
parser.on('data', readSerialData);
myPort.on('close', showPortClose);
myPort.on('error', showError);

// Server
// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port: 8081 });
// var connections = new Array; // list of connections to the server

const http = require('http');
const WebSocket = require('ws');
var sensorData;
var fs = require('fs');
const server = http.createServer(function handler(req, res) {
   if (req.url === '/' || req.url === '/index.html') {
     res.writeHead(200, { 'Content-Type': 'text/html' });
     res.write('<title>Serial connection</title>');
     res.write('<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.js"></script>');
     res.write('<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/addons/p5.dom.js"></script>');
     res.write('<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/addons/p5.sound.js"></script>');
     res.write('<script type="text/javascript" src="client.js"></script>');
     res.end(/* index.html contents */);
   } else if (req.url === '/client.js') {
     res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
     res.write('var text;     var socket = new WebSocket("ws://localhost:8081"); var value;');
     res.end(/* client.js contents */);
   }
});

const wss = new WebSocket.Server({ server });
var connections = new Array; // list of connections to the server

// Event for the socket connection 
wss.on('connection', handleConnection);

function handleConnection(client) {
   console.log("New Connection"); // you have a new client
   connections.push(client); // add this client to the connections array
   client.on('message', sendToSerial); // when a client sends a message,
   client.on('close', function () { // when a client closes its connection
      console.log("connection closed"); // print it out
      var position = connections.indexOf(client); // get the client's position in the array
      connections.splice(position, 1); // and delete it from the array
   });
}

function showPortOpen() {
   console.log('port open. Data rate: ' + myPort.baudRate);
}

function readSerialData(data) {
   // console.log(data);
   // if there are webSocket connections, send the serial data
   // to all of them:
   sensorData = data;
   if (connections.length > 0) {
      broadcast(data);
   }
}

function showPortClose() {
   console.log('port closed.');
}

function showError(error) {
   console.log('Serial port error: ' + error);
}

function sendToSerial(data) {
   console.log("sending to serial: " + data);
   myPort.write(data);
}

// This function broadcasts messages to all webSocket clients
function broadcast(data) {
   for (myConnection in connections) {   // iterate over the array of connections
      connections[myConnection].send(data); // send the data to each connection
   }
}

server.listen(8081);