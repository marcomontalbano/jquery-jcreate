describe('jQuery.event.special.create.utility', function()
{
    it('.firstLetterToLowerCase()', function() {
        expect( jQuery.event.special.create.utility.firstLetterToLowerCase('marcomontalbano') ).toEqual('marcomontalbano');
        expect( jQuery.event.special.create.utility.firstLetterToLowerCase('marcoMontalbano') ).toEqual('marcoMontalbano');
        expect( jQuery.event.special.create.utility.firstLetterToLowerCase('MarcoMontalbano') ).toEqual('marcoMontalbano');
    });

    it('.firstLetterToUpperCase()', function() {
        expect( jQuery.event.special.create.utility.firstLetterToUpperCase('marcomontalbano') ).toEqual('Marcomontalbano');
        expect( jQuery.event.special.create.utility.firstLetterToUpperCase('marcoMontalbano') ).toEqual('MarcoMontalbano');
        expect( jQuery.event.special.create.utility.firstLetterToUpperCase('MarcoMontalbano') ).toEqual('MarcoMontalbano');
    });

    it('.camelize()', function() {
        expect( jQuery.event.special.create.utility.camelize('marco-montalbano') ).toEqual('marcoMontalbano');
        expect( jQuery.event.special.create.utility.camelize('marco_montalbano') ).toEqual('marcoMontalbano');
        expect( jQuery.event.special.create.utility.camelize('marco.montalbano') ).toEqual('marcoMontalbano');
        expect( jQuery.event.special.create.utility.camelize('marcoMontalbano') ).toEqual('marcomontalbano');
    });

    it('.filterDataByKey()', function() {
        expect( jQuery.event.special.create.utility.filterDataByKey({width: 10, productKey:1, productName:'Android'}, 'product') ).toEqual({key:1, name:'Android'});
        expect( jQuery.event.special.create.utility.filterDataByKey('this is a string!', 'product') ).toEqual('this is a string!');
    });
});
