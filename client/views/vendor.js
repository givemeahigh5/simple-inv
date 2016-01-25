//vendor.js


Template.vendor.events({
    "keyup .text, .number": function (event) {

        var param = $(event.target);
        var updateParam = {};
        updateParam[param.attr("name")] = param.val();

        Meteor.call("updateVendor", this._id, updateParam);
    },

    "change select": function(event) {

        var param = $(event.target);
        var updateParam = {};
        updateParam[param.attr("name")] = param.val();

        // change event is triggered in child context (daySelect), so Template.instance().data is required instead of this
        Meteor.call("updateVendor", Template.instance().data._id, updateParam);
    },

    "click .toggle-active": function() {
        var updateParam = {
            active: !this.active
        };

        Meteor.call("updateVendor", this._id, updateParam);
    },

    "click .delete": function() {
        var box = confirm("Are you sure you want to delete this vendor?");
        if(box) {
            Meteor.call("deleteVendor", this._id);
        }
    }
});
