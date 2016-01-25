//dateMethods.js


weekOf = function(date_) {
    var day = Math.floor(date_.getTime() / 86400000);
    var weekday = date_.getDay();

    if(weekday >= 5)
        return (day + 7 % weekday);
    else
        return (day - weekday);
};

dayOf = function(date_) {
    var weekday = date_.getDay();
    if(weekday >= 5)
        weekday -= 7;
    return weekday;
};

isWeekOf = function(day_, week_) {
    if(day_ == week_) {
        return true;
    }
    else if(day_ > week_) {
        return (day_ - week_ <= 4);
    }
    else {
        return (week_ - day_ <= 2);
    }
};

weekText = function(week_) {
    var datestamp = week_ * 86400000 + 86400000;
    var date = new Date(datestamp);
    var dateText = date.toDateString();
    return dateText;
};

round1 = function(number_) {
    return Math.round(number_*10)/10;
};


longDate = function(date_) {
    var monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Decr"
    ];

    var day = date_.getDate();
    var monthIndex = date_.getMonth();
    var year = date_.getFullYear();

    return monthNames[monthIndex] + " " + day + ", " + year;
};


toggleActionForm = function(actionForm) {
    if(actionForm) {
        $(".action-form").css("display", "table");
        $(".action-form form input:enabled:visible:first").focus();
    }
    else {
        $(".action-form").hide();
    }
};



Template.registerHelper("selectIf", function(val1, val2) {
    return val1 == val2 ? "selected" : "";
});

Template.registerHelper("selectIfWeek", function(val1) {
    return val1 == Session.get("week") ? "selected" : "";
});

Template.registerHelper("selectIfDay", function(targetVal, fieldVal) {
    return targetVal == fieldVal ? "selected" : "";
});
