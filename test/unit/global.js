window.fixturesPath = 'test/unit/fixtures';
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

beforeEach(module('app'));

beforeEach(inject(function($injector){
    var utils = $injector.get('utils');

    // Bypass completely ImgCache processing as PhantomJS does not support the HTML5 File API.
    spyOn(utils, 'cacheThumbnails').and.callFake(function(items){
        return items;
    });
}));
