window.fixturesPath = 'test/unit/fixtures';

beforeEach(module('app'));

beforeEach(inject(function($injector){
    var utils = $injector.get('utils');

    // Bypass completely ImgCache processing as PhantomJS does not support the HTML5 File API.
    spyOn(utils, 'cacheThumbnails').and.callFake(function(items){
        return items;
    });
}));
