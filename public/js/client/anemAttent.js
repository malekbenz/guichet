var anemAttent = function (parentName, max, callback, content) {

    var max = max || 10;
    var contentId = "#content" || "#" + content;
    var parentId = "#" + parentName;
    var itemTemplate = '<a href="#" class="list-group-item "></a>',
        cssElment = ['list-group-item-danger', 'list-group-item-success', 'list-group-item-warning'];

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
    this.list     = $(parentId).find(".list-group");
    this.badge    = myDiv.find(".attent");
    this.badgeNxt = myDiv.find(".next");


    (function (that) {
        $(that.list).on("click", ".list-group-item", function () {
            var item =Number($(this).text());
            that.removeElement(item);
            if (callback)
                {callback("demande","removeElement",item);}

          });
        myDiv.find("button").on("click", function () {
            that.addElement();
            if (callback)
                {callback("demande","addElement","my element");}

        });
    })(this);

    this.removeElement =function(item){

      var that = this;
      var itemIndex= that.elements.indexOf(item);
      var itemId ="#"+that.items[itemIndex];
      $(itemId).fadeOut().remove();

      that.elements.splice(itemIndex ,1);
      that.items.splice(itemIndex,1);

      that.updateBadge();

    }


    this.addElement = function () {
        var i = this.elements.length % 3;
        var lastItem = this.elements[(this.elements.length-1)] || 0 ;

        var nxtNumber = ++lastItem % max || 1;
        var item = itemTemplate;
        this.list.append($(item).attr("id",parentName+nxtNumber).addClass(cssElment[i]).text(nxtNumber));
        this.elements.push(nxtNumber);
        this.items.push(parentName+nxtNumber);
        console.log(this.items);
        console.log(this.elements);
        this.updateBadge();
    }
}

anemAttent.prototype.updateBadge = function () {
    this.badge.text(this.elements.length);
    this.badgeNxt.text(this.elements[0] || 0 );
}
