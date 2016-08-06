describe('html2text', function() {

    var $filter, html2text;

    beforeEach(inject(function(_$filter_){
        $filter = _$filter_;
        html2text = $filter('html2text');
    }));

    it('removes html tags', function() {
        var source = 'Bon dia <br/>';
        expect(html2text(source)).toBe('Bon dia');
    });

    it('removes html tags', function() {
        var source = '<div class="foo">Bon dia </div>';
        expect(html2text(source)).toBe('Bon dia');
    });

    it('removes html tags', function() {
        expect(html2text(null)).toBe('');
    });

    it('removes html tags', function() {
        expect(html2text(undefined)).toBe('');
    });
});
