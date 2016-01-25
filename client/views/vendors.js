//vendors.js



Template.vendors.onCreated(function() {
    this.actionForm = new ReactiveVar(false);   //display state of action-form
});


Template.vendors.onRendered(function() {
    var i = this;

    i.autorun(function() {
        //var actionForm = Session.get("vendorsActionForm");
        var actionForm = i.actionForm.get();
        toggleActionForm(actionForm);
    });
});


Template.vendors.helpers({
    vendors: function() {
      return Vendors.find({}, {sort: {counter: 1, name: 1}});
    }
});



Template.vendors.events({
    'click #action-button': function(event) {
        event.preventDefault();
        //Session.set("vendorsActionForm", !Session.get("vendorsActionForm"));
        Template.instance().actionForm.set(!Template.instance().actionForm.get());
    },


  "submit .action-form form": function (event) {

        // get input fields array
        var fields = $(event.target).children("input, select");
        var insertParam = { active: true };

        // iterate input fields and add to object as key/value pair (name, orderDay, delivDay, orderMin)
        fields.each(function() {
            var key = $(this).attr("name");
            insertParam[key] = $(this).val();
        });

        // insert record into vendors collection
        Meteor.call("insertVendor", insertParam);

        // reset form;
        fields.filter("input").val("");
        fields.filter("select").val("-1");

        //set focus to name
        fields.filter("input[name='name']").focus();

        return false;
    }
});
