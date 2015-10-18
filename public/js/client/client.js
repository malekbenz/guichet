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

    // demande = new anemAttent("Demandes", 20,actionElement);
    addAttent("Demandes", 20);
    addAttent("Daip", 20);
    addAttent("Employeurs", 20);
    // console.log(listService[0]);
    // console.log(listServiceName);
    // console.log(listService);
    // console.log(getServiceByName("demandes"));

    // daip = new anemAttent("Daip", 20,actionElement);
    // employeur = new anemAttent("Employeurs",20,actionElement);

    var socket = io();

    myTimer         = document.getElementById("myTimer");
    listMessages    = document.getElementById("listMessages");

    socket.on("firstConnection", function(data){
              console.log(data);
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
