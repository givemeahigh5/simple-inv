//collections.js


//create collections
Vendors = new Mongo.Collection("vendors");
Items = new Mongo.Collection("items");
Inventories = new Mongo.Collection("inventories");



Meteor.methods({


    insertVendor: function(insertParam) {
        if(Meteor.userId()) {
            insertParam.createdBy = this.userId;
            Vendors.insert(insertParam);
        }},
    updateVendor: function(itemId, updateParam) {
        if(Meteor.userId()) {
            Vendors.update(
                { _id: itemId, createdBy: this.userId },
                { $set: updateParam });
        }},
    deleteVendor: function(itemId) {
        if(Meteor.userId()) {
            Vendors.remove(itemId);
        }},




    insertItem: function(insertParam) {
        if(Meteor.userId()) {
            insertParam.createdBy = this.userId;
            Items.insert(insertParam);
        }},
    updateItem: function(itemId, updateParam) {
        if(Meteor.userId()) {
            Items.update(
                { _id: itemId, createdBy: this.userId },
                { $set: updateParam });
        }},
    deleteItem: function(itemId) {
        if(Meteor.userId()) {
            Items.remove(itemId);
        }},




    insertInventory: function() {
        if(Meteor.userId()) {
            insertParam = {
                createdBy: this.userId,
                date: new Date()
            };

            return Inventories.insert(insertParam);
        }},



    insertCount: function(itemId, insertParam) {
        if(Meteor.userId()) {
            Items.update(
                { _id: itemId, createdBy: this.userId },
                { $push: { counts: insertParam }});
        }},
    updateCount: function(itemId, countId, updateParam) {
        if(Meteor.userId()) {
            //updateParam = {counts.$.<count field> : <field input value>}
            Items.update(
                { _id: itemId, "counts.countId": countId, createdBy: this.userId },
                { $set: updateParam });
        }},
    deleteCount: function(itemId, week) {
        if(Meteor.userId()) {
            var item = Items.findOne( { _id: itemId });

            Items.update(
                { _id: itemId, createdBy: this.userId },
                { $pull: { counts: { week: week }}});
        }},




    insertOrder: function(itemId, insertParam) {
        if(Meteor.userId()) {
            Items.update(
                { _id: itemId, createdBy: this.userId },
                { $push: { orders: insertParam }});
        }},
    updateOrder: function(itemId, week, updateParam) {
        if(Meteor.userId()) {
        Items.update(
                { _id: itemId, "orders.week": week, createdBy: this.userId },
                { $set: updateParam });
        }},
    deleteOrder: function(itemId, week) {
        if(Meteor.userId()) {
            Items.update(
                { _id: itemId, createdBy: this.userId },
                { $pull: { orders: { week: week }}});
        }},



    createAccount: function(insertParam) {
        Accounts.createUser(insertParam, function(err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("user created");
            }
        });
    }
/*
    insertUser: function(insertParam) {
        if(Meteor.userId()) {
            Accounts.createUser(insertParam);
    }},
    updateUser: function(userId, updateParam) {
        if(Meteor.userId()) {
            Meteor.users.update(
                { _id: userId, createdBy: Meteor.userId },
                { $set: updateParam });
        }},
    deleteUser: function(userId) {
        if(Meteor.userId()) {
            Meteor.users.remove(userId);
    }},
    getUserEmail: function(username) {
        return Meteor.users.findOne({ username: username, createdBy: Meteor.userId }).emails[0].address;
    }
*/

});
