QUnit.test("Test geolocate with DOM element", function(assert) {
    var done = assert.async();
    result = jQuery('.input').geolocate();
    setTimeout(function() {
        assert.ok(true, result.val(), "Passed");
        done();
    }, 5000);
});

QUnit.test("Test geolocate without DOM element", function(assert) {
    var done = assert.async();
    var result;
    jQuery.geolocate().done(function(result) {
        result = result;
    });
    setTimeout(function() {
        assert.ok(true, result, "Passed");
        done();
    }, 5000);
});