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
    this.elements = [];
    this.list = $(parentId).find(".list-group");
    this.count = 1;
    this.next = 1;

    this.badge = myDiv.find(".attent");
    this.badgeNxt = myDiv.find(".next");

    (function (that) {
        $(that.list).on("click", ".list-group-item", function () {
            var item =Number($(this).text());
            $(this).fadeOut().remove();

            that.elements.splice( that.elements.indexOf(item),1);
            that.updateBadge();
            })
        myDiv.find("button").on("click", function () {
            that.addElement();
        })
    })(this);
    this.addElement = function () {
        var i = this.elements.length % 3;
        this.list.append($(itemTemplate).addClass(cssElment[i]).text(this.count));
        this.elements.push(this.count);
        this.count = (++this.count) % max || 1;
        this.updateBadge();

        console.log(this.elements.length)

    }
}

anemAttent.prototype.updateBadge = function () {
    this.badge.text(this.elements.length);
    this.badgeNxt.text(this.elements[0] || 0 );

}
// anemAttent.prototype.len = function () {
//     return this.list.find(".list-group-item").length;
// }
