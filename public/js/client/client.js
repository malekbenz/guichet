$(function () {
  /// Add or remove an element --- action ="addElement"
    function actionElement(srvName, action, itemIndex){
      socket.emit(action, {
                srvName:srvName,
                item:itemIndex
            }
        );
    }

    demande = new anemAttent("Demande", 15,actionElement);

    daip = new anemAttent("Daip", 5);
    employeur = new anemAttent("Employeur");

    var socket = io();

    myTimer         = document.getElementById("myTimer");
    listMessages    = document.getElementById("listMessages");

    socket.on("removeElement", function(data){

                   demande.removeElement(data.item);
                      })

    socket.on("addElement", function(data){
              demande.addElement();
              console.log(data);
                  })

    socket.on("myTimer", function(msg){
                          myTimer.innerHTML=  msg ;
                              })


});
