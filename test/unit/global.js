window.fixturesPath = 'test/unit/fixtures';
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

beforeEach(module('app'));

beforeEach(module(function ($provide) {
    
    var origin = {};

    // Allow to test if the component was called. Technically, I'm not calling a fake, that's the real deal but with a spy between.
    $provide.decorator('showErr', function ($delegate) {
        // Saving the real one
        origin.showErr = $delegate;
        return jasmine.createSpy().and.callFake($delegate);
    });

    // Bypass completely ImgCache processing as PhantomJS does not support the HTML5 File API.
    $provide.decorator('utils', function($delegate){
        // Saving the real one
        origin.utils = $delegate;
        return {
            cacheFile: jasmine.createSpy(),
            convertLocalFileSystemURL: jasmine.createSpy(),
            cacheThumbnails: jasmine.createSpy().and.callFake(function (items) {return items;})
        };
    });
    
    // Original components which have been decorated.
    $provide.value('origin', origin);
}));
