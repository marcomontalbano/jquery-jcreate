describe("jCreate", function() {

    var   $container
        , style_red   = {'display' : 'block', 'margin-top' : '10px', 'color' : 'rgb(255, 0, 0)'}
        , style_green = {'display' : 'block', 'margin-top' : '10px', 'color' : 'rgb(0, 255, 0)'}
        , style_blue  = {'display' : 'block', 'margin-top' : '10px', 'color' : 'rgb(0, 0, 255)'}
    ;

    beforeEach(function ()
    {
        loadFixtures('container.html');
        $container = $('#container');

        // add 'create' event to container.
        $container.on('create', '> div', function() {
            $(this).css( style_red );
        });
    });

    afterEach(function () {
        $container.remove();
        $container.off('create');
    });

    it("should provide the 'create' special event.", function() {
        expect( $.event.special.create ).toEqual( jasmine.any(Object) );
    });

    it("should execute the callback if 'on' function is invoked.", function()
    {
        // when
        $container.append( $('<div>') );

        // then
        expect( $container.find('> div') ).toHaveCss(style_red);
    });

    it("shouldn't execute the callback if 'off' function is invoked.", function()
    {
        // when
        $container.off('create');

        $container.append( $('<div>') );

        // then
        expect( $container.find('> div') ).not.toHaveCss(style_red);
    });

    it("shouldn't break if the array object has been extended.", function()
    {
        // given
        Array.prototype.newCoolFunction = function() {};

        // then
        expect(function() {
            $container.append( $('<div>') );
        }).not.toThrow();
    });

    it("should execute the callback just one time for each created element.", function()
    {
        // given
        var $element = $('<div>');

        // when
        $container.append( $element );

        // then
        expect( $element ).toHaveCss( style_red );

        // when
        $element.css({ 'color' : 'rgb(0,0,255)' });
        $container.append( $('<div>') );

        // then
        expect( $container.find('> div:eq(0)') ).toHaveCss( style_blue );
        expect( $container.find('> div:eq(1)') ).toHaveCss( style_red  );
    });

    it("should execute the callback when elements are created inside other elements.", function()
    {
        // given
        $container.on('create', 'div.inner', function() {
            $(this).css( style_green );
        });

        var $element = $('<span><div class="inner"></div></span>');

        // when
        $container.append( $element );

        // then
        expect( $element.find('div.inner') ).toHaveCss( style_green );
    });

    describe("binding the event on $('document')", function()
    {
        afterEach(function () {
            $(document).off('create');
        });

        it("should work.", function()
        {
            // when
            $container.append( $('<a class="pippo">') );

            var counter = 0;
            $(document).on('create', 'a.pippo', function() {
                counter++;
                $(this).css( style_red );
            });

            // given
            $container.append( $('<span>') );
            $container.append( $('<span>') );
            $container.append( $('<span>') );

            // when
            $container.append( $('<a class="pippo">') );
            $container.find('> span:eq(0)').replaceWith( $('<a class="pippo">') );

            // then
            expect( counter ).toBe(3);
            expect( $container.find('> a:eq(0)') ).toHaveCss( style_red );
            expect( $container.find('> a:eq(1)') ).toHaveCss( style_red );
        });

        it("should execute the callback when elements are created inside other elements.", function()
        {
            // given
            $(document).on('create', 'div.inner', function() {
                $(this).css( style_green );
            });

            var $element = $('<span><div class="inner"></div></span>');

            // when
            $container.append( $element );

            // then
            expect( $element.find('div.inner') ).toHaveCss( style_green );
        });
    });

    describe("should execute the callback when", function()
    {
        var counter;

        beforeEach(function ()
        {
            counter = 0;

            $container.on('create', '> div', function() {
                counter++;
            });
        });

        it("a new element is created before the special event declaration.", function()
        {
            // given
            var _inner_counter = 0;

            // when
            $container.append( $('<div>') );

            $container.on('create', '> div', function() {
                _inner_counter++;
            });

            $container.append( $('<div>') );

            // then
            expect( _inner_counter ).toBe(2);
            expect( counter ).toBe(2);
            expect( $container.find('> div') ).toHaveCss( style_red );
        });


        it("the 'append' method is invoked.", function()
        {
            // when
            $container.append( $('<div>') );
            $container.append( $('<div>') );
            $container.append( $('<span>') );

            // then
            expect( counter ).toBe(2);
            expect( $container.find('> div') ).toHaveCss( style_red );
        });

        it("the 'prepend' method is invoked.", function()
        {
            // when
            $container.prepend( $('<div>') );
            $container.prepend( $('<div>') );
            $container.append( $('<span>') );

            // then
            expect( counter ).toBe(2);
            expect( $container.find('> div') ).toHaveCss( style_red );
        });

        it("the 'before' method is invoked.", function()
        {
            // given
            $container.append( $('<span>') );

            // when
            $container.find('> span').before( $('<div>') );
            $container.find('> span').before( $('<div>') );

            // then
            expect( counter ).toBe(2);
            expect( $container.find('> div') ).toHaveCss( style_red );
        });

        it("the 'after' method is invoked.", function()
        {
            // given
            $container.append( $('<span>') );

            // when
            $container.find('> span').after( $('<div>') );
            $container.find('> span').after( $('<div>') );

            // then
            expect( counter ).toBe(2);
            expect( $container.find('> div') ).toHaveCss( style_red );
        });

        it("the 'html' method is invoked.", function()
        {
            // when
            $container.html( '<div></div>' + '<div><div></div></div>' + '<div></div>' + '<span></span>' );

            // then
            expect(counter).toBe(3);
            $container.find('> div').each(function() {
                expect( $(this) ).toHaveCss( style_red );
            });
        });

        it("the 'replaceWith' method is invoked.", function()
        {
            // given
            $container.append( $('<span>') );
            $container.append( $('<span>') );

            // when
            $container.find('> span:eq(0)').replaceWith( $('<div>') );

            // then
            expect( counter ).toBe(1);
            expect( $container.find('> div') ).toHaveCss( style_red );
        });
    });

});
