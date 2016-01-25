//inventories.js


Template.inventories.onCreated(function() {

    //Session.set("currentCount", null);
    //Session.set("currentVendor", "0");

    //this.actionForm = new ReactiveVar(true);   //display state of action-form
    //this.currentCount = new ReactiveVar(null); //id (display state of active count; the currentCount helper returns the full collection object
    //this.currentVendor = new ReactiveVar("0");
});


Template.inventories.onRendered(function() {
    var i = this;

    /*i.autorun(function() {
        var actionForm = i.actionForm.get();
        toggleActionForm(actionForm);
    });*/

    i.autorun(function() {
        var count = Session.get("currentCount");
        //var count = i.currentCount.get();

        if(count) {
            //display items table
            $("table").show();
        }
    });
});



Template.inventories.helpers({

    currentCount: function() {
        var countId = Session.get("currentCount");
        //var countId = Template.instance().currentCount.get();
        var count = Inventories.findOne({_id: countId});

        return count ? count : { _id: 0 }; //return dummy item if null
    },

    currentVendor: function() {
        var vendor = Session.get("currentVendor");
        return vendor ? vendor : "0";
    },

    items: function() {
        var countId = Session.get("currentCount");
        var vendor = Session.get("currentVendor");
        //var countId = Template.instance().currentCount.get();
        //var vendor = Template.instance().currentVendor.get();

        var inv = Inventories.findOne({_id: countId});

        if(inv) {
            //create condition; add vendor check if not 'all vendors'
            var condition = {active: true};
            if(vendor != "0") {
                condition.vendor = vendor;
            }

            //get list of items based on vendor, and join vendor name
            return Items.find(condition).map( function(item) {
                item.currentCount = countId;
                item.vendorName = Vendors.find(
                    {_id: item.vendor},
                    {_id: 0, name: 1}).map( function(vendor) {
                        return vendor.name;
                    });
                return item;
            });
        }
    }

});


Template.inventories.events({
    "submit .action-form form": function(event) {
        event.preventDefault();

        var count = $("select[name='count']").val();
        var vendor = $("select[name='vendor']").val();
        //var i = Template.instance();

        if(count == "0") {
            Meteor.call("insertInventory", function(err, result) {
                Session.set("currentCount", result);
                Session.set("currentVendor", vendor);
                //i.currentCount.set(result);
                //i.currentVendor.set(vendor);
            });
        }
        else {
            Session.set("currentCount", count);
            Session.set("currentVendor", vendor);
            //i.currentVendor.set(vendor);
            //i.currentCount.set(count);
        }
    }
});
