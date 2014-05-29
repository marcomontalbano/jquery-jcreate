// written by marco montalbano (marcomontalbano.it)
// http://www.marcomontalbano.com/
// version 1.0 - 18/11/2011

(function($, _domManip, _html){
	var selectors = [], handler = [];

	$.event.special.create = {
		setup: function( data, namespaces, eventHandle ) {
		},
		teardown: function( namespaces ) {
		},
		add: function( handleObj ){
			selectors.push( handleObj.selector );
			handler.push( handleObj.handler );
			$(function() {
				if ($.inArray(handleObj.selector, selectors) >= 0)
					$(handleObj.selector).each(handleObj.handler);
			});
		},
		// won't fire in 1.4.2 http://dev.jquery.com/ticket/6202
		remove: function( handleObj ){
			var len = selectors.length;
			while( len-- ){
				if( selectors[len] === handleObj.selector ){
					selectors.splice(len, 1);
					handler.splice(len, 1);
					break;
				}
			}
		},
		_default: function( event ){
		}
	};
	
	// DOM manipulation methods
	$.fn.domManip = function( args, table, callback ){
		var __m_domManip = _domManip.apply( this, arguments );
		__m_domManip = check(args[0], __m_domManip);
		return __m_domManip;
	};
	
	// HTML method
	$.fn.html = function( value ){
		var __m_html = _html.apply( this, arguments );
		__m_html = check(value, __m_html);
		return __m_html;
	};
	
	function check(value, __m)
	{
		if ( selectors.length > 0 )
		{
			if (typeof value == "string")
			{
				value = $(value);
				if ( value.length > 0 )
				{
					var selectorFound = [], current = -1, obj = {};
					
					for (key in selectors)
					{
						current = selectors[key];
						if ((value.is(current)) || (value.find(current).length > 0))
							selectorFound.push(key);
					}
					
					for (key in selectorFound)
					{
						current = selectorFound[key];
						obj = $('body').find(selectors[current]);
						if ( obj.length > 0 )
							obj.each(handler[current]);
					}
					//alert('aa');
					return $('body').find(__m);
					
					/*
					var selClasses = value.attr('class').split(' ');
					var index = 0, selClass = '', position = -1;
					for (key in selClasses)
					{
						selClass = selClasses[key];
						index = $.inArray('.' + selClass, selectors);
						if ( index >= 0 )
							continue;
					}
					
					if ( index >= 0 ) {
						var obj = __m.find(selectors[index]);
						if ( obj.length > 0 )
							obj.removeClass(selectors[index].replace('.','')).each(handler[index]);
					}
					*/
				}
			}
		}
		
		return __m;
	}
	
})(jQuery, jQuery.fn.domManip, jQuery.fn.html);
