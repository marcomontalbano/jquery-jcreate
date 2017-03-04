;;

/**
 * jCreate | jQuery Special Event
 *
 * author: Marco Montalbano
 * first private release: Nov 18, 2011
 *
 * useful links
 * ------------
 * http://learn.jquery.com/events/event-extensions/
 * http://benalman.com/news/2010/03/jquery-special-events/
 *
 */
 
/*

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    console.log(mutations, observer);
    console.log( $( mutations[0].addedNodes[0] ).is('[data-component~="dotdotdot"]') );
    
    // ...
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
    subtree: true,
    //attributes: true,
    childList: true,
});

*/
