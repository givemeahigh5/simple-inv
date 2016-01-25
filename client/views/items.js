//items.js



Template.items.onCreated(function() {
    this.actionForm = new ReactiveVar(false);   //display state of action-form
});


Template.items.onRendered(function() {
    var i = this;

    i.autorun(function() {
        var actionForm = i.actionForm.get();
        toggleActionForm(actionForm);
    });
});



Template.items.helpers({
    vendors: function() {
        return Vendors.find( {active: true} );
    },

    items: function() {
        return Items.find().map( function(item) {
            item.vendorName = Vendors.find(
                {_id: item.vendor},
                {_id: 0, name: 1}).map( function(vendor) {
                    return vendor.name;
            });
            return item;
        });
    }
});



Template.items.events({
    'click #action-button': function(event) {
        event.preventDefault();
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

      Meteor.call("insertItem", insertParam);

      // reset form
      var nameField = fields.filter("input[name='name']");
      nameField.val("");
      nameField.focus();

      return false;
  }
});
