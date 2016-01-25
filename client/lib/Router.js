//Router.js

///////////////////////////////////////////////////
// Each route currently uses the default "layout" template, which shows navigation links, the
//  login/logout box, and the content template assigned via the router
// The default page is inventories (since most likely that'll be the function used first on
//  most visits
// Each route checks that the user is logged in, otherwise it redirects to the index
///////////////////////////////////////////////////


Router.map(function() {

    this.route('index', {
        layoutTemplate: 'layout',
        path: '/',
        onBeforeAction: function() {
            if(Meteor.user()) {
                Router.go('inventories');
            }
            else {
                this.next();
            }
        }
    });

    this.route('items', {
        layoutTemplate: 'layout',
        onBeforeAction: function() {
            if(!Meteor.user() && !Meteor.loggingIn())
                Router.go('index');
            else {
                Session.set("routeId", "items");
                this.next();
            }
        }
    });

    this.route('vendors', {
        layoutTemplate: 'layout',
        onBeforeAction: function() {
            if(!Meteor.user() && !Meteor.loggingIn())
                Router.go('index');
            else {
                Session.set("routeId", "vendors");
                this.next();
            }
        }
    });

    this.route('inventories', {
        layoutTemplate: 'layout',
        onBeforeAction: function() {
            if(!Meteor.user() && !Meteor.loggingIn())
                Router.go('index');
            else {
                Session.set("routeId", "inventories");
                this.next();
            }
        }
    });

    this.route('orders', {
        layoutTemplate: 'layout',
        onBeforeAction: function() {
            if(!Meteor.user() && !Meteor.loggingIn())
                Router.go('index');
            else {
                Session.set("routeId", "orders");
                this.next();
            }
        }
    });

    this.route('users', {
        layoutTemplate: 'layout',
        onBeforeAction: function() {
            if(!Meteor.user() && !Meteor.loggingIn())
                Router.go('index');
            else
                this.next();
            }
    });
})
