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



var objAttent = function(){
          this.demandes ={elements:[], lastNumber:0 },
          this.Employeurs ={elements:[], lastNumber:0 },
          this.DAIP =={elements:[], lastNumber :0}
      }

var listServices = new objAttent();
var max =54;

    function getServiceElements(serviceName){
      var srv =[];

      switch (serviceName.toUpperCase()) {
              case "demandes".toUpperCase():
                  srv = listServices.demandes;
                  break;
              case "Employeurs".toUpperCase():
                  srv = listServices.Employeurs;
                  break;
              case "DAIP".toUpperCase():
                  srv = listServices.DAIP;
                  break;
                }
                return srv;
    }


app.get('/api/service/:serviceName', function (req, res) {

  var elements = getServiceElements(req.params.serviceName);

  // elements.lastNumber = (++elements.lastNumber+1) % max || 1;
  res.json({nxtNumber:elements.lastNumber});
});

io.on("connection", function(socket)
    {

      var addedService = false;
      console.log("a new Connection");
      // envoi des listes d'attente
      socket.emit("firstConnection",listServices);


    function addItem(service){
      var srv = getServiceElements(service);
      srv.lastNumber = (srv.lastNumber + 1 ) % max || 1;
      console.log(srv.elements);
      console.info(srv.lastNumber);
      srv.elements.push(srv.lastNumber);
      console.log(srv.elements);
      // srv.lastNumber = (srv.lastNumber +1) % max || 1;
      // console.log(srv.elements);

    }

    function removeItem(service,item){
      var elements =getServiceElements(service).elements;

      var itemIndex=  elements.indexOf(item);
      elements.splice(itemIndex ,1);

    }

    socket.on("addElement", function(data){
          console.log(data.srvName)
            addItem(data.srvName);

            // socket.broadcast.emit("addElement",data);
            io.emit("addElement",data);
            });

    socket.on("removeElement", function(data){
              removeItem(data.srvName,data.item);
              console.log('remove element : '+ data.item);
              socket.broadcast.emit("removeElement",data);
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
