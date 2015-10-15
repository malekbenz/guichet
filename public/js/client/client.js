$(function () {
  /// Add or remove an element --- action ="addElement"
    function actionElement(srvName, action, element){
      socket.emit(action, {
                srvName:srvName,
                element:element
            }
        );
    }

    demande = new anemAttent("Demande", 10,actionElement);

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


    socket.on("removeElement", function(msg){
                  console.log(msg.element);
                   demande.removeElement(msg.element);

                      })

    socket.on("addElement", function(msg){
              console.log(msg.element);
              demande.addElement();

                  })
    socket.on("myTimer", function(msg){
                          myTimer.innerHTML=  msg ;
                              })


});
