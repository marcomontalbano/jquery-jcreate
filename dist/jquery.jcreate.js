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

(function($, domManip, append, prepend, before, after, html, replaceWith)
{
    var container = [];

    $.event.special.create =
    {
        /**
         * setup: function( data: Object, namespaces, eventHandle: function )
         *  The setup hook is called the first time an event of a particular type is attached to an element;
         *  this provides the hook an opportunity to do processing that will apply to all events of this type on this element.
         *  The this keyword will be a reference to the element where the event is being attached and eventHandle is jQuery's event handler function.
         *  In most cases the namespaces argument should not be used, since it only represents the namespaces of the first event being attached;
         *  subsequent events may not have this same namespaces.
         *  
         *  This hook can perform whatever processing it desires,
         *  including attaching its own event handlers to the element or to other elements and recording setup information on the element using the jQuery.data() method.
         *  If the setup hook wants jQuery to add a browser event (via addEventListener or attachEvent, depending on browser) it should return false. In all other cases,
         *  jQuery will not add the browser event, but will continue all its other bookkeeping for the event.
         *  This would be appropriate, for example, if the event was never fired by the browser but invoked by .trigger().
         *  To attach the jQuery event handler in the setup hook, use the eventHandle argument.
         */
        setup: function( data, namespaces, eventHandle )
        {

        },

        /**
         * teardown: function()
         *  The teardown hook is called when the final event of a particular type is removed from an element.
         *  The this keyword will be a reference to the element where the event is being cleaned up.
         *  This hook should return false if it wants jQuery to remove the event from the browser's event system (via removeEventListener or detachEvent).
         *  In most cases, the setup and teardown hooks should return the same value.
         *  
         *  If the setup hook attached event handlers or added data to an element through a mechanism such as jQuery.data(), 
         *  the teardown hook should reverse the process and remove them.
         *  jQuery will generally remove the data and events when an element is totally removed from the document,
         *  but failing to remove data or events on teardown will cause a memory leak if the element stays in the document.
         */
        teardown: function()
        {

        },

        /**
         * add: function( handleObj )
         *  Each time an event handler is added to an element through an API such as .on(), jQuery calls this hook.
         *  The this keyword will be the element to which the event handler is being added,
         *  and the handleObj argument is as described in the section above.
         *  The return value of this hook is ignored.
         */
        add: function( handleObj )
        {
            container.push({
                $element  : $(this),
                handleObj : handleObj
            });

            create();
        },

        /**
         * remove: function( handleObj )
         *  When an event handler is removed from an element using an API such as .off(), this hook is called.
         *  The this keyword will be the element where the handler is being removed,
         *  and the handleObj argument is as described in the section above.
         *  The return value of this hook is ignored.
         */
        remove: function( handleObj )
        {
            for (var key in container)
            {
                if ( container.hasOwnProperty( key ) )
                {
                    if( $(this).is( container[key].$element ) && container[key].handleObj.selector === handleObj.selector )
                    {
                        delete container[key];
                        break;
                    }
                }
            }
        },

        /**
         * trigger: function( event: jQuery.Event, data: Object )
         *  Called when the .trigger() or .triggerHandler() methods are used to trigger an event for the special type from code,
         *  as opposed to events that originate from within the browser.
         *  The this keyword will be the element being triggered, and the event argument will be a jQuery.Event object constructed from the caller's input.
         *  At minimum, the event type, data, namespace, and target properties are set on the event.
         *  The data argument represents additional data passed by .trigger() if present.
         *
         *  The trigger hook is called early in the process of triggering an event,
         *  just after the jQuery.Event object is constructed and before any handlers have been called.
         *  It can process the triggered event in any way, for example by calling event.stopPropagation() or event.preventDefault() before returning.
         *  If the hook returns false, jQuery does not perform any further event triggering actions and returns immediately.
         *  Otherwise, it performs the normal trigger processing, calling any event handlers for the element and bubbling
         *  the event (unless propagation is stopped in advance or noBubble was specified for the special event) to call event handlers attached to parent elements.
         */
        trigger: function( event, data )
        {

        },

        /**
         * _default: function( event: jQuery.Event, data: Object )
         *  When the .trigger() method finishes running all the event handlers for an event,
         *  it also looks for and runs any method on the target object by the same name unless of the handlers called event.preventDefault().
         *  So, .trigger( "submit" ) will execute the submit() method on the element if one exists.
         *  When a _default hook is specified, the hook is called just prior to checking for and executing the element's default method.
         *  If this hook returns the value false the element's default method will be called; otherwise it is not.
         */
        _default: function( event, data )
        {

        },

        /**
         * handle: function( event: jQuery.Event, data: Object )
         *  jQuery calls a handle hook when the event has occurred and jQuery would normally call the user's event handler
         *  specified by .on() or another event binding method. If the hook exists, jQuery calls it instead of that event handler,
         *  passing it the event and any data passed from .trigger() if it was not a native event.
         *  The this keyword is the DOM element being handled, and event.handleObj property has the detailed event information.
         *
         *  Based in the information it has, the handle hook should decide whether to call the original handler function which is in event.handleObj.handler.
         *  It can modify information in the event object before calling the original handler,
         *  but must restore that data before returning or subsequent unrelated event handlers may act unpredictably.
         *  In most cases, the handle hook should return the result of the original handler, but that is at the discretion of the hook.
         *  The handle hook is unique in that it is the only special event function hook that is called under its original special event name
         *  when the type is mapped using bindType and delegateType. For that reason, it is almost always an error to have anything other
         *  than a handle hook present if the special event defines a bindType and delegateType, since those other hooks will never be called.
         */
        handle: function( event, data )
        {

        }
    };


    // DOM manipulation methods
    $.fn.domManip = function()
    {
        var _ = domManip.apply( this, arguments );
        return create( _ );
    };

    // "append" DOM manipulation.
    $.fn.append = function()
    {
        var _ = append.apply( this, arguments );
        return create( _ );
    };

    // "prepend" DOM manipulation.
    $.fn.prepend = function()
    {
        var _ = prepend.apply( this, arguments );
        return create( _ );
    };

    // "before" DOM manipulation.
    $.fn.before = function()
    {
        var _ = before.apply( this, arguments );
        return create( _ );
    };

    // "after" DOM manipulation.
    $.fn.after = function()
    {
        var _ = after.apply( this, arguments );
        return create( _ );
    };

    // "html" DOM manipulation.
    $.fn.html = function()
    {
        var _ = html.apply( this, arguments );
        return create( _ );
    };

    // "replaceWith" DOM manipulation.
    $.fn.replaceWith = function()
    {
        var _ = replaceWith.apply( this, arguments );
        return create( _ );
    };


    // 
    var create = function( _ )
    {
        if (container.length >= 1)
        {
            var current  = null;

            for (var key in container)
            {
                if ( container.hasOwnProperty( key ) )
                {
                    current = container[key];
                    current.$element.find( current.handleObj.selector ).each(function()
                    {
                        var   $this    = $(this)
                            , data_key = '$.event.special.create'
                            , data_sep = ','
                            , data     = $this.data(data_key) ? $this.data(data_key).split(data_sep) : []
                        ;

                        if ( $.inArray(key, data) === -1 )
                        {
                            data.push(key);
                            $this.data(data_key, data.join(data_sep));
                            current.handleObj.handler.apply( this, arguments );
                        }
                    });
                }
            }
        }

        return _;
    };

})(
    jQuery,
    jQuery.fn.domManip,
    jQuery.fn.append,
    jQuery.fn.prepend,
    jQuery.fn.before,
    jQuery.fn.after,
    jQuery.fn.html,
    jQuery.fn.replaceWith
);
