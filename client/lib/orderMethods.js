//order methods.js

//////////////////////////////////////////////////
// Calculate usageDay, thisDeliv, and nextDeliv for a given item
// Calculations only happen if counts exist for both shops for current and previous week
//////////////////////////////////////////////////
calculateUsage = function(item, week) {
    //define shorthand variables for arrays
    var c = item.counts;
    var o = item.orders;
    
    //define holder variables
    var thisCount = {day: 0, count: 0};
    var lastCount = {day: 0, count: 0};
    var received = 0;  
    
    //loop through counts for this item
    //find documents that match the current or previous week
    //calculate count totals and assign to holder variables
    if(c) {
        for(i=0; i<c.length; i++) {
            if(c[i].week == week) {
                thisCount.day = Number(c[i].day);
                thisCount.count = Number(c[i].stc) + Number(c[i].lct);
            }
            else if(c[i].week == week-7) {
                lastCount.day = Number(c[i].day);
                lastCount.count = Number(c[i].stc) + Number(c[i].lct);
            }
            //otherwise ignore; it's a past week
        }
    }
    
    //loop through orders for this item
    //find order(s) that were placed between current and previous counts
    //assign total to holder variable 'received'
    if(o) {
        var thisCountDay = Number(week) + Number(thisCount.day);
        var lastCountDay = Number(week) - 7 + Number(lastCount.day);
        
        for(i=0; i<o.length; i++) {
            var delivDay = Number(o[i].week) + Number(item.delivDay);
            
            if(delivDay > lastCountDay && delivDay < thisCountDay) {
                received = Number(o[i].amount);
            }
        }
    }

    //set .onhand if it exists
    item.onHand = thisCount.count ? thisCount.count : "--";
    
    //check if current and previous counts exist before doing calculations
    if(thisCount.count && lastCount.count) {
        
        //calculate days between counts
        //set .usageDay
        var daysBetween = 7 + Number(thisCount.day) - Number(lastCount.day);
        item.usageDay = round1((lastCount.count + received - thisCount.count) / daysBetween);
        
        //determine days between this count day and delivery day
        //multiply it by daily usage
        //subtract that from current count
        item.thisDeliv = round1(thisCount.count - item.usageDay * (item.delivDay - thisCount.day));
        item.nextDeliv = round1(thisCount.count - item.usageDay * (7 + parseInt(item.delivDay) - thisCount.day));
    }
    else {
        item.usageDay = "--";
        item.thisDeliv = "--";
        item.nextDeliv = "--";
    }
};



//////////////////////////////////////////////////
// Calculate minNeeded, recommended, and order for a given item
// Gets called after calculateUsage (so nextDeliv and usageDay are set)
// Calculations only happen if counts exist for both shops for current and previous week
//////////////////////////////////////////////////
calculateOrder = function(item, week) {
    
    if(item.nextDeliv != "--") {
        item.minNeeded = round1(Math.max(-1 * item.nextDeliv, 0));
        item.recommended = item.minNeeded + item.usageDay * 2;
    }
    else {
        item.minNeeded = "--";
        item.recommended = "--";
    }
    
    if(hasOrder(item, week)) {
        item.order = getOrder(item, week);
    }
};


// Search for an order matching the given week; return true if found, false if not
hasOrder = function(item, week) {
    if(item.orders) {
        for(var i=0; i<item.orders.length; i++) {
            if(item.orders[i].week == week) {
                return true;
            }}}
    
    return false;
}


// Search for an order matching the given week and return it; return null if none found
getOrder = function(item, week) {
    if(item.orders) {
        for(var i=0; i<item.orders.length; i++) {
            if(item.orders[i].week == week) {
                return item.orders[i].amount;
            }}}
    return null;
}


// Create text of order item for email: <Item Name>: <Order Amount> <Order Unit>
writeOrder = function(item) {
    return item.name + ": " + item.orderAmount + " " + item.unit + "\n";  
};