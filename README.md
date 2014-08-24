# dom-classlist

[![Build Status](https://secure.travis-ci.org/necolas/dom-classlist.png?branch=master)](http://travis-ci.org/necolas/dom-classlist)

Cross-browser element class manipulation (including support for SVG elements),
utilizing the native `classList` when possible.

## Installation

```
npm install dom-classlist
```

## Example

```js
var classList = require('dom-classlist');

classList(el).toArray();
// => [ 'foo', 'bar' ]

classList(el).add('baz');
classList(el).remove('bar');
classList(el).remove(/^foo/);

classList(el).toggle('bar');
// => true
classList(el).toggle('bar');
// => false

classList(el).contains('bar');
// => false
```

## API

### .toArray()

Return an array of the element's classes.

### .add(class)

Add the `class` to the class list.

### .remove(class|regex)

Remove the `class` from the class list, or remove all class names matching the `regex` regular expression.

### .toggle(class)

Toggle the `class` in the class list.

### .contains(class)

Check if the `class` is present in the class list.

## Browser support

* Google Chrome
* Firefox 4+
* Internet Explorer 8+
* Safari 5+
* Opera
