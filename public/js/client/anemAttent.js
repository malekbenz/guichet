var anemAttent = function (parentName,  callback, location, content) {

    var contentId = "#content" || "#" + content;
    var parentId = "#" + parentName;

    var cssHide = (location == "demande") ?"hide":"";
    // console.log(location);
    // console.log(cssHide);

    var itemTemplate =  '<a href="#" class="btn btn-primary btn-lg"></span></a>', //list-group-item
        cssElment =['btn-success', 'btn-warning','btn-danger','btn-info','btn-primary '] ; //['list-group-item-danger', 'list-group-item-success', 'list-group-item-warning'];

    function addListItemInline(idName) {
        var mydiv = $('<div><div class="panel panel-default">    <div class="panel-body '+cssHide+'">'
                        + '<button class="btn btn-primary btn-lg btn-block ">' + idName
                        + '<br/> <span class="badge attent">0</span> <span class="badge next">1</span>  </button> '
                        + '</div></div>'
                        + ' <div class="list-group"></div>'
                        )
            .attr({ "id": idName })
            .addClass("col-md-4");
        return mydiv;
    }

    var myDiv = addListItemInline(parentName, contentId).appendTo(contentId);
    this.elements = [];
    this.items = [];
    this.serviceName = parentName;
    this.list     = $(parentId).find(".list-group");
    this.badge    = myDiv.find(".attent");
    this.badgeNxt = myDiv.find(".next");

    (function (that) {
        // Button click for remove item
        $(that.list).on("click", ".btn", function () { // .list-group-item
            var item =Number($(this).text());

            // that.removeElement(item);
            if (callback)
                {callback(that.serviceName,"removeElement",item);}

          });
        // Button click to Add item
        myDiv.find("button").on("click", function () {
            // that.addElement();
            if (callback)
                {callback(that.serviceName,"addElement","my element");}

        });
    })(this);


    this.clearAll=function(){
                that.list.empty();
                that.updateBadge();

    }

    this.addElement = function (nextNumber) {
        var that =this;
        var i = that.elements.length % cssElment.length;
        var icone = '<span class="glyphicon glyphicon-user" aria-hidden="true">';
                        var nxtNumber =nextNumber;
                          var item = $(itemTemplate)
                                              .attr("id",that.serviceName + nxtNumber)
                                              .addClass(cssElment[i])
                                              .html(icone+ ""+ ((nxtNumber <= 9) ? '0' + nxtNumber: nxtNumber) );
                          that.list.append(item);
                          that.elements.push(nxtNumber);
                          that.items.push(that.serviceName + nxtNumber);
                          that.updateBadge();

        // $.getJSON( "/api/service/"+that.serviceName, function(data) {
        //
        //           })
        //             .fail(function() {
        //               console.log( "error" );
        //             });




    }

    this.initilizeElements = function (dataElements) {
        console.log(dataElements);

        var that =this;
        that.elements.length = 0; // vider le tableau
        that.items.length = 0;

        that.list.empty();
        var addedItem=$("<div/>");

        var icone = '<span class="glyphicon glyphicon-user" aria-hidden="true">';

        for(var index=0; index< dataElements.length; index++)
        {
        var i = that.elements.length % cssElment.length;
        var nxtNumber = dataElements[index];
        var item = $(itemTemplate)
                            .attr("id",that.serviceName + nxtNumber)
                            .addClass(cssElment[i])
                            .html(icone+ ""+ ((nxtNumber <= 9) ? '0' + nxtNumber: nxtNumber) );
        $(addedItem).append(item);
        that.elements.push(nxtNumber);
        that.items.push(that.serviceName + nxtNumber);
        }
        that.list.append(addedItem);


        that.updateBadge();
    }
    this.removeElement =function(item){

          var that = this;
          var itemIndex= that.elements.indexOf(item);
          var itemId ="#"+that.items[itemIndex];
          $(itemId).fadeOut().remove();

          that.elements.splice(itemIndex ,1);
          that.items.splice(itemIndex,1);

          that.updateBadge();

    }
}

anemAttent.prototype.updateBadge = function () {
    this.badge.text(this.elements.length);
    this.badgeNxt.text(this.elements[0] || 0 );
}
