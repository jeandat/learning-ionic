describe('CharacterListController', function(){

    var scope, ctrl, $httpBackend, characterService, $cordovaToast;

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
});
