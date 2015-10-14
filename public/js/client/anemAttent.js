var anemAttent = function (parentName, max, content) {

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
    this.list = $(parentId).find(".list-group");
    this.count = 1;
    this.next = 1;

    this.badge = myDiv.find(".attent");
    this.badgeNxt = myDiv.find(".next");

    (function (that) {
        $(that.list).on("click", ".list-group-item", function () {
            $(this).fadeOut().remove();
            that.updateBadge($(this).text());
        })
        myDiv.find("button").on("click", function () {
            that.addElement();
        })
    })(this);
    this.addElement = function () {
        var i = this.len() % 3;
        this.list.append($(itemTemplate).addClass(cssElment[i]).text(this.count));
        this.count = (++this.count) % max || 1;
        this.updateBadge();
    }
}

anemAttent.prototype.updateBadge = function (rmv) {
    this.badge.text(this.len());
    
    if (!rmv) return;
    console.log(this.len());

    if (rmv <= this.badgeNxt.text())
        this.badgeNxt.text(Number(rmv) + 1);
    
    if (!this.len()) this.badgeNxt.text(this.count);
    //if (!this.badgeNxt.text()) this.badgeNxt.text(1);
    

}
anemAttent.prototype.len = function () {
    return this.list.find(".list-group-item").length;
}