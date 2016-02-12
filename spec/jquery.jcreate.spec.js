describe("jCreate", function() {

    var   $container
        , style = {'display' : 'block', 'margin-top' : '10px'}
    ;

    beforeEach(function ()
    {
        loadFixtures('jcreate.html');
        $container = $('#container');

        // add 'create' event to container.
        $container.on('create', '> div', function() {
            $(this).css( style );
        });
    });

    afterEach(function () {
        $container.remove();
        $container.off('create');
    });

    it("should provide the 'create' special event.", function() {
        expect( $.event.special.create ).toEqual( jasmine.any(Object) );
    });

    it("shouldn't execute the callback if 'off' function is executed.", function()
    {
        // when
        $container.off('create');

        $container.append( $('<div>') );

        // then
        expect( $container.find('> div') ).not.toHaveCss(style);
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
            expect( $container.find('> div') ).toHaveCss( style );
        });


        it("the 'append' method is invoked.", function()
        {
            // when
            $container.append( $('<div>') );
            $container.append( $('<div>') );
            $container.append( $('<span>') );

            // then
            expect( counter ).toBe(2);
            expect( $container.find('> div') ).toHaveCss( style );
        });

        it("the 'prepend' method is invoked.", function()
        {
            // when
            $container.prepend( $('<div>') );
            $container.prepend( $('<div>') );
            $container.append( $('<span>') );

            // then
            expect( counter ).toBe(2);
            expect( $container.find('> div') ).toHaveCss( style );
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
            expect( $container.find('> div') ).toHaveCss( style );
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
            expect( $container.find('> div') ).toHaveCss( style );
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
            expect( $container.find('> div') ).toHaveCss( style );
        });

        it("the 'html' method is invoked.", function()
        {
            // when
            $container.html( '<div></div>' + '<div><div></div></div>' + '<div></div>' + '<span></span>' );

            // then
            expect(counter).toBe(3);
            $container.find('> div').each(function() {
                expect( $(this) ).toHaveCss( style );
            });
        });
    });

});
