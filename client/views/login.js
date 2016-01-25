//login.js


Tracker.autorun(function() {
    var loginDropdown = Session.get("loginDropdown");

    if(loginDropdown) {
        $(".login-dropdown").show();
        $(".login-dropdown input:enabled:visible:first").focus();
    }
    else {
        $(".login-dropdown").hide();
    }
});


Template.login.created = function() {
    Session.set("loginDropdown", false);
}


Template.login.events({
    'click .login-button': function(e) {
        e.preventDefault();
        Session.set("loginDropdown", !Session.get("loginDropdown"));
    },

    'click .logout-button': function(e) {
        e.preventDefault();
        Meteor.logout();
        Session.set("loginDropdown", false);
        Session.set("routeId", null);
    },


    'submit #login-form' : function(e, t){
        e.preventDefault();
        // retrieve the input field values
        var username = t.find('#login-username').value;
        var password = t.find('#login-password').value;
        console.log(username, password);

        username = username.replace(/^\s*|\s*$/g, "");
        //other validation?

        Meteor.loginWithPassword(username, password, function(err){
            if (err) {
                console.log('no');
                //show error message
            }
            else {
                console.log('yay');
                Session.set("loginDropdown", false);
            }
        });

        return false;
    },


    'submit #register-form' : function(e, t){
        e.preventDefault();
        // retrieve the input field values
        var username = t.find('#login-username').value;
        var password = t.find('#login-password').value;

        username = username.replace(/^\s*|\s*$/g, "");
        //other validation?

        Meteor.loginWithPassword(username, password, function(err){
            if (err) {
                console.log(err);
            }
            else {
                Router.go("/");
            }
        });

        return false;
    },
});
