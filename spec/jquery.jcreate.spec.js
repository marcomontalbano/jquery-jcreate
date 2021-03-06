describe('jCreate', function() {

    var   $container
        , style_red   = {'display' : 'block', 'margin-top' : '10px', 'color' : 'rgb(255, 0, 0)'}
        , style_green = {'display' : 'block', 'margin-top' : '10px', 'color' : 'rgb(0, 255, 0)'}
        , style_blue  = {'display' : 'block', 'margin-top' : '10px', 'color' : 'rgb(0, 0, 255)'}
    ;

    beforeEach(function ()
    {
        loadFixtures('container.html');
        $container = jQuery('#container');

        spyOn(console, 'info');

        // add 'create' event to container.
        $container.on('create', '> div', function( e ) {
            e.$currentTarget.css( style_red );
        });
    });

    afterEach(function () {
        $container.remove();
        $container.off('create');
    });

    it('should provide the \'create\' special event.', function() {
        expect( jQuery.event.special.create ).toEqual( jasmine.any(Object) );
    });

    it('should execute the callback if \'on\' function is invoked.', function()
    {
        // when
        $container.append( jQuery('<div>') );

        // then
        expect( $container.find('> div') ).toHaveCss(style_red);
    });

    it('shouldn\'t execute the callback if \'off\' function is invoked.', function()
    {
        // when
        $container.off('create');

        $container.append( jQuery('<div>') );

        // then
        expect( $container.find('> div') ).not.toHaveCss(style_red);
    });

    it('should pass data to the handler in event.data when the event is triggered.', function()
    {
        // given
        $container.on('create', 'div', { name: 'Marco' }, function( e ) {
            console.info('My name is ' + e.data.name);
        });

        // when
        $container.append( jQuery('<div>') );

        // then
        expect( console.info ).toHaveBeenCalledWith( 'My name is Marco' );
    });

    it('shouldn\'t break if the array object has been extended.', function()
    {
        // given
        Array.prototype.newCoolFunction = function() {};

        // then
        expect(function() {
            $container.append( jQuery('<div>') );
        }).not.toThrow();
    });

    it('should execute the callback just one time for each created element.', function()
    {
        // given
        var $element = jQuery('<div>');

        // when
        $container.append( $element );

        // then
        expect( $element ).toHaveCss( style_red );

        // when
        $element.css({ 'color' : 'rgb(0,0,255)' });
        $container.append( jQuery('<div>') );

        // then
        expect( $container.find('> div:eq(0)') ).toHaveCss( style_blue );
        expect( $container.find('> div:eq(1)') ).toHaveCss( style_red  );
    });

    it('should execute the callback when elements are created inside other elements.', function()
    {
        // given
        $container.on('create', 'div.inner', function( e ) {
            e.$currentTarget.css( style_green );
        });

        var element = '<span><div class="inner"></div></span>';

        // when
        $container.append( element );

        // then
        expect( $container.find('div.inner') ).toHaveCss( style_green );
    });

    describe('binding the event on jQuery(\'document\')', function()
    {
        afterEach(function () {
            jQuery(document).off('create');
        });

        it('should work.', function()
        {
            // when
            $container.append( jQuery('<a class="pippo">') );

            var counter = 0;
            jQuery(document).on('create', 'a.pippo', function( e ) {
                counter++;
                e.$currentTarget.css( style_red );
            });

            // given
            $container.append( jQuery('<span>') );
            $container.append( jQuery('<span>') );
            $container.append( jQuery('<span>') );

            // when
            $container.append( jQuery('<a class="pippo">') );
            $container.find('> span:eq(0)').replaceWith( jQuery('<a class="pippo">') );

            // then
            expect( counter ).toBe(3);
            expect( $container.find('> a:eq(0)') ).toHaveCss( style_red );
            expect( $container.find('> a:eq(1)') ).toHaveCss( style_red );
        });

        it('should execute the callback when elements are created inside other elements.', function()
        {
            // given
            jQuery(document).on('create', 'div.inner', function( e ) {
                e.$currentTarget.css( style_green );
            });

            var element = '<span><div class="inner"></div></span>';

            // when
            $container.append( element );

            // then
            expect( $container.find('div.inner') ).toHaveCss( style_green );
        });
    });

    describe('should execute the callback when', function()
    {
        var counter;

        beforeEach(function ()
        {
            counter = 0;

            $container.on('create', '> div', function() {
                counter++;
            });
        });

        it('a new element is created before the special event declaration.', function()
        {
            // given
            var _inner_counter = 0;

            // when
            $container.append( jQuery('<div>') );

            $container.on('create', '> div', function() {
                _inner_counter++;
            });

            $container.append( jQuery('<div>') );

            // then
            expect( _inner_counter ).toBe(2);
            expect( counter ).toBe(2);
            expect( $container.find('> div') ).toHaveCss( style_red );
        });


        it('the \'append\' method is invoked.', function()
        {
            // when
            $container.append( jQuery('<div>') );
            $container.append( jQuery('<div>') );
            $container.append( jQuery('<span>') );

            // then
            expect( counter ).toBe(2);
            expect( $container.find('> div') ).toHaveCss( style_red );
        });

        it('the \'prepend\' method is invoked.', function()
        {
            // when
            $container.prepend( jQuery('<div>') );
            $container.prepend( jQuery('<div>') );
            $container.append( jQuery('<span>') );

            // then
            expect( counter ).toBe(2);
            expect( $container.find('> div') ).toHaveCss( style_red );
        });

        it('the \'before\' method is invoked.', function()
        {
            // given
            $container.append( jQuery('<span>') );

            // when
            $container.find('> span').before( jQuery('<div>') );
            $container.find('> span').before( jQuery('<div>') );

            // then
            expect( counter ).toBe(2);
            expect( $container.find('> div') ).toHaveCss( style_red );
        });

        it('the \'after\' method is invoked.', function()
        {
            // given
            $container.append( jQuery('<span>') );

            // when
            $container.find('> span').after( jQuery('<div>') );
            $container.find('> span').after( jQuery('<div>') );

            // then
            expect( counter ).toBe(2);
            expect( $container.find('> div') ).toHaveCss( style_red );
        });

        it('the \'html\' method is invoked.', function()
        {
            // when
            $container.html( '<div></div>' + '<div><div></div></div>' + '<div></div>' + '<span></span>' );

            // then
            expect(counter).toBe(3);
            $container.find('> div').each(function() {
                expect( jQuery(this) ).toHaveCss( style_red );
            });
        });

        it('the \'replaceWith\' method is invoked.', function()
        {
            // given
            $container.append( jQuery('<span>') );
            $container.append( jQuery('<span>') );

            // when
            $container.find('> span:eq(0)').replaceWith( jQuery('<div>') );

            // then
            expect( counter ).toBe(1);
            expect( $container.find('> div') ).toHaveCss( style_red );
        });
    });

    describe('\'event\' param of the callback', function()
    {
        var callback, $element;

        beforeEach(function ()
        {
            // given
            callback = jasmine.createSpy('callback');
            $element = jQuery('<div data-component="hello-world">');

            // TEST-FIX for jQuery < 3.0 - https://jquery.com/upgrade-guide/3.0/#breaking-change-deprecated-context-and-selector-properties-removed
            if ( parseInt(/^[\d]+/.exec( jQuery().jquery )[0], 10) < 3 ) {
                $element.context   = $element.get(0);
                $container.context = $container.get(0);
            }

            // when
            $container.on('create', '> div', callback);
            $container.append( $element );
        });

        it('should contain \'type\'.', function()
        {
            // then
            expect( callback ).toHaveBeenCalledWith(jasmine.objectContaining({
                type: 'create'
            }));
        });

        it('should contain \'timeStamp\'.', function()
        {
            // then
            expect( callback ).toHaveBeenCalledWith(jasmine.objectContaining({
                timeStamp: jasmine.any(Number)
            }));
        });

        it('should contain \'currentTarget\'.', function()
        {
            // then
            expect( callback ).toHaveBeenCalledWith(jasmine.objectContaining({
                currentTarget: $element.get(0)
            }));
        });

        it('should contain \'$currentTarget\'.', function()
        {
            // then
            expect( callback ).toHaveBeenCalledWith(jasmine.objectContaining({
                $currentTarget: $element
            }));
        });

        it('should contain \'delegateTarget\'.', function()
        {
            // then
            expect( callback ).toHaveBeenCalledWith(jasmine.objectContaining({
                delegateTarget: $container.get(0)
            }));
        });

        it('should contain \'$delegateTarget\'.', function()
        {
            // then
            expect( callback ).toHaveBeenCalledWith(jasmine.objectContaining({
                $delegateTarget: jQuery( $container.get(0) )
            }));
        });

        it('should contain \'options\'.', function()
        {
            // then
            expect( callback ).toHaveBeenCalledWith(jasmine.objectContaining({
                options: jasmine.any(Function)
            }));
        });
    });

});
