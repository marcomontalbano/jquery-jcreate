describe("jCreate", function() {
  
  var
    $container,
    random = function()
    {
      return Math.round(Math.random() * 10);
    }
  ;

  beforeEach(function () {
    loadFixtures("jcreate.html");
    $container = $("#container");
  });

  afterEach(function () {
    $container.remove();
    $container.off('create');
  });

  it("should provide the 'create' special event.", function() {
    expect($.event.special.create).toEqual(jasmine.any(Object));
  });

  it("shouldn't execute the callback if 'off' function is executed.", function()
  {
    var style = {'display' : 'block', 'margin-top' : '10px'};
    $container.on('create', '> div', function() {
      $(this).css(style);
    });

    $container.off('create');

    $container.append( $('<div>') );
    expect($container.find('> div')).not.toHaveCss(style);
  });

  it("shouldn't execute the callback on element already created.", function()
  {
    var
      firstStyle = null,
      currentStyle = null
    ;
    $container.on('create', '> div', function()
    {
      currentStyle = {'display' : 'block', 'margin-top' : random() + 'px'};
      if (firstStyle === null) {
        firstStyle = {'display' : 'block', 'margin-top' : random() + 'px'};
        currentStyle = firstStyle;
      }
      $(this).css(currentStyle);
    });

    $container.append( $('<div>') );
    $container.append( $('<div>') );
    expect($container.find('div:first')).toHaveCss(firstStyle);
  });

  it("shouldn't execute the callback on element already created (test 2).", function()
  {
    var
      counter = 0,
      style   = {'display' : 'block', 'margin-top' : random() + 'px'}
    ;

    $container.append( $('<div>') );
    $container.on('create', '> div', function()
    {
      counter++;
      $(this).css(style);
    });

    $container.append( $('<div>') );
    $container.append( $('<div>') );
    expect(counter).toBe(3);
  });

  describe("should execute the callback when", function() {

    it("you create a new element after binding 'jCreate'.", function()
    {
      var style = {'display' : 'block', 'margin-top' : '10px'};
      $container.on('create', '> div', function() {
        $(this).css(style);
      });

      $container.append( $('<div>') );
      expect($container.find('> div')).toHaveCss(style);
    });

    it("you create a new element before binding 'jCreate'.", function()
    {
      var style = {'display' : 'block', 'margin-top' : '10px'};
      $container.append( $('<div>') );
      $container.on('create', '> div', function() {
        $(this).css(style);
      });
      expect($container.find('> div')).toHaveCss(style);
    });

  });

});
