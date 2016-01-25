//selectCount.js


Template.selectCount.helpers({

    //the confusing part here is that inventories no longer have an associated vendor, just a date and creator
    //

    counts: function() {
        return Inventories.find({}, {sort: {date: -1}, limit: 10}).map(function(inv) {
            /*if(inv.vendor != "0") {
                inv.vendorName = Vendors.find(
                    {_id: inv.vendor},
                    {_id: 0, name: 1}).map( function(vendor) {
                        return vendor.name;
                    });
            }
            else {
                inv.vendorName = "All";
            }*/

            inv.longDate = longDate(inv.date);

            return inv;
        });
    }
});

//trigger event to change and disable count when selecting existing

Template.selectCount.events({
    "change input[name='count']": function() {
        //do stuff
    }
});
