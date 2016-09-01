# jQuery Geolocate

[![NPM version](https://badge.fury.io/js/jquery-geolocate.svg)](https://www.npmjs.com/package/jquery-geolocate)

[![Demo](https://richardcornish.github.io/jquery-geolocate/img/map.min.png)](https://richardcornish.github.io/jquery-geolocate/)

**jQuery Geolocate** is a [jQuery](https://jquery.com/) plugin that uses [HTML5 geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation)
to find your latitude and longitude, geocodes the coordinates with
Google’s [Geocoding API](https://developers.google.com/maps/documentation/geocoding/start), and parses the address for components of your
choosing, optionally inserting the result into a DOM element.

Plugin requires a [Google API key](https://developers.google.com/maps/documentation/geocoding/get-api-key) because HTML5 geolocation only
returns latitude and longitude.

- [Package distribution](https://www.npmjs.com/package/jquery-geolocate)
- [Code repository](https://github.com/richardcornish/jquery-geolocate)
- [Online demo](https://richardcornish.github.io/jquery-geolocate/)

## Install

Assuming you have a [`package.json`](https://docs.npmjs.com/files/package.json):

```
$ npm install jquery-geolocate --save
```

## Usage

```
var jQuery = require('jquery');
require('jquery-geolocate');

(function($) {
    // See examples
})(jQuery);
```

Also see the source of this page for `<script>` tag examples.

## Options

Default plugin options that you can override:

```
var defaults = {
    loading: 'Searching...',
    formatted_address: true,
    components: [],
    name: 'long_name',
    delimeter: ', ',
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
```

See [Address Component Types](https://developers.google.com/maps/documentation/geocoding/intro#Types) in Google's documentation to know which components are available.

## Examples

### Default options (formatted address)

```
$('.button-1').on('click', function() {
    $('.input-1').geolocate();
});
```

### Postal code

```
$('.button-2').on('click', function() {
    $('.input-2').geolocate({
        'components': ['postal_code']
    });
});
```

### City, state, ZIP; short names; pipe delimeter

```
$('.button-3').on('click', function() {
    $('.input-3').geolocate({
        'components': [
            'locality',
            'administrative_area_level_1',
            'postal_code'
        ],
        'name': 'short_name',
        'delimeter': ' | '
    });
});
```

### No jQuery selector

```
$('.button-4').on('click', function() {
    $.geolocate().done(function(result) {
        alert(result);
    });
});
```

Returns a jQuery [Deferred Object](https://api.jquery.com/category/deferred-object/), so you should use [`.done()`](https://api.jquery.com/deferred.done/) to receive the asynchronous result.