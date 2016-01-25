//item.js


Template.item.helpers({
    vendors: function() {
      return Vendors.find( { active: true } );
    },

    isChecked: function() {
        return true;
    }
});


Template.item.events({
    "keyup .text, keyup .number": function (event) {

        var param = $(event.target);
        var updateParam = {};
        updateParam[param.attr("name")] = param.val();

        Meteor.call("updateItem", this._id, updateParam);
    },

    "change select": function(event) {

        var updateParam = {
            vendor: $(event.target).val()
        };

        Meteor.call("updateItem", this._id, updateParam);
    },

    "click .toggle-active": function() {
        var updateParam = {
            active: !this.active
        };

        Meteor.call("updateItem", this._id, updateParam);
    },

    "click .delete": function() {
        var box = confirm("Are you sure you want to delete this item? Deleting it will permanently erase its counts and orders.");
        if(box) {
            Meteor.call("deleteItem", this._id);
        }
    }
});
