import { exists } from "fs";
import { userlogin } from "../../fixtures/";
import CommonFunctions from '../../support/commonFunctions.js'

const commonFunctions = new CommonFunctions();

describe('Login HTC QA', () => {
    
    let loginuserdetails;

    before(function () {
       
      //  Cypress.env("FAILED_PREV_TEST",false);
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
    })
  
    beforeEach(function () {

        //Launch HTC QA
        commonFunctions.launchHTC();

    })
    
    
    it('Login with correct credentials should be successful', () => {

        let practiceName = loginuserdetails.practiceName
  
       //Login HTC QA as Peter
        commonFunctions.loginHTC(loginuserdetails.email, loginuserdetails.password, loginuserdetails.firstName);
        commonFunctions.displayHomePage();
        commonFunctions.displayPracticeSettings();
      //  commonFunctions.selectPracticeInSettingsPage(practiceName)
        commonFunctions.displayPracticeSettings_Agents()
        commonFunctions.displayHomePage();

        commonFunctions.logoutHTC();

    });


})
