

describe('Edit Tax Return - IForm', () => {

    var newTaxReturnIFormData;

    before(function () {

        cy.fixture('newTaxReturnIndividual1.json').then((testData) => {
            // "this" is still the test context object
            this.testData = testData;
            newTaxReturnIFormData = this.testData;



        })

    })

    it('Debug Test 1', () => {

        cy.log('newTaxReturnIFormData.clientRef= ' + newTaxReturnIFormData.individualIncome[0].clientRef);

        cy.log('This is debug test 1.');


    })

    it('Debug Test 2', () => {


        cy.log('This is debug test 2.');


    })





})