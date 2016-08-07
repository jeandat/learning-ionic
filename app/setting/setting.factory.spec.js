describe('settingService', function(){

    var settingService, trackerId, $ionicConfig, $window, $log;

    beforeEach(inject(function($injector){
        settingService = $injector.get('settingService');
        trackerId = $injector.get('trackerId');
        $ionicConfig = $injector.get('$ionicConfig');
        $window = $injector.get('$window');
        $log = $injector.get('$log');
    }));

    afterEach(inject(function(localStorageService){
        localStorageService.remove('settings');
    }));

    it('should set animations and tracker to false', function(){
        var oldSettings = angular.copy(settingService.settings);
        var newSettings = settingService.settings = {enableAnimations: false, enableTracker: false};
        spyOn($ionicConfig.views, 'transition').and.callThrough();
        settingService.applyDiffAndPersist(newSettings, oldSettings);
        expect($ionicConfig.views.transition).toHaveBeenCalledWith('none');
        expect($window['ga-disable-' + trackerId]).toBe(true);
        expect($log.info.logs[0][0]).toBe('Settings persisted');
    });

});
