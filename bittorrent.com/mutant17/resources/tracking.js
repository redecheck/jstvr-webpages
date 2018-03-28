//140byt.es Array.filter polyfill
//https://gist.github.com/eliperelman/1031656
[].filter || (Array.prototype.filter = // Use the native array filter method, if available.
function(a, //a function to test each value of the array against. Truthy values will be put into the new array and falsy values will be excluded from the new array
    b, // placeholder
    c, // placeholder 
    d, // placeholder
    e // placeholder
) {
    c = this; // cache the array
    d = []; // array to hold the new values which match the expression
    for (e in c) // for each value in the array, 
        ~~e + '' == e && e >= 0 && // coerce the array position and if valid,
        a.call(b, c[e], +e, c) && // pass the current value into the expression and if truthy,
        d.push(c[e]); // add it to the new array
    return d // give back the new array
})

var eventTracking = {
    'init' : function(args) {
        // Since checking attributes of undefined throws an error we'll make
        // args an empty object if nothing is passed
        args = typeof args !== 'undefined' ? args : {};

        // Set defaults
        this.trackingClass = args.trackingClass || '.ga-et';
        this.infoPrefix = args.infoPrefix || 'gat-';
        this.action = args.action || 'Click';
        this.category = args.category || 'Production';
        this.label = args.label || 'DEFAULT';

        // Run the event binding function
        this.bind();
    },
    'bind' : function() {
        var eTracking = this,
        $elements = $(eTracking.trackingClass);

        // Go through the tags we want to track events on and
        // bind an event handler that calls ga send
        $.each($elements, function(i, e) {
            var trackingInfo = eTracking.trackingClassParse(e);
            $(e).on('click', function() {
                ga('send', 'event', (trackingInfo.category || eTracking.category), //Category
                                    (trackingInfo.action || eTracking.action),     //Action
                                    (trackingInfo.label || eTracking.label)        //Label
                );
            });
        });
    },
    'trackingClassParse' : function(element) {
        var eTracking = this,
        classString = element.className,
        classList = classString.split(' ');

        // Go through the class list and pull out the tracking info class
        var trackingInfoList = classList.filter(function(i) {
            if (i.search(eTracking.infoPrefix) !== -1) {
                return i;
            }
        });

        // If more than one tracking info class is found (hopefully not!)
        // use the last one found (the one at the end of the class list)
        if (trackingInfoList.length > 1) {
            console.log(element + " with classes: " + classString + " has more than one event tracking class!!");
            trackingInfoList.slice(-1);
        }

        var trackingString = trackingInfoList.toString().slice(eTracking.infoPrefix.length).split('-');

        //Replace _ with spaces
        for (var s in trackingString) {
            trackingString[s] = trackingString[s].split('_').join(' ');
        }

        //Return trackingInfo object
        return {
            'category' : trackingString[0],
            'action' : trackingString[1],
            'label' : trackingString[2]
        };
    }
};
