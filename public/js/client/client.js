$(function () {

    demande = new anemAttent("Demande", 10);
    daip = new anemAttent("Daip", 5);
    employeur = new anemAttent("Employeur");


    var socket = io();

    myTimer         = document.getElementById("myTimer");
    listMessages    = document.getElementById("listMessages");



    $("#addMessage").on("click",function(){
            socket.emit("addElement", {
                      srvName:"demande",
                      element:"my element"
                  }
              );
    })


    socket.on("addElement", function(msg){
              console.log(msg.message);
              message.innerHTML += '<br/>'+msg.element;
                  })
    socket.on("myTimer", function(msg){
                          myTimer.innerHTML=  msg ;
                              })


});
