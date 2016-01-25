//inventoriesItem.js


Template.inventoriesItem.helpers({
    onHand: function() {
        var item = Items.findOne({_id: this._id});
        if(item) {
            var counts = item.counts;
            if(counts) {
                for(var i=0; i<counts.length; i++) {
                    if(counts[i].countId == this.currentCount) {
                        return counts[i].onHand;
                    }
                }
            }
        }

        return null;
    }
});


Template.inventoriesItem.events({
    "keyup .item-field": function(event) {

        var onHand = $(event.target).val();
        var countId = this.currentCount;

        var updateParam = {};
        var existing = Items.findOne({_id: this._id, "counts.countId": countId});

        if(existing) {
            updateParam["counts.$.onHand"] = onHand;
            Meteor.call("updateCount", this._id, countId, updateParam);
        }
        else {
            updateParam.countId = countId;
            updateParam.onHand = onHand;
            Meteor.call("insertCount", this._id, updateParam);
        }
    }
});
