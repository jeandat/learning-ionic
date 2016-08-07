describe('showErr', function(){

    var showErr, Err, $cordovaToast, defaultErrMessage;

    beforeEach(inject(function($injector){
        showErr = $injector.get('showErr');
        Err = $injector.get('Err');
        $cordovaToast = $injector.get('$cordovaToast');
        defaultErrMessage = new Err(1002).message;
    }));

    it('should render a native toast with message defined in it', function(){
        var err = new Err(2000, {ui:true});
        spyOn($cordovaToast, 'showLongBottom').and.callThrough();
        showErr(err);
        expect($cordovaToast.showLongBottom).toHaveBeenCalledWith(err.message);
    });

    it('should render a native toast with a default message', function(){
        var err = new Err(2000);
        spyOn($cordovaToast, 'showLongBottom').and.callThrough();
        showErr(err);
        expect($cordovaToast.showLongBottom).toHaveBeenCalledWith(defaultErrMessage);
    });

    it('should render a native toast with a default message', function(){
        spyOn($cordovaToast, 'showLongBottom').and.callThrough();
        showErr('some err');
        expect($cordovaToast.showLongBottom).toHaveBeenCalledWith(defaultErrMessage);
    });

});
