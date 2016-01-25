//publish models

Meteor.publish("items", function() {
  if(!this.userId) return null;
  return Items.find({createdBy: this.userId}, {sort: {vendor: 1, name: 1}});
});

Meteor.publish("inventories", function() {
  if(!this.userId) return null;
  return Inventories.find({createdBy: this.userId}, {sort: {date: -1}});
});

Meteor.publish("vendors", function() {
  if(!this.userId) return null;
  return Vendors.find({createdBy: this.userId}, {sort: {name: 1}});
});
