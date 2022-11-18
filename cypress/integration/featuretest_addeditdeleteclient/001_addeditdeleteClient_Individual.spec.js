//import UserLogin and fakeuser data from fixtures
import { userlogin, randomUser } from "../../fixtures";

//import pageobjects data for the pages in scope testing
import NewClientForm from '../../page-objects/newClientForm-page.js'
import CommonFunctions from '../../support/commonFunctions.js'

let Client_name = randomUser.firstName;
const newClientForm = new NewClientForm();
const commonFunctions = new CommonFunctions();

describe('Add New Client - Individual', () => {

    var newClient;
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

              cy.fixture('newclientIndividual1.json').then((client) => {
                // "this" is still the test context object
                this.client = client;
                newClient = this.client;
                newClient.clientRef = randomUser.clientref;
                newClient.firstname = Client_name;
                newClient.surname = randomUser.lastName;
        
                cy.log('clientType=' + newClient.clientType);
                cy.log('addresses=' + newClient.addresses[0].addressType);
                cy.log('clientRef=' + newClient.clientRef);
        
            });
      })
    

    beforeEach(function () {

        //Launch THC QA
        commonFunctions.launchHTC();

        //Login HTC QA as Peter
        commonFunctions.loginHTC(loginuserdetails.email, loginuserdetails.password, loginuserdetails.firstName);
        
        cy.intercept('POST', '/services/Client/GetClientsTaxReturnsForUser').as('loadHomePage');      


    })
    
    it('Login HTC and add New Client - Individual Type.', () => {

        
       //Add a new Individual Client
        commonFunctions.addNewClient_Individual_General(newClient.clientType, newClient.gender, newClient.surname, newClient.personalTitle, newClient.firstname, newClient.othername, newClient.surffix, newClient.alternativename, newClient.dob, newClient.clientRef);
        
        var rowNumber = 0;
        commonFunctions.addNewClient_Address(newClient.addresses[rowNumber].addressType, newClient.addresses[rowNumber].street1, newClient.addresses[rowNumber].suburb, newClient.addresses[rowNumber].state, newClient.addresses[rowNumber].postcode, newClient.addresses[rowNumber].country, rowNumber);
        commonFunctions.addNewClient_PhoneAndEmail(newClient.phoneNumber[rowNumber].type, newClient.phoneNumber[rowNumber].number, newClient.phoneNumber[rowNumber].description, newClient.email[rowNumber].emailContactName, newClient.email[rowNumber].emailAddress, rowNumber);

        commonFunctions.addNewClient_BankAccount(newClient.bsb, newClient.accountNumber, newClient.accountName, newClient.bankAccountNotes);

        //Click Save New Client button.
        newClientForm.button_Save().click();
        
        cy.wait('@loadHomePage').its('response.statusCode').should('eq', 200);
        //cy.wait(10000);
        cy.log("Save button is clicked in New Client Form.");
        commonFunctions.displayHomePage();

        commonFunctions.logoutHTC();

    
    });

    it('Edit Client - Individual Type.', () => {
       
        cy.log('clientType=' + newClient.clientType);
        cy.log('clientRef=' + newClient.clientRef);
        cy.log('clientName=' + Client_name);
        var rowNumber = 0;

     //   cy.get('.dx-texteditor-input').clear();
    //    cy.wait(5000);
        //cy.get('.dx-texteditor-input').clear();
        let updatedemailContactName = "test@theaccessgroup.com.au"
        let updatedemailAddress = "test@theaccessgroup.com.au"
        let updatedphoneNumber = "0419999998"

        commonFunctions.searchClient(Client_name);

        commonFunctions.editselectedClient_General(rowNumber,Client_name,updatedemailContactName,updatedemailAddress,updatedphoneNumber);
        cy.wait('@loadHomePage').its('response.statusCode').should('eq', 200);
        
        commonFunctions.displayHomePage();
        commonFunctions.logoutHTC();

    });

    it('Delete Client - Individual Type.', () => {
       
            cy.log('clientType=' + newClient.clientType);
            cy.log('clientRef=' + newClient.clientRef);
            cy.log('clientName=' + Client_name);

            commonFunctions.searchClient(Client_name);

            commonFunctions.deleteselectedClient_General(Client_name);
            cy.wait('@loadHomePage').its('response.statusCode').should('eq', 200);
            
            commonFunctions.displayHomePage();
            commonFunctions.logoutHTC();

    
        });

})