describe('chatsService: ', function () {

    var chatsService;

    beforeEach(module('app'));

    beforeEach(inject(function (_chatsService_) {
        chatsService = _chatsService_;
    }));

    it('should have a Ben Sparrow item', function () {
        var chats = chatsService.all();
        var ben = _.find(chats, {name:'Ben Sparrow'});
        expect(ben).toBeTruthy();
        expect(ben.id).toBe(0);
    });

    it('should have one less chat', function(){
        var chats = chatsService.all();
        expect(chats.length).toBe(5);
        var ben = _.find(chats, {name:'Ben Sparrow'});
        chatsService.remove(ben);
        chats = chatsService.all();
        expect(chats.length).toBe(4);
        ben = _.find(chats, {name:'Ben Sparrow'});
        expect(ben).toBeUndefined();
    });

    it('should find ben', function(){
        var max = chatsService.get('1');
        expect(max).toBeTruthy();
        expect(max.id).toBe(1);

        var nil = chatsService.get('10');
        expect(nil).toBeNull();

        nil = chatsService.get('-1');
        expect(nil).toBeNull();
    });

});