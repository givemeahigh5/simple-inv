//user.js


Template.user.helpers({
    email: function() {
        if(this.emails)
            return this.emails[0].address;
    }
});


Template.user.events({
    "blur .text[name=name]": function(event) {
        var updateParam = {
            username: event.target.value };
        Meteor.call("updateUser", this._id, updateParam);
    },

    "blur .text[name=email]": function(event) {
        var updateParam = {
            "emails.0.address": event.target.value };
        Meteor.call("updateUser", this._id, updateParam);
    },

    "click .delete": function() {
        var box = confirm("Are you sure you want to delete this user?");
        if(box) {
            Meteor.call("deleteUser", this._id);
        }
    }
});