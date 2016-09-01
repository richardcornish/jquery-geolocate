/* jQuery Geolocate */

(function(factory) {
    if(typeof module === "object" && typeof module.exports === "object") {
        factory(require("jquery"), window, document);
    } else {
        factory(jQuery, window, document);
    }
}(function($, window, document, undefined) {

    'use strict';

    var get_position = function(options) {
        var deferred = $.Deferred();
        navigator.geolocation.getCurrentPosition(deferred.resolve, deferred.reject, options);
        return deferred.promise();
    };

    var geocode_position = function(position) {
        var deferred = $.Deferred();
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({location: latlng}, deferred.resolve);
        return deferred.promise();
    };

    var parse_address = function(results, status, options) {
        if (status === 'OK') {
            var address = '';
            var name = '';
            if (options.components.length === 0) {
                address = results[0].formatted_address;
            } else {
                $.each(results[0].address_components, function() {
                    $.each(this, function(key, value) {
                        if (key === 'long_name' && options.name === 'long_name') {
                            name = value;
                        } else if (key === 'short_name' && options.name === 'short_name') {
                            name = value;
                        } else if (key === 'types') {
                            $.each(value, function(index, value) {
                                $.each(options.components, function(i, v) {
                                    if (value === v) {
                                        if (address === '') {
                                            address = name;
                                        } else {
                                            address = address + options.delimeter + name;
                                        }
                                    }
                                });
                            });
                        }
                    });
                });
            }
            return address;
        } else {
            return 'Could not an address for your location.';
        }
    };

    var insert_text = function(text) {
        if ($(this).is(':input')) {
            if ($(this).is(':disabled')) {
                $(this).val(text).prop('disabled', false);
            } else {
                $(this).val(text).prop('disabled', true);
            }
        } else {
            $(this).text(text);
        }
    };

    $.geolocate = function(user_options) {

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

        var options = $.extend(defaults, user_options);

        if ('geolocation' in window.navigator) {
            return $.when(get_position(options))
            .then(geocode_position)
            .then(function(results, status){
                return parse_address(results, status, options);
            });
        } else {
            alert('Geolocation is not available.');
        }

    };

    $.fn.geolocate = function(user_options) {

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

        var options = $.extend(defaults, user_options);

        return this.each(function() {
            if ('geolocation' in window.navigator) {
                var insert_loading = insert_text.bind(this);
                insert_loading(options.loading);
                $.when(get_position(options))
                .then(geocode_position)
                .then(function(results, status) {
                    return parse_address(results, status, options);
                })
                .then(insert_text.bind(this));
            } else {
                alert('Geolocation is not available.');
            }
        });

    };

}));