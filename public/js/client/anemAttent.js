var anemAttent = function (parentName, max, callback, content) {

    var max = max || 10;
    var contentId = "#content" || "#" + content;
    var parentId = "#" + parentName;


    var itemTemplate =  '<a href="#" class="btn btn-primary btn-lg"></span></a>', //list-group-item
        cssElment =['btn-success', 'btn-warning','btn-danger','btn-info','btn-primary '] ; //['list-group-item-danger', 'list-group-item-success', 'list-group-item-warning'];

    function addListItemInline(idName) {
        var mydiv = $('<div><div class="panel panel-default">    <div class="panel-body">'
                        + '<button class="btn btn-primary btn-lg btn-block">' + idName
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

            that.removeElement(item);
            if (callback)
                {callback(that.serviceName,"removeElement",item);}

          });
        // Button click to Add item
        myDiv.find("button").on("click", function () {
            that.addElement();
            if (callback)
                {callback(that.serviceName,"addElement","my element");}

        });
    })(this);



    this.addElement = function () {
        var that =this;
        var i = that.elements.length % cssElment.length;
        var lastItem = that.elements[(that.elements.length-1)] || 0 ;

        var nxtNumber = ++lastItem % max || 1;
        var icone = '<span class="glyphicon glyphicon-user" aria-hidden="true">';

        var item = $(itemTemplate)
                            .attr("id",that.serviceName + nxtNumber)
                            .addClass(cssElment[i])
                            .html(icone+ ""+ ((nxtNumber <= 9) ? '0' + nxtNumber: nxtNumber) );
        that.list.append(item);
        that.elements.push(nxtNumber);
        that.items.push(that.serviceName + nxtNumber);
        that.updateBadge();
    }

    this.initilizeElements = function (dataElements) {
        var that =this;
        var icone = '<span class="glyphicon glyphicon-user" aria-hidden="true">';
        console.log(dataElements);

        for(var index=0; index< dataElements.length; index++)
        {
        var i = that.elements.length % cssElment.length;
        var nxtNumber = dataElements[index];
        var item = $(itemTemplate)
                            .attr("id",that.serviceName + nxtNumber)
                            .addClass(cssElment[i])
                            .html(icone+ ""+ ((nxtNumber <= 9) ? '0' + nxtNumber: nxtNumber) );
        that.list.append(item);
        that.elements.push(nxtNumber);
        that.items.push(that.serviceName + nxtNumber);


        }

        // var lastItem = that.elements[(that.elements.length-1)] || 0 ;

        // var nxtNumber = ++lastItem % max || 1;

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
