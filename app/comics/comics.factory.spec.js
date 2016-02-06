describe('comicsService: ', function () {

    var comicsService;

    beforeEach(module('app'));

    beforeEach(inject(function (_comicsService_) {
        comicsService = _comicsService_;
    }));

    it('should have a Ben Sparrow item', function () {
        var comics = comicsService.all();
        var ben = _.find(comics, {name:'Ben Sparrow'});
        expect(ben).toBeTruthy();
        expect(ben.id).toBe(0);
    });

    it('should have one less comic', function(){
        var comics = comicsService.all();
        expect(comics.length).toBe(5);
        var ben = _.find(comics, {name:'Ben Sparrow'});
        comicsService.remove(ben);
        comics = comicsService.all();
        expect(comics.length).toBe(4);
        ben = _.find(comics, {name:'Ben Sparrow'});
        expect(ben).toBeUndefined();
    });

    it('should find ben', function(){
        var max = comicsService.get('1');
        expect(max).toBeTruthy();
        expect(max.id).toBe(1);

        var nil = comicsService.get('10');
        expect(nil).toBeNull();

        nil = comicsService.get('-1');
        expect(nil).toBeNull();
    });

});
