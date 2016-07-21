describe('characterService: ', function () {

    var characterService, $httpBackend, prefix = 'sp';

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

    it('should get the twenty first results', function (done) {
        var fixture1 = readJSON(fixturesPath + '/characters/sp_0.json');
        $httpBackend.expectGET(/\/characters/).respond(fixture1);
        characterService.findByName(prefix).then(function (results) {
            expect(results).toBeTruthy();
            expect(results.length).toBe(20);
            expect(results[0].id).toBe(1009552);
            done();
        });
        $httpBackend.flush();
    });
    
    it('should get the remaining results', function(done){
        var fixture2 = readJSON(fixturesPath + '/characters/sp_20.json');
        $httpBackend.expectGET(/\/characters.*offset=20/).respond(fixture2);
        characterService.findByName(prefix, 20).then(function (results) {
            expect(results).toBeTruthy();
            expect(results.length).toBe(13);
            expect(results[0].id).toBe(1016181);
            done();
        });
        $httpBackend.flush();
    });

});
