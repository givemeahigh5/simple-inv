//orders.js


Template.orders.onCreated(function() {
    Session.set("actionForm", false);
});


Template.orders.helpers({
    counter: function() {
      return Session.get("counter");
    },

    itemsByCounter: function() {
        var counter = Session.get("counter");
        var week = Session.get("week");

        if(counter != "") {
            var itemsList = [];
            Vendors.find( {active: true, counter: counter}).forEach( function(vendor) {
                Items.find( { active: true, vendor: vendor._id }).forEach( function(item) {
                    item.vendorName = vendor.name;
                    item.delivDay = vendor.delivDay;

                    calculateUsage(item, week);
                    calculateOrder(item, week);

                    itemsList.push(item);
              });
          });
          return itemsList;
      }
    }

});

Template.orders.events({
    'click #action-button': function(event) {
        event.preventDefault();
        Session.set("actionForm", !Session.get("actionForm"));
    },


  "keyup .select-counter": function(event) {
        var counter = $(".select-counter").val();

        if(Meteor.users.findOne( { username: counter })) {
           Session.set("counter", counter);
        }
    },

    "click .new-order": function(event) {
        var emailText = "";

        var counter = Session.get("counter");
        var week = Session.get("week");

        if(counter != "") {
            var itemsList = [];
            Vendors.find( {active: true, counter: counter}).forEach( function(vendor) {
                emailText += "\n\n" + vendor.name + "\n---------------------\n";

                Items.find( { active: true, vendor: vendor._id }).forEach( function(item) {
                    item.vendorName = vendor.name;
                    item.orderAmount = $("#"+item._id).val();

                    var updateParam = {};

                    //easier way to do this since field name is constant
                    if(hasOrder(item, week)) {
                        updateParam["orders.$.amount"] = item.orderAmount;
                        Meteor.call("updateOrder", item._id, week, updateParam);
                    }
                    else if(item.orderAmount > 0) {
                        updateParam["week"] = week;
                        updateParam["amount"] = item.orderAmount;

                        Meteor.call("insertOrder", item._id, updateParam);
                    }
                    //else no order placed, so ignore

                    //add each item to email form
                    if(parseInt(item.orderAmount) > 0)
                        emailText += writeOrder(item);
                })
            });

            var emailTo = Meteor.users.findOne({ username: counter }).emails[0].address;
            var emailWeek = weekText(week);

            Meteor.call(
                "sendEmail",
                emailTo,
                "stc.inventory@gmail.com",
                counter+"'s Orders: Week of "+emailWeek,
                emailText,
                function(error, result) {
                    alert("Your order is saved. A summary email has been sent.");
                }
            );

        }
    }
});
