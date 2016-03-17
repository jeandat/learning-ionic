describe('characterService: ', function () {

    var characterService, $httpBackend;

    beforeEach(module('app'));

    beforeEach(inject(function ($injector) {
        characterService = $injector.get('characterService');
        $httpBackend = $injector.get('$httpBackend');
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should have 4 results', function (done) {
        var fixture = readJSON(fixturesPath + '/characters/Deadpool.json');
        $httpBackend.expectGET(/\/characters/).respond(fixture);
        characterService.findByName('Deadpool').then(function (results) {
            expect(results).toBeTruthy();
            expect(results.length).toBe(4);
            done();
        });
        $httpBackend.flush();
    });

    it('should have multiple pages', function (done) {
        var fixture1 = readJSON(fixturesPath + '/characters/s_0.json');
        var fixture2 = readJSON(fixturesPath + '/characters/s_20.json');
        $httpBackend.expectGET(/\/characters/).respond(fixture1);
        $httpBackend.expectGET(/\/characters/).respond(fixture2);
        var prefix = 'sp';
        var offset = 0;
        var list = [];
        characterService.findByName(prefix).then(function (results) {
            expect(results).toBeTruthy();
            expect(results.length).toBe(20);
            list = list.concat(results);
        }).then(function () {
            offset = 20;
            return characterService.findByName(prefix, offset);
        }).then(function (results) {
            expect(results).toBeTruthy();
            expect(results.length).toBe(13);
            expect(list[0].id).not.toBe(results[0].id);
            list = list.concat(results);
            expect(list.length).toBe(33);
            done();
        });
        $httpBackend.flush();
    });

});
