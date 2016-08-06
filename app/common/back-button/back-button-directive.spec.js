describe('back-button directive', function() {
    var $compile, $rootScope, $templateCache, $controller;

    beforeEach(inject(function($injector){
        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
        $templateCache = $injector.get('$templateCache');
        $controller = $injector.get('$controller');
    }));

    it('should render an iOS back button', function() {
        spyOn(ionic.Platform, 'isIOS').and.returnValue(true);
        spyOn(ionic.Platform, 'isAndroid').and.returnValue(false);
        var scope = $rootScope.$new();
        var el = $compile('<back-button></back-button>')(scope);
        scope.$digest();
        expect(el).toEqual(jasmine.any(Object));
        expect(el.html()).toContain('ion-ios-arrow-back');
        expect(el.html()).not.toContain('ion-android-arrow-back');
    });

    it('should render an Android back button', function() {
        spyOn(ionic.Platform, 'isIOS').and.returnValue(false);
        spyOn(ionic.Platform, 'isAndroid').and.returnValue(true);
        var scope = $rootScope.$new();
        var el = $compile('<back-button></back-button>')(scope);
        scope.$digest();
        expect(el).toEqual(jasmine.any(Object));
        expect(el.html()).toContain('ion-android-arrow-back');
        expect(el.html()).not.toContain('ion-ios-arrow-back');
    });
});
