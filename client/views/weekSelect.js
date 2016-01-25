//weekselect.js


Template.weekSelect.helpers({
    thisWeek: function() {
        var today = new Date();
        var week = weekOf(today);
        return week;
    },

    lastWeek: function() {
        var today = new Date();
        var week = weekOf(today);
        var last = week - 7;     //subtract 7 days from this week
        return last;
    }
});

Template.weekSelect.events({
    "change .week-select": function(event) {
        Session.set("week", Number(event.target.value));
    }
});


/*
Template.daySelect.events({
    "click .day-select-check": function(event) {
        if(event.target.checked) {
            $('.day-select').prop('disabled', false);
            var selectedDay = Number($('.day-select').val());
            Session.set("day", selectedDay);
        }
        else {
            $('.day-select').prop('disabled', true);
            var today = new Date();
            Session.set("day", dayOf(today));
        }
    },

    "change .day-select": function(event) {
        var selectedDay = Number(event.target.value);
        Session.set("day", selectedDay);
    }
});*/
