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

    var location = (decodeURIComponent(window.location)).split('#')[1] ;

    $("#getNext").on("click",function(){

        getNextNumber("demandes");

    })
    function getNextNumber(serviceName){

        $.getJSON( "/api/service/"+serviceName, function(data) {
                    $("#result").text( " success ");
                    console.log( data.nxtNumber);
                  })
                    .fail(function() {
                      console.log( "error" );
                    })
                    // .always(function() {
                    //   console.log( "complete" );
                    // });
                  }


    function addAttent(serviceName, nbr){
        listService.push(new anemAttent(serviceName, nbr,actionElement, location));
        listServiceName.push(serviceName.toUpperCase());
    }
    function getServiceByName(serviceName){
      return listService[listServiceName.indexOf(serviceName.toUpperCase())];
    }

    addAttent("Demandes", 55);
    // addAttent("Daip", 55);
    // addAttent("Employeurs", 55);

    var socket = io();

    myTimer         = document.getElementById("myTimer");
    listMessages    = document.getElementById("listMessages");

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

    socket.on("removeElement", function(data){
            console.info("To Remove " + data.srvName +" "+ data.item);
            var srv =getServiceByName(data.srvName);
            srv.removeElement(data.item);
                      })

    socket.on("addElement", function(data){
            // console.log(data.srvName);
            console.info("To Add " + data.srvName +" "+ data.item);
            var srv =getServiceByName(data.srvName);
            srv.addElement(data.item);
                  })


    socket.on("myTimer", function(msg){
                          myTimer.innerHTML=  msg  ;
                              })


});
