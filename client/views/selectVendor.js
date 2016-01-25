//selectVendor.js



Template.selectVendor.helpers({

    vendors: function() {
        //if counts is set, auto-select the correct option
        return Vendors.find({active: true});
    }

});
