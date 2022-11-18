
import LoginPage from '../../page-objects/login-page';
import { benHurr47, randomUser, userlogin } from '../../fixtures';
import HomePage from '../../page-objects/home-page';
import NewClientForm from '../../page-objects/newClientForm-page.js'
import CommonFunctions from '../../support/commonFunctions.js'
import * as common from 'mocha/lib/interfaces/common';

const loginPage = new LoginPage();
const homePage = new HomePage();
const newClientForm = new NewClientForm();
const commonFunctions = new CommonFunctions();

describe('Add Tax Form - Fund', () => {

    var newTaxReturnIFormData;
    let loginuserdetails;

    before(function () {
       
        cy.fixture('userlogin-trialloop.json').then((userlogin) => {
                      // "this" is still the test context object
                      this.userlogin = userlogin;
                      const data = this.userlogin;
                      cy.get(data).each((tObject) => {
                          if ((tObject.identifier) === Cypress.env('loginuser') && (tObject.envname) === Cypress.env('envname'))
                          {
                              cy.log('configured-loginuser=' + Cypress.env('loginuser'));
                              cy.log('configured-envname=' + Cypress.env('envname'));
                              
                              loginuserdetails = tObject;
                              Cypress.env('baseUrl', loginuserdetails.baseUrl)
                              Cypress.env('logoutredirectlogin_Url', loginuserdetails.logoutredirectlogin_Url)
                              
                              cy.log('configured-baseUrl=' + tObject.baseUrl);
                              cy.log('configured-logoutredirectlogin_Url=' + Cypress.env('logoutredirectlogin_Url'));  
                          }
                      });    
              });

                cy.fixture('newTaxReturnIndividual1.json').then((testData) => {
                // "this" is still the test context object
                this.testData = testData;
                    newTaxReturnIFormData = this.testData;
    
                //cy.log('Debug 1 ' + newTaxFormData.clientRef);
    
            })
      })
    
    it('HTC Tax Lodgement Forms', () => {

        //cy.log('Debug 2 :' + newTaxFormData.clientRef);

        //Launch THC QA
        commonFunctions.launchHTC(loginPage.url);

        //Login HTC QA as Ben
        commonFunctions.loginHTC(loginuserdetails.email, loginuserdetails.password, loginuserdetails.firstName);

        //cy.configPracticesSettings_Agents('Staging Practice');
        //commonFunctions.configPracticesSettings_Agents('Staging Practice', 0);

        //Update status to Ready to Lodge
        commonFunctions.updatetaxformstatus(newTaxReturnIFormData.individualIncome[0].clientRef, newTaxReturnIFormData.individualIncome[0].formType, '2022','Ready to lodge');

        //Lodge Tax form.
        commonFunctions.lodgeTaxReturn(newTaxReturnIFormData.individualIncome[0].clientRef, newTaxReturnIFormData.individualIncome[0].formType, '2022');

        //Update the Tax form status to Not started.        
        commonFunctions.updatetaxformstatus(newTaxReturnIFormData.individualIncome[0].clientRef, newTaxReturnIFormData.individualIncome[0].formType, '2022', 'Not started');
        //Delete the Taxform.
        commonFunctions.deletetaxform(newTaxReturnIFormData.individualIncome[0].clientRef, newTaxReturnIFormData.individualIncome[0].formType, '2022');

        commonFunctions.displayHomePage();
        //commonFunctions.logoutHTC();

    })


})