describe("README.md", function() {

    var $container;

    beforeEach(function ()
    {
        loadFixtures('container.html');
        $container = $('#container');

        spyOn(console, 'info');
    });

    afterEach(function () {
        $container.remove();
        $container.off('create');
    });

    it("'The Module Pattern' example should be true.", function()
    {
        // given
        var myModule = (function () {
        
            var   module = {}
                , _privateVariable = "Hello World"
            ;

            var _privateMethod = function() {
                // ...
            };

            module.publicProperty = "Foobar";
            module.publicMethod = function () {
                console.info( _privateVariable );
            };

            return module;

        }());

        // when
        myModule.publicMethod();

        // then
        expect( myModule._privateVariable ).toBeUndefined();
        expect( myModule._privateMethod ).toBeUndefined();
        expect( myModule.publicProperty ).toEqual( 'Foobar' );
        expect( console.info ).toHaveBeenCalledWith( 'Hello World' );
    });

    it("'The Module Pattern with jCreate' example should be true.", function ()
    {
        // given
        var helloWorldComponent = (function () {

            var   module         = {}
                , _componentName = 'hello-world'
            ;

            module.greeting = function( name ) {
                console.info( 'Hello ' + name + '!' );
            };

            $(document).on('create', '[data-component~="' + _componentName + '"]', function( event ) {
                var options = event.options( _componentName ); //= {name="Marco"}
                module.greeting( options.name );               //= Hello Marco!
            });

            return module;
        }());

        // when
        helloWorldComponent.greeting('Stefania');
        $container.append('<div data-component="hello-world" data-hello-world-name="Marco"></div>');

        // then
        expect( console.info ).toHaveBeenCalledWith( 'Hello Stefania!' );
        expect( console.info ).toHaveBeenCalledWith( 'Hello Marco!' );
    });

});
