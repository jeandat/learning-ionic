describe('CharacterListController', function(){

    var scope, ctrl, $httpBackend, characterService, $cordovaToast, throwErr, showErr;

    beforeEach(module(function ($provide) {
        // The real `throwErr` component will throw an exception to trigger $exceptionHandler but that will make jasmine fail obviously.
        $provide.decorator('throwErr', function ($q) {
            return jasmine.createSpy().and.callFake(function (err) {
                return $q.reject(err);
            });
        });
    }));
        
    beforeEach(inject(function($injector){
        var $rootScope = $injector.get('$rootScope');
        scope = $rootScope.$new();

        var $controller = $injector.get('$controller');
        ctrl = $controller('CharacterListController', {$scope: scope});
        expect(ctrl).toEqual(jasmine.any(Object));
        expect(ctrl.filter).toBe('wolverine');

        $httpBackend = $injector.get('$httpBackend');
        characterService = $injector.get('characterService');
        $cordovaToast = $injector.get('$cordovaToast');
        throwErr = $injector.get('throwErr');
        showErr = $injector.get('showErr');
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingRequest();
    });

    // Test the search part when requesting Marvel API
    it('should load 5 characters', function(done){
        expect(ctrl.characters.length).toBe(0);

        var fixture = readJSON(fixturesPath + '/characters/wolverine_0.json');
        $httpBackend.expectGET(/\/characters/).respond(fixture);

        spyOn($cordovaToast, 'showShortBottom').and.callThrough();

        ctrl.search().then(function(){
            expect(ctrl.characters.length).toBe(5);
            expect(ctrl.characters.meta.total).toBe(5);
            expect(ctrl.characters.meta.count).toBe(5);
            expect(ctrl.characters.meta.offset).toBe(0);
            expect(ctrl.hasMore).toBe(false);
            expect(ctrl.searching).toBe(false);
            expect($cordovaToast.showShortBottom).toHaveBeenCalled();
            var first = ctrl.characters[0];
            expect(first.name).toBe('Wolverine');
            done();
        });
        $httpBackend.flush();
    });

    it('should fail loading characters', function(done){

        expect(ctrl.characters.length).toBe(0);
        $httpBackend.expectGET(/\/characters/).respond(500);

        ctrl.search()
            .then(function(){
                throw 'Should have failed';
            })
            .catch(function(err){
                expect(err).toEqual(jasmine.any(Object));
                expect(err.status).toBe(500);
                expect(ctrl.characters.length).toBe(0);
                expect(ctrl.characters.meta).toBeUndefined();
                expect(ctrl.hasMore).toBe(false);
                expect(ctrl.searching).toBe(false);
                done();
            });
        $httpBackend.flush();
    });
});
