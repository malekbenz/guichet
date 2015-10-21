$(function () {
  /// Add or remove an element --- action ="addElement"
    function actionElement(srvName, action, itemIndex){
      socket.emit(action, {
                srvName:srvName,
                item:itemIndex
            }
        );
    }

    $(window).focus(function() {
            socket.emit("focus");
        }).blur(function() {
            window_focus = false;
            console.log("window_ Quitter ");
    });

    var listService =[];
    var listServiceName =[];
// pour connaitre le service
    var location = (decodeURIComponent(window.location)).split('#')[1] ;

    function addAttent(serviceName, nbr){
        listService.push(new anemAttent(serviceName, actionElement, location));
        listServiceName.push(serviceName.toUpperCase());
    }

    function getServiceByName(serviceName){
      return listService[listServiceName.indexOf(serviceName.toUpperCase())];
    }

    addAttent("Demandes", 55);
    addAttent("Daip", 55);
    addAttent("Employeurs", 55);

    var socket = io();
    myTimer         = document.getElementById("myTimer");

    function getServiceFromObject(serviceName, data){
        var elements=[];
        switch (serviceName.toUpperCase()) {
                case "demandes".toUpperCase():
                    elements = data.demandes.elements;
                    break;
                case "Employeurs".toUpperCase():
                    elements = data.Employeurs.elements;
                    break;
                case "DAIP".toUpperCase():
                    elements = data.DAIP.elements;
                    break;
                  }
          return elements;
      }

    socket.on("firstConnection", function(data){

            console.log(data);
              var elements=[];
                for (var index = 0; index < listService.length; index++ ){
                    elements = getServiceFromObject(listServiceName[index] ,data);
                    listService[index].initilizeElements(elements);
                  }
                  })

    socket.on("focus", function(data){

            console.log("focus");
              var elements=[];
                for (var index = 0; index < listService.length; index++ ){
                    elements = getServiceFromObject(listServiceName[index] ,data);
                    listService[index].initilizeElements(elements);
                  }
                  }
                )

    socket.on("addElement", function(data){
            // console.log(data.srvName);
            console.info("To Add " + data.srvName +" "+ data.item);
            var srv =getServiceByName(data.srvName);
            srv.addElement(data.item);
                  })

    socket.on("removeElement", function(data){
            console.info("To Remove " + data.srvName +" "+ data.item);
            var srv =getServiceByName(data.srvName);
            srv.removeElement(data.item);
                      })

    socket.on("myTimer", function(msg){
                          myTimer.innerHTML=  msg  ;
                              })


});
