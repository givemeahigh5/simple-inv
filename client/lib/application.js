//application.js


//subscriptions
Meteor.subscribe("vendors");
Meteor.subscribe("items");
Meteor.subscribe("inventories");


//initializes session variables when user logs in
Tracker.autorun(function() {
  var user = Meteor.user();
  if (user && user.username) {
      Session.set("loginDropdown", false);

      Session.set("currentCount", null);
      Session.set("currentVendor", "0");
      
      Router.go("/");
  }
  else {
      Session.set("routeId", null);
  }
});




isValidLength = function(val) {
    return (val.length >= 6 && val.length <= 16) ? true : false;
}
