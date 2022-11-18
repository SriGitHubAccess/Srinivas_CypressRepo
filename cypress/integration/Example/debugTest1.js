
import LoginPage from '../page-objects/login-page';
import { benHurr47, randomUser, htcqasuperuser01 } from '../data';
import HomePage from '../page-objects/home-page';
import NewClientForm from '../page-objects/newClientForm-page.js'
import CommonFunctions from '../support/commonFunctions.js'
import * as common from 'mocha/lib/interfaces/common';

const loginPage = new LoginPage();
const homePage = new HomePage();
const newClientForm = new NewClientForm();
const commonFunctions = new CommonFunctions();

describe('Edit Tax Return - IForm', () => {

    var newTaxReturnIFormData;

    before(function () {

        cy.fixture('newTaxReturnIndividual1.json').then((testData) => {
            // "this" is still the test context object
            this.testData = testData;
            newTaxReturnIFormData = this.testData;

            cy.log('newTaxReturnIFormData.clientRef= ' + newTaxReturnIFormData.clientRef);

        })

    })

    it('Edit Tax Return - IForm - Download and Validate Prefill Report', () => {

        /*//Launch THC QA
        commonFunctions.launchHTC(loginPage.url);

        //Login HTC QA as Ben
        commonFunctions.loginHTC(htcqasuperuser01.email, htcqasuperuser01.password, htcqasuperuser01.firstName);

        //Display Tax Return form
        commonFunctions.displayTaxReturnForm(newTaxReturnIFormData.individualIncome[0].clientRef, newTaxReturnIFormData.individualIncome[0].formType);*/

        //Download and Validate Prefill Report
        commonFunctions.downloadAndValidatePrefillReport();

       /* commonFunctions.displayHomePage();
        commonFunctions.logoutHTC();*/

    })


})