$(function () {
  /// Add or remove an element --- action ="addElement"
    function actionElement(srvName, action, itemIndex){
      socket.emit(action, {
                srvName:srvName,
                item:itemIndex
            }
        );
    }

    var listService =[];
    var listServiceName =[];
    function addAttent(serviceName, nbr){
        listService.push(new anemAttent(serviceName, nbr,actionElement));
        listServiceName.push(serviceName.toUpperCase());
    }
    function getServiceByName(serviceName){
      return listService[listServiceName.indexOf(serviceName.toUpperCase())];
    }

    addAttent("Demandes", 20);
    addAttent("Daip", 20);
    addAttent("Employeurs", 20);

    var socket = io();

    myTimer         = document.getElementById("myTimer");
    listMessages    = document.getElementById("listMessages");

      function getServiceFromObject(serviceName, data){
        var elements=[];
        switch (serviceName.toUpperCase()) {
                case "demandes".toUpperCase():
                    elements = data.demandes;
                    break;
                case "Employeurs".toUpperCase():
                    elements = data.Employeurs;
                    break;
                case "DAIP".toUpperCase():
                    elements = data.DAIP;
                    break;
                  }
          return elements;
      }

    socket.on("firstConnection", function(data){

              var elements=[];
                for (var index = 0; index < listService.length; index++ ){
                    elements = getServiceFromObject(listServiceName[index] ,data);
                    listService[index].initilizeElements(elements);
                  }

                  })

    socket.on("removeElement", function(data){
            console.log(data);

            getServiceByName(data.srvName).removeElement(data.item);
                      })

    socket.on("addElement", function(data){
            console.log(data.srvName);
            getServiceByName(data.srvName).addElement();
                  })

    socket.on("myTimer", function(msg){
                          myTimer.innerHTML=  msg ;
                              })


});
