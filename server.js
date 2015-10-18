var express = require('express');
var app = express();
var moment =require("moment");

var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static(__dirname + '/public'));

app.get('/api/developer/:index', function (req, res) {
    res.json(developers[req.params.index]);
});

var service ={};
var elements = [];
var max =25;
var clients =["addMessage"];
io.on("connection", function(socket)
    {
      var addedService = false;
    console.log("a new Connection");
    socket.on("addService",function(srvName){
      if (clients.indexOf(srvName))
        clients.push(srvName);

    })
    function addItem(){
      var lastItem = elements[(elements.length-1)] || 0 ;
      var nxtNumber = ++lastItem % max || 1;
      elements.push(nxtNumber);

    }

    function removeItem(item){
      var itemIndex=  elements.indexOf(item);
      elements.splice(itemIndex ,1);

    }

    socket.on("addElement", function(msg){
            addItem();
            console.log('La file est '+ elements);
            socket.broadcast.emit("addElement",elements);
            // io.emit("addMessage",msg);
            });
    socket.on("removeElement", function(data){
              removeItem(data.item);
              console.log('remove element : '+ data.item);
              socket.broadcast.emit("removeElement",data);
                    // io.emit("addMessage",msg);
              });

    socket.on("addMessage", function(data){
        console.log('Le message est '+ data.item);
        socket.broadcast.emit("addMessage",data);
        // io.emit("addMessage",msg);
        });

    setInterval(function(){
        var date =moment().format("HH:mm:ss")  ;
        io.emit("myTimer",date);
    },1000);
    socket.on('disconnect', function(){
        console.log('user disconnected');
        });
    })





ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

http.listen(3000,'0.0.0.0',function()
{
   console.log('Ready on port  %d', port);
}

)

// app.listen(port);
