//index.js


Template.topLinks.onCreated(function() {

    var routeId = "#link-"+Session.get("routeId");

    $(".top-links .link").css("background-color", "inherit");
    $(routeId).css("background-color", "#6e809c");


    this.autorun(function() {
        var routeId = "#link-"+Session.get("routeId");

        $(".top-links .link").css("background-color", "inherit");
        $(routeId).css("background-color", "#6e809c");
    });
});
