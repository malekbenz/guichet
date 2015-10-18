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


var objAttent = function(){
          this.demandes =[],
          this.Employeurs =[],
          this.DAIP =[]
      }

var listServices = new objAttent();
var max =20;

io.on("connection", function(socket)
    {

      var addedService = false;
      console.log("a new Connection");
      // envoi des listes d'attente
      socket.emit("firstConnection",listServices);

    function getServiceElements(serviceName){
      var elements =[];

      switch (serviceName.toUpperCase()) {
              case "demandes".toUpperCase():
                  elements = listServices.demandes;
                  break;
              case "Employeurs".toUpperCase():
                  elements = listServices.Employeurs;
                  break;
              case "DAIP".toUpperCase():
                  elements = listServices.DAIP;
                  break;
                }
                return elements;
    }

    function addItem(service){
      var elements =getServiceElements(service);

      var lastItem = elements[(elements.length-1)] || 0 ;
      var nxtNumber = ++lastItem % max || 1;

      elements.push(nxtNumber);

    }

    function removeItem(service,item){
      var elements =getServiceElements(service);

      var itemIndex=  elements.indexOf(item);
      elements.splice(itemIndex ,1);

    }

    socket.on("addElement", function(data){
          console.log(data.srvName)
            addItem(data.srvName);

            socket.broadcast.emit("addElement",data);
            // io.emit("addMessage",msg);
            });

    socket.on("removeElement", function(data){
              removeItem("demandes",data.item);
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
