var classList = require('..');

describe('classList(el)', function () {
  var el, svg;

  beforeEach(function(){
    el = document.createElement('div');
    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  });

  it('should throw when the argument is not a DOM element', function () {
    expect(classList.bind(null)).toThrow();
    expect(classList.bind(null, 'str')).toThrow();
  });

  /**
   * .toArray()
   */

  describe('.toArray()', function(){
    it('should return an array of classes', function(){
      el.className = 'foo bar baz';
      var elList = classList(el).toArray();
      expect(elList[0]).toBe('foo');
      expect(elList[1]).toBe('bar');
      expect(elList[2]).toBe('baz');

      svg.setAttribute('class', 'foo bar baz');
      var svgList = classList(svg).toArray();
      expect(svgList[0]).toBe('foo');
      expect(svgList[1]).toBe('bar');
      expect(svgList[2]).toBe('baz');
    });

    it('should return an empty array when no className is defined', function(){
      var elList = classList(el).toArray();
      expect(elList.length).toBe(0);

      var svgList = classList(svg).toArray();
      expect(svgList.length).toBe(0);
    });

    it('should ignore trailing and leading whitespace', function(){
      el.className = '   foo   bar   baz   ';
      var elList = classList(el).toArray();
      expect(elList[0]).toBe('foo');
      expect(elList[1]).toBe('bar');
      expect(elList[2]).toBe('baz');
      expect(elList.length).toBe(3);

      svg.setAttribute('class', '   foo   bar   baz   ');
      var svgList = classList(svg).toArray();
      expect(svgList[0]).toBe('foo');
      expect(svgList[1]).toBe('bar');
      expect(svgList[2]).toBe('baz');
      expect(svgList.length).toBe(3);
    });
  });

  /**
   * .add()
   */

  describe('.add(string)', function () {
    it('should add a class', function () {
      classList(el).add('foo');
      expect(el.className).toBe('foo');

      classList(svg).add('foo');
      expect(svg.getAttribute('class')).toBe('foo');
    });

    it('should not add the same class twice', function(){
      var elList = classList(el);
      elList.add('foo');
      elList.add('foo');
      elList.add('bar');
      expect(el.className).toBe('foo bar');

      var svgList = classList(svg);
      svgList.add('foo');
      svgList.add('foo');
      svgList.add('bar');
      expect(svg.getAttribute('class')).toBe('foo bar');
    });
  });

  /**
   * .remove()
   */

  describe('.remove(string)', function(){
    it('should remove a class from the beginning', function(){
      el.className = 'foo bar baz';
      classList(el).remove('foo');
      expect(el.className).toBe('bar baz');

      svg.setAttribute('class', 'foo bar baz');
      classList(svg).remove('foo');
      expect(svg.getAttribute('class')).toBe('bar baz');
    });

    it('should remove a class from the middle', function(){
      el.className = 'foo bar baz';
      classList(el).remove('bar');
      expect(el.className).toBe('foo baz');

      svg.setAttribute('class', 'foo bar baz');
      classList(svg).remove('bar');
      expect(svg.getAttribute('class')).toBe('foo baz');
    });

    it('should remove a class from the end', function(){
      el.className = 'foo bar baz';
      classList(el).remove('baz');
      expect(el.className).toBe('foo bar');

      svg.setAttribute('class', 'foo bar baz');
      classList(svg).remove('baz');
      expect(svg.getAttribute('class')).toBe('foo bar');
    });
  });

  describe('.remove(regexp)', function(){
    it('should remove matching classes', function(){
      el.className = 'foo item-1 item-2 bar';
      classList(el).remove(/^item-/);
      expect(el.className).toBe('foo bar');

      svg.setAttribute('class', 'foo item-1 item-2 bar');
      classList(svg).remove(/^item-/);
      expect(svg.getAttribute('class')).toBe('foo bar');
    });
  });

  /**
   * .toggle()
   */

  describe('.toggle(string)', function(){
    it('should remove the class if present', function(){
      el.className = 'foo bar hidden';
      classList(el).toggle('hidden');
      expect(el.className).toBe('foo bar');

      svg.setAttribute('class', 'foo bar hidden');
      classList(svg).toggle('hidden');
      expect(svg.getAttribute('class')).toBe('foo bar');
    });

    it('should add the class if not present', function(){
      el.className = 'foo bar';
      classList(el).toggle('hidden');
      expect(el.className).toBe('foo bar hidden');

      svg.setAttribute('class', 'foo bar');
      classList(svg).toggle('hidden');
      expect(svg.getAttribute('class')).toBe('foo bar hidden');
    });

    it('should return `true` if the class is added', function(){
      el.className = '';
      expect(classList(el).toggle('foo')).toBe(true);
    });

    it('should return `false` if the class is remove', function(){
      el.className = 'foo';
      expect(classList(el).toggle('foo')).toBe(false);
    });
  });

  describe('.toggle(string, force)', function(){
    describe('when force is true', function(){
      it('should add the class if missing', function(){
        el.className = 'foo bar';
        classList(el).toggle('hidden', true);
        expect(el.className).toBe('foo bar hidden');

        svg.setAttribute('class', 'foo bar');
        classList(svg).toggle('hidden', true);
        expect(svg.getAttribute('class')).toBe('foo bar hidden');
      });

      it('should not remove the class if present', function(){
        el.className = 'foo bar hidden';
        classList(el).toggle('hidden', true);
        expect(el.className).toBe('foo bar hidden');

        svg.setAttribute('class', 'foo bar hidden');
        classList(svg).toggle('hidden', true);
        expect(svg.getAttribute('class')).toBe('foo bar hidden');
      });

      it('should always return `true`', function(){
        expect(classList(el).toggle('hidden', true)).toBe(true);
        expect(classList(el).toggle('hidden', true)).toBe(true);
      });
    });

    describe('when force is false', function(){
      it('should remove the class if present', function(){
        el.className = 'foo bar hidden';
        classList(el).toggle('hidden', false);
        expect(el.className).toBe('foo bar');


        svg.setAttribute('class', 'foo bar hidden');
        classList(svg).toggle('hidden', false);
        expect(svg.getAttribute('class')).toBe('foo bar');
      });

      it('should not add the class if missing', function(){
        el.className = 'foo bar';
        classList(el).toggle('hidden', false);
        expect(el.className).toBe('foo bar');

        svg.setAttribute('class', 'foo bar');
        classList(svg).toggle('hidden', false);
        expect(svg.getAttribute('class')).toBe('foo bar');
      });


      it('should always return `false`', function(){
        expect(classList(el).toggle('hidden', false)).toBe(false);
        expect(classList(el).toggle('hidden', false)).toBe(false);
      });
    });
  });

  /**
   * .contains()
   */

  describe('.contains(string)', function(){
    it('should check if the class is present', function(){
      el.className = 'foo bar';
      var elList = classList(el);
      expect(elList.contains('foo')).toBe(true);
      expect(elList.contains('bar')).toBe(true);
      expect(elList.contains('baz')).toBe(false);

      svg.setAttribute('class', 'foo bar');
      var svgList = classList(svg);
      expect(svgList.contains('foo')).toBe(true);
      expect(svgList.contains('bar')).toBe(true);
      expect(svgList.contains('baz')).toBe(false);
    });
  });

  /**
   * Errors
   */

  describe('.add(), .remove(), .toggle(), and .contains()', function () {
    var expectError = function (method, token) {
      expect(classList(el)[method].bind(null, token))
        .toThrowError(Error,
          'Failed to execute \'' + method + '\' on \'ClassList\': ' +
          'the token provided (\'' + token + '\') contains HTML space ' +
          'characters, which are not valid in tokens.'
        );
    };
    var expectSyntaxError = function (method, token) {
      expect(classList(el)[method].bind(null, token))
        .toThrowError(SyntaxError,
          'Failed to execute \'' + method + '\' on \'ClassList\': ' +
          'the token provided must not be empty.'
        );
    };
    var expectTypeError = function (method, token) {
      expect(classList(el)[method].bind(null, token))
        .toThrowError(TypeError,
          'Failed to execute \'' + method + '\' on \'ClassList\': ' +
          'the token provided (\'' + token + '\') is not a string.'
        );
    };

    it('should throw an Error when the token contains HTML whitespace', function () {
      expectError('add', ' foo ');
      expectError('remove', ' foo ');
      expectError('toggle', ' foo ');
      expectError('contains', ' foo ');
    });

    it('should throw a SyntaxError when the token in an empty string', function () {
      expectSyntaxError('add', '');
      expectSyntaxError('remove', '');
      expectSyntaxError('toggle', '');
      expectSyntaxError('contains', '');
    });

    it('should throw a TypeError when the token is not a string', function () {
      expectTypeError('add', false);
      expectTypeError('remove', null);
      expectTypeError('toggle', undefined);
      expectTypeError('contains', 0);
    });
  });
});
