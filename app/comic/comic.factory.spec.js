describe('comicService: ', function () {

    var comicService, $httpBackend, prefix = 'sp';

    beforeEach(inject(function ($injector) {
        comicService = $injector.get('comicService');
        $httpBackend = $injector.get('$httpBackend');
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should have 4 results', function (done) {
        var fixture = readJSON(fixturesPath + '/comics/Deadpool.json');
        $httpBackend.expectGET(/\/comics/).respond(fixture);
        comicService.findByName('Deadpool').then(function (results) {
            expect(results).toBeTruthy();
            expect(results.length).toBe(20);
            done();
        });
        $httpBackend.flush();
    });

    it('should get the twenty first results', function (done) {
        var fixture1 = readJSON(fixturesPath + '/comics/sp_0.json');
        $httpBackend.expectGET(/\/comics/).respond(fixture1);
        comicService.findByName(prefix).then(function (results) {
            expect(results).toBeTruthy();
            expect(results.length).toBe(20);
            expect(results[0].id).toBe(56169);
            done();
        });
        $httpBackend.flush();
    });

    it('should get the remaining results', function(done){
        var fixture2 = readJSON(fixturesPath + '/comics/sp_20.json');
        $httpBackend.expectGET(/\/comics/).respond(fixture2);
        comicService.findByName(prefix, 20).then(function (results) {
            expect(results).toBeTruthy();
            expect(results.length).toBe(20);
            expect(results[0].id).toBe(55717);
            done();
        });
        $httpBackend.flush();
    });

});
