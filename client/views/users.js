//users.js


Template.users.helpers({
    users: function() {
      return Meteor.users.find({}, {sort: {name: 1}});
    }
});


Template.users.events({
    "submit .new-user": function (event) {

        var name_ = $(event.target).children("input[name='name']").val();
        var email_ = $(event.target).children("input[name='email']").val();

        var insertParam = {
            username: name_,
            password: "FLo4E8QCe8",
            email: email_
        };

        Meteor.call("insertUser", insertParam);

        $(event.target).children("input[name='name']").val("");
        $(event.target).children("input[name='email']").val("");
        
        $(event.target).children("input[name='name']").focus();

        return false;
    }
});