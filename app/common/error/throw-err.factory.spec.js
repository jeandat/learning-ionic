describe('throwErr', function(){

    var throwErr, Err;

    beforeEach(inject(function($injector){
        throwErr = $injector.get('throwErr');
        Err = $injector.get('Err');
    }));

    it('should throw the given err', function(){
        var err = new Err(2000);
        expect(_.wrap(err, throwErr)).toThrowError(Err);
    });
});
