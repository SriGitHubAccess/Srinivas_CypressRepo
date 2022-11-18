
import HomePage from '../page-objects/home-page';
import NewClientForm from '../page-objects/newClientForm-page.js';
import LoginPage from '../page-objects/login-page';
import PageObj_AddNewTaxForm from '../page-objects/pageObj_AddNewTaxForm';
import PracticeSettings from '../page-objects/practiceSettings-page';
import lodgementDialog from '../page-objects/lodgementDialog';
import PageObj_IFormIncome from '../page-objects/pageObj_IFormIncome';
import PageObj_IFormDeduction from '../page-objects/pageObj_IFormDeduction';
import PageObj_IForm_TaxOffsetMedicareAdjustment from '../page-objects/pageObj_IForm_TaxOffsetMedicareAdjustment';
import PageObj_IForm_IncomeTestAndSpouseDetails from '../page-objects/pageObj_IForm_IncomeTestAndSpouseDetails';
import PageObj_IForm_BusinessAndProfessionalItems from '../page-objects/pageObj_IForm_BusinessAndProfessionalItems';

const homePage = new HomePage();
const newClientForm = new NewClientForm();
const loginPage = new LoginPage();
const practiceSettings = new PracticeSettings();
const LodgementDialog = new lodgementDialog();
const pageObj_AddNewTaxForm = new PageObj_AddNewTaxForm();
const pageObj_IFormIncome = new PageObj_IFormIncome();
const pageObj_IFormDeduction = new PageObj_IFormDeduction();
const pageObj_IForm_TaxOffsetMedicareAdjustment = new PageObj_IForm_TaxOffsetMedicareAdjustment();
const pageObj_IForm_IncomeTestAndSpouseDetails = new PageObj_IForm_IncomeTestAndSpouseDetails();
const pageObj_IForm_BusinessAndProfessionalItems = new PageObj_IForm_BusinessAndProfessionalItems();
const minwait = 1000 ;
const longwait = 5000 ;


class CommonFunctions {

    
    launchHTC() {
        cy.log('Open HTC Page.');
        cy.request(Cypress.env('logoutredirectlogin_Url'));

    } 

    loginHTC(username, password, firstname) {

        // Sign in HTC as cloudtest25 
        cy.intercept('POST', '/**/B2C_1A_v1_htc_sign_in/**').as('b2csignin');
        cy.intercept('POST', '/services/Client/GetClientsTaxReturnsForUser').as('loadHomePage');
        cy.intercept('GET', '*/b2c_1a_v1_htc_sign_in/v2.0/.well-known/openid-configuration').as('loginclick');
        
        cy.visit(Cypress.env('baseUrl'));

        cy.log('firstname : ' + firstname);
        cy.log('username : ' + username);
        
        loginPage.button_Login().should('be.visible')
        loginPage.button_Login().click({force:true});
        cy.log("Click Login Button");
        cy.wait('@loginclick').its('response.statusCode').should('eq', 200);

        //Check and Enter Login credential only if it's prompted.
        cy.get('body').then(($body) => {
            let size = $body.find('h1').length;
            if (size > 0) {

                cy.wait('@b2csignin').its('response.statusCode').should('eq', 200);

                cy.xpath("//h1[text()='Sign in']").should('be.visible');

                cy.log('Username \'' + username + '\' is input.');
                loginPage.input_LoginName().type(username,{ delay: 200 });
                // cy.wait(2000)
                loginPage.button_Next().click({force:true});
                cy.log('Next button is clicked.');

                //  cy.wait(2000);
                cy.wait('@b2csignin').its('response.statusCode').should('eq', 200);
                cy.log('Password \'' + password + '\'is input.');
                loginPage.input_Password().type(password,{ delay: 200 });
                //  cy.wait(2000)
                loginPage.button_Signin().click({force:true});
                cy.log('Signin button is click.');
                cy.wait('@loadHomePage').its('response.statusCode').should('eq', 200);
                homePage.firstNameLable().should('contain', firstname); 
                
            }
        })   
        
        
    }

    logoutHTC() {
        
        cy.intercept('GET', '/services/Config/GetAppSettings').as('logoutHTC');
        homePage.button_LogoutHTC().click({force: true});
        cy.log('Logout HTC button is clicked.');
        cy.wait(2000);
        cy.wait('@logoutHTC').its('response.statusCode').should('eq', 200);
        loginPage.button_Login().should('be.visible');

    }
    
    displayHomePage() {
        
       
        homePage.htclogo().click({ force: true });
        cy.wait('@loadHomePage').its('response.statusCode').should('eq', 200);
        cy.log("HTC Logo is clicked. Back to home page.");
        
    }

   

    displayPracticeSettings() {
        homePage.button_PracticeSetting().click({force:true});
        cy.log('Settings button is clicked.');
        practiceSettings.lable_PracticeSettins().should('be.visible');

    }
    selectPracticeInSettingsPage(practiceName) {
        //Practice Settings - Agen page is shown first.
        practiceSettings.dropdown_Practice().click({force:true});
        cy.log('Pratice dropdown list is clicked.');
        cy.wait(2000)

        cy.xpath("//li[@class='dx-menu-item-wrapper' and contains(., '" + practiceName + "')]").should('be.visible').click({force:true});
        cy.log("Practice '" + practiceName + "' is selected.");


    }

    displayPracticeSettings_Agents() {
        //Practice Setting page is shown first.
        practiceSettings.tab_Agents().click({force:true});
        cy.log('Practice Settings - Agents tab is clicked.');

        cy.get('h5').contains('Agents');

    }

    configPracticesSettings_Agents(practiceName, orderNumberOfDefualtIncomeTaxAgent) {
        this.displayPracticeSettings();
        this.displayPracticeSettings_Agents();
        cy.log('Debug: ' + practiceName);
        this.selectPracticeInSettingsPage(practiceName);

        cy.wait(10000);
        this.displayPracticeSettings_Agents();

        //clear default Income Tax Agent
        this.clearDefaultIncomeTaxAgentInPracticeSetting_AgentsScreen();

       /* this.displayPracticeSettings();
        this.displayPracticeSettings_Agents();

        practiceSettings.dropdown_DafultIncomeTaxAgent().click({force:true});
        cy.log('Dropdown list Dafult Income Tax Agent is clicked.');

        cy.xpath("//div[@class='dx-item dx-list-item']").eq(orderNumberOfDefualtIncomeTaxAgent).click({force:true});
        cy.log('The Default IncomeTax Agent order ' + orderNumberOfDefualtIncomeTaxAgent + ' is selected.');

        practiceSettings.button_Save().click({force:true});
        cy.log('Save button is clicked in Practice Settings page.');
        cy.wait(longwait);
*/
    }

    clearDefaultIncomeTaxAgentInPracticeSetting_AgentsScreen() {
        ///////////// Practice Settings - Agent Screen is shown first ///////////////

        practiceSettings.dropdown_DafultIncomeTaxAgent().click({force:true});
        cy.log('Dropdown list Dafult Income Tax Agent is clicked.');
        cy.wait(longwait);

        cy.get('div[class="dx-item dx-list-item"]').eq(3).click({force:true});
        cy.log('Remove selected item.');

        practiceSettings.button_Save().click({force:true});
        cy.log('Save button is clicked in Practice Settings page.');
        cy.wait(longwait);
        
    }

    searchClient(keyword) {

        cy.intercept('POST', '/services/Client/GetClientsTaxReturnsForUser').as('changeSearch');
        
        
        homePage.input_Search().clear();
        cy.wait(longwait);
        homePage.input_Search().clear().type(keyword);
        cy.wait('@changeSearch').its('response.statusCode').should('eq', 200);
        cy.log('Search Key \'' + keyword + '\' is input.');
        cy.xpath("//tbody[contains(., '" + keyword + "')]").should('exist');

    }

/////////////

editselectedClient_General(rowNumber,Client_name,emailContactName,emailAddress,phoneNumber) {
     //this function updates the address and this is hard coded. Further refactoring needed   
     
    cy.wait(minwait);
   
    cy.xpath("(//table[@class='dx-datagrid-table dx-pointer-events-none dx-datagrid-table-fixed'])[2]").
    find('tbody').find('tr').contains(Client_name).click({force:true});

    cy.log('Selected Client button is clicked.');

    cy.wait(minwait);
    cy.xpath("//div[@id='AddressList']").children('div').should('have.class','dx-datagrid dx-datagrid-borders').
            children('div').should('have.class','dx-datagrid-rowsview dx-datagrid-nowrap dx-scrollable dx-scrollable-customizable-scrollbars dx-scrollable-both dx-scrollable-simulated dx-scrollable-scrollbars-alwaysvisible dx-visibility-change-handler').
            children('div').should('have.class','dx-scrollable-wrapper').
            children('div').should('have.class','dx-scrollable-container').
            children('div').should('have.class','dx-scrollable-content').
            children('div').should('have.class','dx-datagrid-content').
            children('table').should('have.class','dx-datagrid-table dx-datagrid-table-fixed').
            children('tbody').find('tr').eq(1).find('td').eq(2).type("13, Tancred streeet");

     ////////// Add Email Address ///////////////
     if (emailContactName != null) {
        newClientForm.cell_EmailContactName(rowNumber).click({force:true});
        cy.wait(1000);
        newClientForm.cell_EmailContactName_TextBox().type(emailContactName).tab();
        cy.log('Email Contact Name \'' + emailContactName + '\' is input.');
        newClientForm.lable_TableAddress().click({force:true});
    }

    if (emailAddress != null) {
        newClientForm.cell_EmailAddress(rowNumber).click({force:true});
        newClientForm.cell_EmailAddress_TextBox().type(emailAddress).tab();
        cy.log('Email Address \'' + emailAddress + '\' is input.');
        newClientForm.lable_TableAddress().click({force:true});
    }

    if (phoneNumber != null) {
        newClientForm.cell_PhoneNumber(rowNumber).click({force:true});
        newClientForm.cell_PhoneNumber_TextBox().type(phoneNumber).tab();
        cy.log('Phone Number \'' + phoneNumber + '\' is input in row ' + rowNumber + '.');
        newClientForm.lable_TablePhoneNumber().click({force:true});
    }


     //Click Save New Client button.
     newClientForm.button_Save().click();
     cy.log('Street Address Updated to '  + ' 13, Tancred streeet');
     cy.log("Save button is clicked in Edit Client Form.");

    
}

deleteselectedClient_General(Client_name) {
   
   cy.wait(minwait);
   cy.intercept('POST', 'services/Client/DeleteClient').as('deleteclient');

   cy.log('Selected Client button is clicked.');
   cy.xpath("(//table[@class='dx-datagrid-table dx-pointer-events-none dx-datagrid-table-fixed'])[2]").
   find('tbody').find('tr').contains(Client_name).click({force:true});
   cy.wait(minwait);

   cy.log("Delete button is clicked in Edit Client Form.");
   cy.xpath("//a[normalize-space()='Delete Client']").click({force:true});
   cy.wait(minwait);

   cy.log("Yes Confirmation button is clicked");
   cy.xpath("//input[@value='Yes']").click({force:true});
   cy.wait('@deleteclient').its('response.statusCode').should('eq', 200);
   
}

    //////

    addNewClient_Individual_General(clientType, gender, surname, personalTitle, firstname, othername, surffix, alternativeName, dob, clientRef) {
        
        cy.wait(minwait);
        homePage.button_AddClient().click({force:true});
        cy.log('Add button is clicked.');

        newClientForm.formTitle().should('exist');

        if (clientType != null) {
            
            newClientForm.dropdown_clientType().click({force:true});
            cy.log('Dropdown list - Client Type is clicked.');

            cy.get('div[id="clientType"] input[role="combobox"]').click({force:true});

        //    cy.xpath("//div[contains(text(),'Individual')]").click({force:true});   
            cy.log('Client Type - \'' + clientType + '\' is clicked.');
        }

        if (gender != null) {
            newClientForm.dropdown_Gender().click({force:true});
            cy.log('Dropdown list - Gender is clicked.');
            cy.get('div[title="Gender"] input[role="combobox"]').click({force:true});
            cy.log('Gender - \'' + gender + '\' is clicked.');
        }

        if (surname != null) {
            newClientForm.input_Surname().type(surname);
            cy.log('Surname \'' + surname + '\' is input.');
        }

        if (personalTitle != null) {
            newClientForm.select_Title().select(personalTitle);
            cy.log('Personal Title \'' + personalTitle + '\' is selected.');
        }

        if (firstname != null) {
            newClientForm.input_Firstname().type(firstname);
            cy.log('Firstname \'' + firstname + '\' is input.');
        }

        if (othername != null) {
            newClientForm.input_Othername().type(othername);
            cy.log('OtherName \'' + othername + '\' is input.');
        }

        if (surffix != null) {
            newClientForm.select_suffix().select(surffix);
            cy.log('Surffix \'' + surffix + '\' is selected.');
        }

        if (alternativeName != null) {
            newClientForm.input_AltName().type(alternativeName);
            cy.log('Alternative Name \'' + alternativeName + '\' is input.');
        }

        if (dob != null) {
            newClientForm.input_DOB().type(dob);
            cy.log('DOB \'' + dob + '\' is input.');
        }

        if (clientRef != null) {
            newClientForm.input_ClientRef(clientRef).type(clientRef);
            cy.log('Client Ref' + clientRef + ' is input.');
        }
   
    }


    addNewClient_Company_General(clientType, businessName, alternativeName, dateIncorporated, website, clientRef) {
        
        cy.wait(minwait);
        homePage.button_AddClient().click({force:true});
        cy.log('Add button is clicked.');

        newClientForm.formTitle().should('exist');

        if (clientType != null) {

            newClientForm.dropdown_clientType().click({force:true});
            cy.log('Dropdown list - Client Type is clicked.');

            cy.get('div[id="clientType"] input[role="combobox"]').click({force:true});

            cy.xpath("//div[contains(text(),'Company')]").click({force:true});            cy.log('Client Type - \'' + clientType + '\' is clicked.');
        }

        if (businessName != null) {
            newClientForm.textbox_BusinessName().type(businessName,{force:true});
            cy.log('Business Name \''+businessName+'\' is input.');
        }

        if (alternativeName != null) {
            newClientForm.input_AltName().type(alternativeName);
            cy.log('Alternative Name \'' + alternativeName + '\' is input.');
        }

        if (dateIncorporated != null) {
            newClientForm.input_DateIncoporated().type(dateIncorporated);
            cy.log('Date Incoporate \'' + dateIncorporated + '\' is input.');
        }

        if (website != null) {
            newClientForm.input_Website().type(website);
            cy.log('Website \'' + website + '\' is input.');
        }
        
        if (clientRef != null) {
            newClientForm.input_ClientRef(clientRef).type(clientRef);
            cy.log('Client Ref' + clientRef + ' is input.');
        }


    }

    addNewClient_OtherNonIndividual_General(clientType, businessName, alternativeName, dateIncorporated, website, clientRef) {
        
        cy.wait(minwait);

        homePage.button_AddClient().click({force:true});
        cy.log('Add button is clicked.');

        newClientForm.formTitle().should('exist');

        if (clientType != null) {

            newClientForm.dropdown_clientType().click({force:true});
            cy.log('Dropdown list - Client Type is clicked.');

            cy.get('div[id="clientType"] input[role="combobox"]').click({force:true});

            cy.xpath("//div[contains(text(),'Other Non-Individual')]").click({force:true});  
          cy.log('Client Type - \'' + clientType + '\' is clicked.');
        }

        if (businessName != null) {
            newClientForm.textbox_BusinessName().type(businessName,{force:true});
            cy.log('Business Name \'' + businessName + '\' is input.');
        }

        if (alternativeName != null) {
            newClientForm.input_AltName().type(alternativeName);
            cy.log('Alternative Name \'' + alternativeName + '\' is input.');
        }

        if (dateIncorporated != null) {
            newClientForm.input_DateIncoporated().type(dateIncorporated);
            cy.log('Date Incoporate \'' + dateIncorporated + '\' is input.');
        }

        if (website != null) {
            newClientForm.input_Website().type(website);
            cy.log('Website \'' + website + '\' is input.');
        }

        if (clientRef != null) {
            newClientForm.input_ClientRef(clientRef).type(clientRef);
            cy.log('Client Ref' + clientRef + ' is input.');
        }
    }

    addNewClient_Pertnership_General(clientType, businessName, alternativeName, dateIncorporated, website, clientRef) {
        
        cy.wait(minwait);

        homePage.button_AddClient().click({force:true});
        cy.log('Add button is clicked.');

        newClientForm.formTitle().should('exist');

        if (clientType != null) {

            newClientForm.dropdown_clientType().click({force:true});
            cy.log('Dropdown list - Client Type is clicked.');

            cy.get('div[id="clientType"] input[role="combobox"]').click({force:true});

            cy.xpath("//div[contains(text(),'Partnership')]").click({force:true});
            cy.log('Client Type - \'' + clientType + '\' is clicked.');
        }

        if (businessName != null) {
            newClientForm.textbox_BusinessName().type(businessName,{force:true});
            cy.log('Business Name \'' + businessName + '\' is input.');
        }

        if (alternativeName != null) {
            newClientForm.input_AltName().type(alternativeName);
            cy.log('Alternative Name \'' + alternativeName + '\' is input.');
        }

        if (dateIncorporated != null) {
            newClientForm.input_DateIncoporated().type(dateIncorporated);
            cy.log('Date Incoporate \'' + dateIncorporated + '\' is input.');
        }

        if (website != null) {
            newClientForm.input_Website().type(website);
            cy.log('Website \'' + website + '\' is input.');
        }

        if (clientRef != null) {
            newClientForm.input_ClientRef(clientRef).type(clientRef);
            cy.log('Client Ref' + clientRef + ' is input.');
        }

    }

    addNewClient_SMSF_General(clientType, businessName, alternativeName, dateIncorporated, website, clientRef) {
        cy.wait(minwait);

        homePage.button_AddClient().click({force:true});
        cy.log('Add button is clicked.');

        newClientForm.formTitle().should('exist');

        if (clientType != null) {

            newClientForm.dropdown_clientType().click({force:true});
            cy.log('Dropdown list - Client Type is clicked.');

            cy.get('div[id="clientType"] input[role="combobox"]').click({force:true});

            cy.xpath("//div[contains(text(),'SMSF')]").click({force:true});            cy.log('Client Type - \'' + clientType + '\' is clicked.');
        }

        if (businessName != null) {
            newClientForm.textbox_BusinessName().type(businessName,{force:true});
            cy.log('Business Name \'' + businessName + '\' is input.');
        }

        if (alternativeName != null) {
            newClientForm.input_AltName().type(alternativeName);
            cy.log('Alternative Name \'' + alternativeName + '\' is input.');
        }

        if (dateIncorporated != null) {
            newClientForm.input_DateIncoporated().type(dateIncorporated);
            cy.log('Date Incoporate \'' + dateIncorporated + '\' is input.');
        }

        if (website != null) {
            newClientForm.input_Website().type(website);
            cy.log('Website \'' + website + '\' is input.');
        }

        if (clientRef != null) {
            newClientForm.input_ClientRef(clientRef).type(clientRef);
            cy.log('Client Ref' + clientRef + ' is input.');
        }
    }

    addNewClient_Trust_General(clientType, businessName, alternativeName, dateIncorporated, website, clientRef) {
        
        cy.wait(minwait);

        homePage.button_AddClient().click({force:true});
        cy.log('Add button is clicked.');

        newClientForm.formTitle().should('exist');

        if (clientType != null) {

            newClientForm.dropdown_clientType().click({force:true});
            cy.log('Dropdown list - Client Type is clicked.');

            cy.get('div[id="clientType"] input[role="combobox"]').click({force:true});

            cy.xpath("//div[contains(text(),'Trust')]").click({force:true});            cy.log('Client Type - \'' + clientType + '\' is clicked.');
        }

        if (businessName != null) {
            newClientForm.textbox_BusinessName().type(businessName,{force:true});
            cy.log('Business Name \'' + businessName + '\' is input.');
        }

        if (alternativeName != null) {
            newClientForm.input_AltName().type(alternativeName);
            cy.log('Alternative Name \'' + alternativeName + '\' is input.');
        }

        if (dateIncorporated != null) {
            newClientForm.input_DateIncoporated().type(dateIncorporated);
            cy.log('Date Incoporate \'' + dateIncorporated + '\' is input.');
        }

        if (website != null) {
            newClientForm.input_Website().type(website);
            cy.log('Website \'' + website + '\' is input.');
        }

        if (clientRef != null) {
            newClientForm.input_ClientRef(clientRef).type(clientRef);
            cy.log('Client Ref' + clientRef + ' is input.');
        }
    }

    addNewClient_Fund_General(clientType, businessName, alternativeName, dateIncorporated, website, clientRef) {
        
        cy.wait(minwait);

        homePage.button_AddClient().click({force:true});
        cy.log('Add button is clicked.');

        newClientForm.formTitle().should('exist');

        if (clientType != null) { 

            newClientForm.dropdown_clientType().click({force:true});
            cy.log('Dropdown list - Client Type is clicked.');

            cy.get('div[id="clientType"] input[role="combobox"]').click({force:true});

            cy.xpath("//div[contains(text(),'Fund')]").click({force:true});            cy.log('Client Type - \'' + clientType + '\' is clicked.');
        }

        if (businessName != null) {
            newClientForm.textbox_BusinessName().type(businessName,{force:true});
            cy.log('Business Name \'' + businessName + '\' is input.');
        }

        if (alternativeName != null) {
            newClientForm.input_AltName().type(alternativeName);
            cy.log('Alternative Name \'' + alternativeName + '\' is input.');
        }

        if (dateIncorporated != null) {
            newClientForm.input_DateIncoporated().type(dateIncorporated);
            cy.log('Date Incoporate \'' + dateIncorporated + '\' is input.');
        }

        if (website != null) {
            newClientForm.input_Website().type(website);
            cy.log('Website \'' + website + '\' is input.');
        }

        if (clientRef != null) {
            newClientForm.input_ClientRef(clientRef).type(clientRef);
            cy.log('Client Ref' + clientRef + ' is input.');
        }
    }

  
    addNewClient_Address(addressType, street1, suburb, state, postcode, country, rowNumber) {
        //////////// Add address //////////////
        newClientForm.lable_TableAddress().click({force:true});

        if (addressType != null) {
            newClientForm.cell_AddressType(rowNumber).click({force:true});
            newClientForm.cell_AddressType_TextBox().type(addressType).tab();
            cy.log('Address Tpe \'' + addressType + '\' is input in row ' + rowNumber + '.');
            newClientForm.lable_TableAddress().click({force:true});
        }

        if (street1 != null) {
            newClientForm.cell_Street1(rowNumber).click({force:true});
            newClientForm.cell_Street1_TextBox().type(street1).tab();
            cy.log('Street 1 \'' + street1 + '\' is input.');
            newClientForm.lable_TableAddress().click({force:true});
        }

        if (suburb != null) {
            newClientForm.cell_Suburb(rowNumber).click({force:true});
            newClientForm.cell_Suburb_TextBox().type(suburb).tab();
            cy.log('Suburb \'' + suburb + '\' is input.');
            newClientForm.lable_TableAddress().click({force:true});
        }

        if (state != null) {
            newClientForm.cell_State(rowNumber).click({force:true});
            newClientForm.cell_State_TextBox().type(state).tab();
            cy.log('State \'' + state + '\' is input.');
            newClientForm.lable_TableAddress().click({force:true});
        }

        if (postcode != null) {
            newClientForm.cell_Code(rowNumber).click({force:true});
            newClientForm.cell_Code_TextBox().type(postcode).tab();
            cy.log('Postcode \'' + postcode + '\' is input.');
            newClientForm.lable_TableAddress().click({force:true});
        }

        if (country != null) {
            newClientForm.cell_Country(rowNumber).click({force:true});
            //newClientForm.cell_Country_TextBox().type(country);
            cy.xpath("//td[@aria-label='Column Country, Value ']//div[@class='dx-dropdowneditor-icon']").click({force:true});
            cy.xpath("//div[@class='dx-item-content dx-list-item-content' and contains(., '" + country + "')]").click({force:true});
            cy.log('Counry \'' + country + '\' is selected.');
            newClientForm.lable_TableAddress().click({force:true});
        }
    }


    addNewClient_PhoneAndEmail(phoneType, phoneNumber, phoneDescription, emailContactName, emailAddress, rowNumber) {
        //////////// Add Phone Number //////////////
        newClientForm.lable_TablePhoneNumber().click({force:true});

        cy.log("phone Type=" + phoneType);
        cy.log("rowNumber=" + rowNumber);

        if (phoneType != null) {
            newClientForm.cell_PhoneType(rowNumber).click({force:true});
            //newClientForm.cell_PhoneType_TextBox().type(phoneType);
            cy.xpath("//td[@aria-label='Column Type, Value null']//div[@class='dx-dropdowneditor-icon']").click({force:true});
            cy.xpath("//div[@class='dx-item-content dx-list-item-content' and contains(., '" + phoneType + "')]").click({force:true});
            cy.log('Phone Type \'' + phoneType + '\' is input in row ' + rowNumber + '.');
            newClientForm.lable_TablePhoneNumber().click({force:true});
            cy.wait(2000);
        }

        if (phoneNumber != null) {
            newClientForm.cell_PhoneNumber(rowNumber).click({force:true});
            newClientForm.cell_PhoneNumber_TextBox().type(phoneNumber).tab();
            cy.log('Phone Number \'' + phoneNumber + '\' is input in row ' + rowNumber + '.');
            newClientForm.lable_TablePhoneNumber().click({force:true});
        }

        if (phoneDescription != null) {
            newClientForm.cell_PhoneDescription(rowNumber).click({force:true});
            newClientForm.cell_PhoneDescription_TextBox().type(phoneDescription).tab();
            cy.log('Phone Description \'' + phoneDescription + '\' is input in row ' + rowNumber + '.');
            newClientForm.lable_TablePhoneNumber().click({force:true});
        }

        ////////// Add Email Address ///////////////
        if (emailContactName != null) {
            newClientForm.cell_EmailContactName(rowNumber).click({force:true});
            cy.wait(1000);
            newClientForm.cell_EmailContactName_TextBox().type(emailContactName).tab();
            cy.log('Email Contact Name \'' + emailContactName + '\' is input.');
            newClientForm.lable_TableAddress().click({force:true});
        }

        if (emailAddress != null) {
            newClientForm.cell_EmailAddress(rowNumber).click({force:true});
            newClientForm.cell_EmailAddress_TextBox().type(emailAddress).tab();
            cy.log('Email Address \'' + emailAddress + '\' is input.');
            newClientForm.lable_TableAddress().click({force:true});
        }

        

    } 


    addNewClient_BankAccount(bsb, accountNumber, accountName, bankAccountNotes) {
        //////////// Add Bank Account //////////////

        if (bsb != null) {
            newClientForm.input_BSB().type(bsb);
            cy.log('BSB \'' + bsb + '\' is input.');
        }

        if (accountNumber != null) {
            newClientForm.input_AccountNumber().type(accountNumber);
            cy.log('Account Number \'' + accountNumber + '\' is input.');
        }


        if (accountName != null) {
            newClientForm.input_AccountName().type(accountName);
            cy.log('AccountName \'' + accountName + '\' is input.');
        }

        if (bankAccountNotes != null) {
            newClientForm.textbox_BankAccountNote().type(bankAccountNotes);
            cy.log('bankAccountNotes \'' + bankAccountNotes + '\' is input.');
        }
    }
    

    addNewTaxForm(clientRef, formType, agent) {
        cy.log('Start add Tax Form...');
        //cy.log(clientRef);
        this.searchClient(clientRef);

        //click the footer to disable the hint pop up
        cy.wait(2000);
        cy.xpath("//strong[starts-with(text(), 'Copyright')]").click({force:true});
        cy.wait(10000);

        cy.xpath("//tr[contains(., '" + clientRef + "')]//img[@title='Add New Tax Form']").eq(1).click({force: true});
        cy.log('Add Tax Form button is clicked.');
        cy.intercept('GET', '/services/TaxForm/GetTaxFormStaticData?clientID**').as('addNewTaxForm');
        cy.wait('@addNewTaxForm').its('response.statusCode').should('eq', 200);

        pageObj_AddNewTaxForm.formTitle().should('exist');

        if (formType != null) {
            pageObj_AddNewTaxForm.dropdown_FormType().click({force:true});
            cy.wait(1000);
            //cy.xpath("//li[@class='dx-menu-item-wrapper' and starts-with(., '" + formType + "')]").click({ force: true });
            pageObj_AddNewTaxForm.input_FormType_Selection(formType).click({ force: true });
            cy.log('Form Type ' + formType + ' is input.');
        }

        if (agent != null) {
            
            pageObj_AddNewTaxForm.dropdown_Agent().click(5,60, {force: true});
            cy.log("Dropdown Agent is clicked.");
            cy.wait(1000);
            cy.xpath("//div[@dx-select-box='modalOptions.CustomModelOptions.ctrlConfig.AgentSelectBox']//input[@role='combobox']").click({force: true});
            cy.log('Agent \''+agent+'\' is clicked.');
            cy.wait(1000);
        }

        
        pageObj_AddNewTaxForm.button_Save().click(5,60, {force: true});
        cy.intercept('POST', '/services/Client/GetClientsTaxReturnsForUser').as('afterClickSaveButtonInNewTaxForm');
        cy.wait('@afterClickSaveButtonInNewTaxForm').its('response.statusCode').should('eq', 200);
        cy.log('Save button is clicked.');
        

    }

    addNewTaxForm2122(clientRef, formType, agent) {
        cy.log('Start add Tax Form...');
        //cy.log(clientRef);
        this.searchClient(clientRef);

        //click the footer to disable the hint pop up
        cy.wait(2000);
        cy.xpath("//strong[starts-with(text(), 'Copyright')]").click({force:true});
        cy.wait(10000);

        cy.xpath("//tr[contains(., '" + clientRef + "')]//img[@title='Add New Tax Form']").eq(1).click({forec: true});
        cy.log('Add Tax Form button is clicked.');
        cy.intercept('GET', '/services/TaxForm/GetTaxFormStaticData?clientID**').as('addNewTaxForm');
        cy.wait('@addNewTaxForm').its('response.statusCode').should('eq', 200);

        pageObj_AddNewTaxForm.formTitle().should('exist');

        if (formType != null) {
            pageObj_AddNewTaxForm.dropdown_FormType().click({force:true});
            cy.wait(1000);
            cy.xpath("//li[@class='dx-menu-item-wrapper' and starts-with(., '"+formType+"')]").click({force:true});
            cy.log('Form Type ' + formType + ' is input.');

            //Tax Year 2021 to 2022 drop down
            cy.xpath("//input[@ngmodel='modalOptions.CustomModelOptions.Data.TaxForm.StartDateFormatted']").clear().type('01/7/2021');
            cy.wait(1000);
            cy.xpath("//input[@ngmodel='modalOptions.CustomModelOptions.Data.TaxForm.EndDateFormatted']").clear().type('30/6/2022');
        }
        
        pageObj_AddNewTaxForm.button_Save().click(5,60, {force: true});
        cy.intercept('POST', '/services/Client/GetClientsTaxReturnsForUser').as('afterClickSaveButtonInNewTaxForm');
        cy.log('Save button is clicked.');

    }

    //////////////// Edit Tax Return Form - IForm - Income - Salary and Wages  /////////////////

    displayTaxReturnForm(clientRef, formType) {
        
        this.searchClient(clientRef);
       // cy.intercept('POST', '/services/SbrPrepare/RunSbrValidation').as('afterClickTaxForm');
        cy.intercept('GET', '/app/features/').as('afterClickTaxForm');
        cy.wait(9000);
        cy.xpath("//tr[contains(.,'2022') and contains(.,'" + formType + "')]").children().eq('4').trigger('mouseover').click({force: true});
        //cy.log("Form Type '" + formType + "' is clicked.");
        //cy.wait('@afterClickTaxForm').its('response.statusCode').should('eq', 200);
        cy.xpath("//span[contains(text(),'" + clientRef + "')]").should('be.visible');
        cy.log("Client Ref '" + clientRef + "' Tax Return form is shown.");
        cy.wait(2000); 
    }

    TaxLodgementForms(clientRef, formType) {
        
        this.searchClient(clientRef);
       // cy.intercept('POST', '/services/SbrPrepare/RunSbrValidation').as('afterClickTaxForm');
        cy.intercept('GET', '/app/features/').as('afterClickTaxForm');
        cy.wait(9000);
        cy.xpath("(//div[contains(text(),'FBT')])[2]").click({force:true});
        
        //cy.get("input[value='Validate']").click({force:true});
        //cy.xpath("//input[@value='Validate']").click({force:true});

        //cy.xpath("//tr[contains(.,'2022') and contains(.,'I Form')]").children().eq('4').trigger('mouseover').click({force: true});
        //cy.log("Form Type '" + formType + "' is clicked.");
        //cy.wait('@afterClickTaxForm').its('response.statusCode').should('eq', 200);

        
        cy.xpath("//span[contains(text(),'" + clientRef + "')]").should('be.visible');
        cy.log("Client Ref '" + clientRef + "' Tax Return form is shown.");
        cy.wait(2000);
        
    }

    displayItemInTaxReturnForm(itemName) {

    }

    
    downloadAndValidatePrefillReport() {
        //Edit Tax Form is opened first
        cy.intercept('POST', '/services/Printing/ExportPrefillReportToPdf').as('downloadPrefillReport');
        cy.get('span.dx-menu-item-text').contains('Export').should('be.visible').click({force:true});
        cy.log('Menu - Export is clicked.');
        cy.wait(500);
        cy.get('span.dx-menu-item-text').contains('Prefill Report').click({force:true});
        cy.wait(500);
        cy.log('Menu - Prefill Report is clicked. Start downloading ...');
        //cy.wait('@downloadPrefillReport').its('response.statusCode').should('eq', 200);

        cy.readFile('cypress/downloads/cy000001 - 2021 I Form (Prefill).pdf').should((text) => {
            cy.log(text);
            /*cy.log(JSON.stringify(text));
            should('contain', "PDF-1.4");*/
        });

        //cy.getPdfContent();
        //this.getPdfContent();
    }

    getPdfContent() {
        const fs = require('fs');
        const pdf = require('pdf-parse');

        var path = require('path');
        path.normalize('test1.pdf');

        let dataBuffer = fs.readFileSync('test1.pdf');

        pdf(dataBuffer).then(function (data) {

            // number of pages
            console.log(data.numpages);
            // number of rendered pages
            console.log(data.numrender);
            // PDF info
            console.log(data.info);
            // PDF metadata
            console.log(data.metadata);
            // PDF.js version
            // check https://mozilla.github.io/pdf.js/getting_started/
            console.log(data.version);
            // PDF text
            console.log(data.text);

        });
    }
    
    checkIfEleExists(ele){
        return new Promise((resolve,reject)=>{
            /// here if  ele exists or not
            cy.get('body').find( ele ).its('length').then(res=>{
                if(res > 0){
                    //// do task that you want to perform
                    cy.get(ele).wait(2000);
                    resolve();
                }else{
                    reject();
                }
            });
        })
    }
    
    saveDataEntry() {
        //This funciton only execute when Button is in 'Save' status.
                cy.get('label#TaxReturnSaveStatusPopoverLabel').then((element) => {
                    //expect(element.text()).to.equal('foo');
                    let buttonText = element.text();
                    cy.log(element.text());
                    cy.log('Button is existing.');

                    //cy.intercept('POST', '/services/SbrPrepare/RunSbrValidation').as('dataSaving');
                    //cy.intercept('POST', '/services/SbrPrepare/RunSbrValidation').as('validate');
                    if (buttonText == 'Save') {
                        cy.get('#TaxReturnSaveStatusPopoverLabel').click({force:true});
                        cy.log("Save button is clicked.");
                        cy.xpath("//div[@class='HsSaveStatus']").click({ force: true });
                       // cy.wait('@dataSaving').its('response.statusCode').should('eq', 200);

                    } else if (buttonText == 'Saving...') {
                        //cy.wait('@dataSaving').its('response.statusCode').should('eq', 200);
                        cy.log('Saving in progress. Wait for 2 seconds...');
                        cy.xpath("//div[@class='HsSaveStatus']").click({ force: true });
                        cy.wait(2000);
                    } else if (buttonText == 'Saved') { 
                        cy.log("Saved. No update.");
                        cy.xpath("//div[@class='HsSaveStatus']").click({ force: true });
                    } else {
                        cy.log("Button Text is missing.");
                        cy.get('#TaxReturnSaveStatusPopoverLabel').click({force: true});
                        cy.xpath("//div[@class='HsSaveStatus']").click({ force: true });
                            
                    }
                    })

           
        //cy.xpath("//span[contains(strong, 'Copyright')]").click({ waitForAnimations: false });
    }





    editTaxReturn_CForm_Income_SalaryOrWages(occupation, occupationCode, payerABN, payerName, taxWithheld, grossPay, rowNumber) {

        //Go to 1 Salary or Wages section first
        if ((rowNumber==0)||(rowNumber==null)) {
            
            pageObj_CForm_EditTaxReturn_controls.textBox_IForm_Searchbox().focus().clear();
            pageObj_CForm_EditTaxReturn_controls.textBox_IForm_Searchbox().type('1 Salary or wages{enter}');
            cy.wait(1000);
            pageObj_CForm_EditTaxReturn_controls.textBox_IForm_Searchbox().type('{enter}');
            cy.log('Type 1 Salary or wages and press Enter');
            cy.wait(longwait);
            cy.xpath("//div[@class='ItemDesc ng-binding ui-draggable ui-draggable-handle' and contains(text(), '1 Salary or wages')]").click({force:true});

        }

        //this.saveDataEntry();

        if (occupation != null) {
            cy.wait(1000);
            pageObj_IFormIncome.textBox_IFrom_Income_Occupation().focus().clear();
            pageObj_IFormIncome.textBox_IFrom_Income_Occupation().click({force:true});
            cy.wait(500);
            pageObj_IFormIncome.textBox_IFrom_Income_Occupation().type(occupation, { delay: 200 }, { force: true });
            cy.log('Occuption \'' + occupation + '\' is input.');
            cy.wait(5000);
            pageObj_IFormIncome.textBox_IFrom_Income_Occupation().tab();
            cy.wait(1000);
            //this.saveDataEntry();
        }

        if (occupationCode != null) {
            cy.wait(1000);
            pageObj_IFormIncome.textBox_OccupationCode().focus().clear();
            pageObj_IFormIncome.textBox_OccupationCode().click({force:true});
            cy.wait(4500);
            pageObj_IFormIncome.textBox_OccupationCode().type(occupationCode, { force: true });
            //pageObj_IFormIncome.textBox_OccupationCode().tab();

            pageObj_IFormIncome.textBox_OccupationCode().focus().clear();
            pageObj_IFormIncome.textBox_OccupationCode().click({ force: true });
            cy.wait(4500);
            pageObj_IFormIncome.textBox_OccupationCode().type(occupationCode, { force: true });
            //pageObj_IFormIncome.textBox_OccupationCode().tab();
            cy.wait(1000);
            //this.saveDataEntry();
        }

        ///////////////

        if (payerABN != null) {
            cy.wait(1000);
            pageObj_IFormIncome.textBox_IForm_Income_PayerABN(rowNumber).focus().clear();
            pageObj_IFormIncome.textBox_IForm_Income_PayerABN(rowNumber).click({force:true});
            cy.wait(2500);
            pageObj_IFormIncome.textBox_IForm_Income_PayerABN(rowNumber).type(payerABN, { force: true });
            pageObj_IFormIncome.textBox_IForm_Income_PayerABN(rowNumber).tab();
            cy.log('Payer ABN \'' + payerABN + '\' is input.');
            cy.wait(1000);
            //this.saveDataEntry();
        }

        if (payerName != null) {
            cy.wait(1000);
            pageObj_IFormIncome.textBox_IForm_Income_PayerName(rowNumber).focus().clear();
            pageObj_IFormIncome.textBox_IForm_Income_PayerName(rowNumber).click({force:true});
            cy.wait(2500);
            pageObj_IFormIncome.textBox_IForm_Income_PayerName(rowNumber).type(payerName, { force: true });
            pageObj_IFormIncome.textBox_IForm_Income_PayerName(rowNumber).tab();
            cy.log('Payer Name \'' + payerName + '\' is input.');
            cy.wait(1000);
            //this.saveDataEntry();
        }

        if (taxWithheld != null) {
            cy.wait(1000);
            pageObj_IFormIncome.textBox_IForm_Income_TaxWithHeld(rowNumber).focus().clear();
            pageObj_IFormIncome.textBox_IForm_Income_TaxWithHeld(rowNumber).click({force:true});
            cy.wait(2500);
            pageObj_IFormIncome.textBox_IForm_Income_TaxWithHeld(rowNumber).type(taxWithheld, { force: true });
            pageObj_IFormIncome.textBox_IForm_Income_TaxWithHeld(rowNumber).tab();
            cy.log('Tax Withheld \'' + taxWithheld + '\' is input.');
            cy.wait(1000);
            //this.saveDataEntry();
        }

        if (grossPay != null) {
            cy.wait(1000);
            pageObj_IFormIncome.textBox_IForm_Income_GrossPay(rowNumber).focus().clear();
            pageObj_IFormIncome.textBox_IForm_Income_GrossPay(rowNumber).click({force:true});
            cy.wait(500);
            pageObj_IFormIncome.textBox_IForm_Income_GrossPay(rowNumber).type(grossPay, { force: true });
            pageObj_IFormIncome.textBox_IForm_Income_GrossPay(rowNumber).tab();
            cy.log('Gross Pay \'' + grossPay + '\' is input.');
            cy.wait(1000);
            //this.saveDataEntry();
        }

        cy.wait(30000);
        //this.saveDataEntry();
        cy.intercept('POST', '/services/SbrPrepare/RunSbrValidation').as('validate');
        pageObj_IFormIncome.button_validate().click({ force: true });        
        cy.wait('@validate').its('response.statusCode').should('eq', 200);
    }

     //////

    editTaxReturn_IForm_Income_SalaryOrWages(occupation, occupationCode, payerABN, payerName, taxWithheld, grossPay, rowNumber) {

        //Go to 1 Salary or Wages section first
        if ((rowNumber == 0) || (rowNumber == null)) {

            pageObj_IFormIncome.textBox_IForm_Searchbox().focus().clear();
            pageObj_IFormIncome.textBox_IForm_Searchbox().type('1 Salary or wages{enter}');
            cy.wait(1000);
            pageObj_IFormIncome.textBox_IForm_Searchbox().type('{enter}');
            cy.log('Type 1 Salary or wages and press Enter');
            cy.wait(longwait);
            cy.xpath("//div[@class='ItemDesc ng-binding ui-draggable ui-draggable-handle' and contains(text(), '1 Salary or wages')]").click({ force: true });

        }

        //this.saveDataEntry();

        if (occupation != null) {
            cy.wait(1000);
            pageObj_IFormIncome.textBox_IFrom_Income_Occupation().focus().clear();
            pageObj_IFormIncome.textBox_IFrom_Income_Occupation().click({ force: true });
            cy.wait(500);
            pageObj_IFormIncome.textBox_IFrom_Income_Occupation().type(occupation, { delay: 200 }, { force: true });
            cy.log('Occuption \'' + occupation + '\' is input.');
            cy.wait(5000);
            pageObj_IFormIncome.textBox_IFrom_Income_Occupation().tab();
            cy.wait(1000);
            //this.saveDataEntry();
        }

        if (occupationCode != null) {
            cy.wait(1000);
            pageObj_IFormIncome.textBox_OccupationCode().focus().clear();
            pageObj_IFormIncome.textBox_OccupationCode().click({ force: true });
            cy.wait(4500);
            pageObj_IFormIncome.textBox_OccupationCode().type(occupationCode, { force: true });
            //pageObj_IFormIncome.textBox_OccupationCode().tab();

            pageObj_IFormIncome.textBox_OccupationCode().focus().clear();
            pageObj_IFormIncome.textBox_OccupationCode().click({ force: true });
            cy.wait(4500);
            pageObj_IFormIncome.textBox_OccupationCode().type(occupationCode, { force: true });
            //pageObj_IFormIncome.textBox_OccupationCode().tab();
            cy.wait(1000);
            //this.saveDataEntry();
        }

        ///////////////

        if (payerABN != null) {
            cy.wait(1000);
            pageObj_IFormIncome.textBox_IForm_Income_PayerABN(rowNumber).focus().clear();
            pageObj_IFormIncome.textBox_IForm_Income_PayerABN(rowNumber).click({ force: true });
            cy.wait(2500);
            pageObj_IFormIncome.textBox_IForm_Income_PayerABN(rowNumber).type(payerABN, { force: true });
            pageObj_IFormIncome.textBox_IForm_Income_PayerABN(rowNumber).tab();
            cy.log('Payer ABN \'' + payerABN + '\' is input.');
            cy.wait(1000);
            //this.saveDataEntry();
        }

        if (payerName != null) {
            cy.wait(1000);
            pageObj_IFormIncome.textBox_IForm_Income_PayerName(rowNumber).focus().clear();
            pageObj_IFormIncome.textBox_IForm_Income_PayerName(rowNumber).click({ force: true });
            cy.wait(2500);
            pageObj_IFormIncome.textBox_IForm_Income_PayerName(rowNumber).type(payerName, { force: true });
            pageObj_IFormIncome.textBox_IForm_Income_PayerName(rowNumber).tab();
            cy.log('Payer Name \'' + payerName + '\' is input.');
            cy.wait(1000);
            //this.saveDataEntry();
        }

        if (taxWithheld != null) {
            cy.wait(1000);
            pageObj_IFormIncome.textBox_IForm_Income_TaxWithHeld(rowNumber).focus().clear();
            pageObj_IFormIncome.textBox_IForm_Income_TaxWithHeld(rowNumber).click({ force: true });
            cy.wait(2500);
            pageObj_IFormIncome.textBox_IForm_Income_TaxWithHeld(rowNumber).type(taxWithheld, { force: true });
            pageObj_IFormIncome.textBox_IForm_Income_TaxWithHeld(rowNumber).tab();
            cy.log('Tax Withheld \'' + taxWithheld + '\' is input.');
            cy.wait(1000);
            //this.saveDataEntry();
        }

        if (grossPay != null) {
            cy.wait(1000);
            pageObj_IFormIncome.textBox_IForm_Income_GrossPay(rowNumber).focus().clear();
            pageObj_IFormIncome.textBox_IForm_Income_GrossPay(rowNumber).click({ force: true });
            cy.wait(500);
            pageObj_IFormIncome.textBox_IForm_Income_GrossPay(rowNumber).type(grossPay, { force: true });
            pageObj_IFormIncome.textBox_IForm_Income_GrossPay(rowNumber).tab();
            cy.log('Gross Pay \'' + grossPay + '\' is input.');
            cy.wait(1000);
            //this.saveDataEntry();
        }

        cy.wait(30000);
        //this.saveDataEntry();
        cy.intercept('POST', '/services/SbrPrepare/RunSbrValidation').as('validate');
        pageObj_IFormIncome.button_validate().click({ force: true });
        cy.wait('@validate').its('response.statusCode').should('eq', 200);
    }

    //////////////// Edit Tax Return Form - IForm - Income - SuperLumpSumSchedule /////////////////

    //editTaxReturn_IForm_Income_SuperLumpSumSchedule(superLumpSumSchedule_PaymentDate, superLumpSumSchedule_TaxWithheld, superLumpSumSchedule_TaxedComponent_TaxedElement, superLumpSumSchedule_TaxedComponent_UntaxedElement, superLumpSumSchedule_TaxableComponent_TaxFreeComponent, superLumpSumSchedule_DeathBenefit, superLumpSumSchedule_PayerABN, superLumpSumSchedule_PayerName, superLumpSumSchedule_LowRateAmountsInPriorYears, superLumpSumSchedule_CapAmountRemainingAtYearStart, superLumpSumSchedule_PriorYearPaymentDetails_ForUntaxedElements_Name, superLumpSumSchedule_PriorYearPaymentDetails_ABN, superLumpSumSchedule_PriorYearPaymentDetails_AmountsReceivedWithinUntaxedPlanCap, superLumpSumSchedule_PriorYearPaymentDetails_UntaxedPlanCapRemainingForThisABN, superLumpSumSchedule_ContactPerson, superLumpSumSchedule_ContactNumberAreaCode, superLumpSumSchedule_ContactNumber, rowNumber) {
    editTaxReturn_IForm_Income_SuperLumpSumSchedule(superLumpSumSchedule_PaymentDate, superLumpSumSchedule_TaxWithheld, superLumpSumSchedule_TaxedComponent_TaxedElement, superLumpSumSchedule_TaxedComponent_UntaxedElement, superLumpSumSchedule_TaxableComponent_TaxFreeComponent, superLumpSumSchedule_DeathBenefit, superLumpSumSchedule_PayerABN, superLumpSumSchedule_PayerName, superLumpSumSchedule_ContactPerson, superLumpSumSchedule_ContactNumberAreaCode, superLumpSumSchedule_ContactNumber, rowNumber) {
        //Go to IForm - Income - Super Lump Sum Schedule section first
        if ((rowNumber == 0) || (rowNumber == null)) {

            cy.intercept('GET', '/app/features/tax2021/fIForm/fIForm_ded_hdr*').as('afterSelectAustraliaSuper');
            pageObj_IFormIncome.textBox_IForm_Searchbox().focus().clear();
            pageObj_IFormIncome.textBox_IForm_Searchbox().click({force:true});
            pageObj_IFormIncome.textBox_IForm_Searchbox().type('8 Australian super');
            cy.wait(1000);
            pageObj_IFormIncome.textBox_IForm_Searchbox().type('{enter}');
            cy.log('Australian superannuation lump sum payments is input.');
            //cy.wait(longwait);
            //cy.wait('@afterSelectAustraliaSuper').its('response.statusCode').should('eq', 200);
            //cy.xpath("//div[@class='ItemDesc ng-binding ui-draggable ui-draggable-handle' and contains(text(), 'Australian superannuation lump sum payments')]").click({ force: true });
            cy.xpath("//div[@class='HsLabel' and contains(.,'Australian superannuation lump sum payments')]").click();
            cy.wait(1000);
            cy.log('The Link Australian superannuation lump sum payments is clicked.');
        }

        //click Super Lump Sum Schedule panel
        cy.get('div[name=Item_superpmt]').click({ force: true });
        cy.wait(3000);
        cy.log('Super Lump Sum Schedule panle is clicked.');

        cy.get('input[value=Yes]').click({force:true});
        cy.wait(1000);
        cy.log('Yes button is clicked.');
        cy.xpath("//div[@class='HsLabel' and text()='Superannuation lump sum schedule']").should('be.visible');
        //this.saveDataEntry();

        if (superLumpSumSchedule_PaymentDate != null) {
            cy.wait(1000);
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_paymentDate(rowNumber).focus().clear();
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_paymentDate(rowNumber).click({force:true});
            cy.wait(4500);
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_paymentDate(rowNumber).click({ force: true }).type(superLumpSumSchedule_PaymentDate, { delay: 200 },{ force: true });
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_paymentDate(rowNumber).tab();
            cy.log('Super Lump Sum Schedule Payment Date \'' + superLumpSumSchedule_PaymentDate + '\' is input.');
            cy.wait(1000);
            //this.saveDataEntry();
        }

        if (superLumpSumSchedule_TaxWithheld != null) {
            cy.wait(1000);
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_TaxWithheld(rowNumber).focus().clear();
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_TaxWithheld(rowNumber).click({force:true});
            cy.wait(500);
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_TaxWithheld(rowNumber).type(superLumpSumSchedule_TaxWithheld, { force: true });
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_TaxWithheld(rowNumber).tab();
            cy.log('Super Lump Sum Schedule Tax Withheld \'' + superLumpSumSchedule_TaxWithheld + '\' is input.');
            cy.wait(1000);
            //this.saveDataEntry();
        }

        if (superLumpSumSchedule_TaxedComponent_TaxedElement != null) {
            cy.wait(1000);
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_TaxableComponent_TaxedElement(rowNumber).focus().clear();
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_TaxableComponent_TaxedElement(rowNumber).click({force:true});
            cy.wait(500);
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_TaxableComponent_TaxedElement(rowNumber).type(superLumpSumSchedule_TaxedComponent_TaxedElement, { force: true });
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_TaxableComponent_TaxedElement(rowNumber).tab();
            cy.log('Super Lump Sum Schedule - Taxed Component - Taxed Element \'' + superLumpSumSchedule_TaxedComponent_TaxedElement + '\' is input.');
            cy.wait(1000);
            //this.saveDataEntry();
        }

        if (superLumpSumSchedule_TaxedComponent_UntaxedElement != null) {
            cy.wait(1000);
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_TaxableComponent_UntaxedElement(rowNumber).focus().clear();
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_TaxableComponent_UntaxedElement(rowNumber).click({force:true});
            cy.wait(500);
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_TaxableComponent_UntaxedElement(rowNumber).type(superLumpSumSchedule_TaxedComponent_UntaxedElement, { force: true });
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_TaxableComponent_UntaxedElement(rowNumber).tab();
            cy.log('Super Lump Sum Schedule - Taxed Component - Untaxed Element \'' + superLumpSumSchedule_TaxedComponent_UntaxedElement + '\' is input.');
            cy.wait(1000);
            //this.saveDataEntry();
        }

        if (superLumpSumSchedule_TaxableComponent_TaxFreeComponent != null) {
            cy.wait(1000);
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_TaxFreeComponent(rowNumber).focus().clear();
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_TaxFreeComponent(rowNumber).click({force:true});
            cy.wait(500);
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_TaxFreeComponent(rowNumber).type(superLumpSumSchedule_TaxableComponent_TaxFreeComponent, { force: true });
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_TaxFreeComponent(rowNumber).tab();
            cy.log('Super Lump Sum Schedule - Taxed Component - Tax Free Component \'' + superLumpSumSchedule_TaxableComponent_TaxFreeComponent + '\' is input.');
            cy.wait(1000);
            //this.saveDataEntry();
        }

        if (superLumpSumSchedule_DeathBenefit != null) {
            cy.wait(1000);
            pageObj_IFormIncome.selectElement_IForm_Income_8SuperLumpSumSchedule_IsDeathBenefit(rowNumber).focus().select(superLumpSumSchedule_DeathBenefit);
            cy.log('Super Lump Sum Schedule - Death Benefit \'' + superLumpSumSchedule_DeathBenefit + '\' is selected.');
            pageObj_IFormIncome.selectElement_IForm_Income_8SuperLumpSumSchedule_IsDeathBenefit(rowNumber).tab();
            cy.wait(1000);
            //this.saveDataEntry();
        }

        if (superLumpSumSchedule_PayerABN != null) {
            cy.wait(1000);
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_PayerABN(rowNumber).focus().clear();
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_PayerABN(rowNumber).click({force:true});
            cy.wait(500);
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_PayerABN(rowNumber).type(superLumpSumSchedule_PayerABN, { force: true });
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_PayerABN(rowNumber).tab();
            cy.log('Super Lump Sum Schedule - Payer ABN \'' + superLumpSumSchedule_PayerABN + '\' is input.');
            cy.wait(1000);
            //this.saveDataEntry();
        }

        if (superLumpSumSchedule_PayerName != null) {
            cy.wait(1000);
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_PayerName(rowNumber).focus().clear();
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_PayerName(rowNumber).click({force:true});
            cy.wait(500);
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_PayerName(rowNumber).type(superLumpSumSchedule_PayerName, { force: true });
            pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_PayerName(rowNumber).tab();
            cy.log('Super Lump Sum Schedule - Payer Name \'' + superLumpSumSchedule_PayerName + '\' is input.');
            cy.wait(1000);
            //this.saveDataEntry();
        }

        ////////////////////

        if (superLumpSumSchedule_ContactPerson != null) {
            cy.wait(1000);
            pageObj_IFormIncome.textBox_IForm_Income_8SuperLumpSumSchedule_ContactPerson().focus().clear();
            pageObj_IFormIncome.textBox_IForm_Income_8SuperLumpSumSchedule_ContactPerson().click({force:true});
            cy.wait(500);
            pageObj_IFormIncome.textBox_IForm_Income_8SuperLumpSumSchedule_ContactPerson().type(superLumpSumSchedule_ContactPerson, { force: true });
            pageObj_IFormIncome.textBox_IForm_Income_8SuperLumpSumSchedule_ContactPerson().tab();
            cy.log('Super Lump Sum Schedule - Contact Person \'' + superLumpSumSchedule_ContactPerson + '\' is input.');
            cy.wait(1000);
            //this.saveDataEntry();
        }


        if(superLumpSumSchedule_ContactNumberAreaCode != null) {
            cy.wait(1000);
            pageObj_IFormIncome.textBox_IForm_Income_8SuperLumpSumSchedule_ContactNumberAreaCode().focus().clear();
            pageObj_IFormIncome.textBox_IForm_Income_8SuperLumpSumSchedule_ContactNumberAreaCode().click({force:true});
            cy.wait(500);
            pageObj_IFormIncome.textBox_IForm_Income_8SuperLumpSumSchedule_ContactNumberAreaCode().type(superLumpSumSchedule_ContactNumberAreaCode, { force: true });
            pageObj_IFormIncome.textBox_IForm_Income_8SuperLumpSumSchedule_ContactNumberAreaCode().tab();
            cy.log('Super Lump Sum Schedule - Contact Number Area Code \'' + superLumpSumSchedule_ContactNumberAreaCode + '\' is input.');
            cy.wait(1000);
            //this.saveDataEntry();
        }

        if (superLumpSumSchedule_ContactNumber != null) {
            cy.wait(1000);
            pageObj_IFormIncome.textBox_IForm_Income_8SuperLumpSumSchedule_ContactNumber().focus().clear();
            pageObj_IFormIncome.textBox_IForm_Income_8SuperLumpSumSchedule_ContactNumber().click({force:true});
            cy.wait(500);
            pageObj_IFormIncome.textBox_IForm_Income_8SuperLumpSumSchedule_ContactNumber().type(superLumpSumSchedule_ContactNumber, { force: true });
            pageObj_IFormIncome.textBox_IForm_Income_8SuperLumpSumSchedule_ContactNumber().tab();
            cy.log('Super Lump Sum Schedule - Contact Number  \'' + superLumpSumSchedule_ContactNumber + '\' is input.');
            cy.wait(1000);
            //this.saveDataEntry();
        }

        pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_lowRateamountPriorYears().focus().clear();
        pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_lowRateamountPriorYears().click({ force: true });
        pageObj_IFormIncome.textbox_IForm_Income_8SuperLumpSumSchedule_lowRateamountPriorYears().type("0");
        cy.wait(500);

        pageObj_IFormIncome.textbox_IForm_Income_AmountReceivedWithinuntaxed_PlanCap(rowNumber).focus().clear();
        pageObj_IFormIncome.textbox_IForm_Income_AmountReceivedWithinuntaxed_PlanCap(rowNumber).click({ force: true });
        pageObj_IFormIncome.textbox_IForm_Income_AmountReceivedWithinuntaxed_PlanCap(rowNumber).type("0", { force: true });
        pageObj_IFormIncome.text_abn_untaxed(rowNumber).type(superLumpSumSchedule_PayerABN, { force: true });
        cy.wait(30000);
        cy.intercept('POST', '/services/SbrPrepare/RunSbrValidation').as('validate');
        pageObj_IFormIncome.button_validate().click({ force: true });
        //cy.intercept('POST', '/services/SbrPrepare/RunSbrValidation').as('validate');
        cy.wait('@validate').its('response.statusCode').should('eq', 200);

        //cy.wait(1000);
        //this.saveDataEntry();

    }


    //////////////// Edit Tax Return Form - IForm - Income - Gross Interest  /////////////////

    //editTaxReturn_IForm_Income_GrossInterest(bank, branch, accountNumber, accountHolder, foreignCountryCodeIfNotAus, isBusinessInterestIncome, tfnAmountWithheldTotal, tfnAmountWithheldYourShare, grossInterestTotal, groassInterestyourShare, rowNumber) {
    editTaxReturn_IForm_Income_GrossInterest(bank, branch, accountNumber, accountHolder, tfnAmountWithheldTotal, tfnAmountWithheldYourShare, grossInterest, grossInterestYourShare, rowNumber) {
        //Go to IForm - Income - Gross Interest section first
        if ((rowNumber == 0) || (rowNumber == null)) {

            cy.xpath("//div[contains(text(),'Cover')]").click({force:true});
            cy.log("Item Cover is clicked once.");
            cy.wait(longwait);

            cy.xpath("//div[contains(text(),'Cover')]").click({force:true});
            cy.log("Item Cover is clicked the second time.");
            cy.wait(longwait);

            cy.xpath("//div[contains(text(), 'Main form')]").click()
            cy.log("Main Form is clicked.");
            cy.wait(longwait);

            pageObj_IFormIncome.textBox_IForm_Searchbox().clear();

            cy.intercept('GET', '/app/features/tax2021/fIForm/fIForm_ded_hdr*').as('afterSelectGrossInterest');
            pageObj_IFormIncome.textBox_IForm_Searchbox().type('10 Gross interest');
            cy.wait(1000);
            pageObj_IFormIncome.textBox_IForm_Searchbox().type('{enter}');
            cy.log('10 Gross interest is input.');
            //cy.wait('@afterSelectGrossInterest').its('response.statusCode').should('eq', 200);
            cy.wait(longwait);
            cy.xpath("//div[@class='ItemDesc ng-binding ui-draggable ui-draggable-handle' and contains(text(), 'Gross interest')]").click({force:true});
            cy.wait(1000);
            cy.log('The Link Gross Interest is clicked.');
            

        }

        cy.xpath("//div[@class='HsLabel' and text()='Gross interest']").should('be.visible');
        //this.saveDataEntry();

        if (bank != null) {
            cy.wait(1000);
            pageObj_IFormIncome.text_IForm_Income_GrossInterest_Bank(rowNumber).focus().clear();
            pageObj_IFormIncome.text_IForm_Income_GrossInterest_Bank(rowNumber).click({force:true});
            cy.wait(500);
            pageObj_IFormIncome.text_IForm_Income_GrossInterest_Bank(rowNumber).type(bank, { force: true });
            pageObj_IFormIncome.text_IForm_Income_GrossInterest_Bank(rowNumber).tab();
            cy.log('Bank \'' + bank + '\' is input.');
            cy.wait(1000);
            //this.saveDataEntry();
        }

        if (branch != null) {
            cy.wait(1000);
            pageObj_IFormIncome.text_IForm_Income_GrossInterest_Branch(rowNumber).focus().clear();
            pageObj_IFormIncome.text_IForm_Income_GrossInterest_Branch(rowNumber).click({force:true});
            cy.wait(500);
            pageObj_IFormIncome.text_IForm_Income_GrossInterest_Branch(rowNumber).type(branch, { force: true });
            pageObj_IFormIncome.text_IForm_Income_GrossInterest_Branch(rowNumber).tab();
            cy.log('Branch \'' + branch + '\' is input.');
            cy.wait(1000);
            //this.saveDataEntry();
        }

        if (accountNumber != null) {
            cy.wait(1000);
            pageObj_IFormIncome.text_IForm_Income_GrossInterest_AccountNumber(rowNumber).focus().clear();
            pageObj_IFormIncome.text_IForm_Income_GrossInterest_AccountNumber(rowNumber).click({force:true});
            cy.wait(500);
            pageObj_IFormIncome.text_IForm_Income_GrossInterest_AccountNumber(rowNumber).type(accountNumber, { force: true });
            pageObj_IFormIncome.text_IForm_Income_GrossInterest_AccountNumber(rowNumber).tab();
            cy.log('Account Number \'' + accountNumber + '\' is input.');
            cy.wait(1000);
            //this.saveDataEntry();
        }

        if (accountHolder != null) {
            cy.wait(1000);
            pageObj_IFormIncome.text_IForm_Income_GrossInterest_AccountHolder(rowNumber).focus().clear();
            pageObj_IFormIncome.text_IForm_Income_GrossInterest_AccountHolder(rowNumber).click({force:true});
            cy.wait(500);
            pageObj_IFormIncome.text_IForm_Income_GrossInterest_AccountHolder(rowNumber).type(accountHolder, { force: true });
            pageObj_IFormIncome.text_IForm_Income_GrossInterest_AccountHolder(rowNumber).tab();
            cy.log('Account Holder \'' + accountHolder + '\' is input.');
            cy.wait(1000);
            //this.saveDataEntry();
        }
        

        if (tfnAmountWithheldTotal != null) {
            cy.wait(1000);
            pageObj_IFormIncome.textbox_IForm_Income_GrossInterest_TFNWithholdTotal(rowNumber).focus().clear();
            pageObj_IFormIncome.textbox_IForm_Income_GrossInterest_TFNWithholdTotal(rowNumber).click({force:true});
            cy.wait(500);
            pageObj_IFormIncome.textbox_IForm_Income_GrossInterest_TFNWithholdTotal(rowNumber).type(tfnAmountWithheldTotal, { force: true });
            pageObj_IFormIncome.textbox_IForm_Income_GrossInterest_TFNWithholdTotal(rowNumber).tab();
            cy.log('TFN Amount Withheld Total  \'' + tfnAmountWithheldTotal + '\' is input.');
            cy.wait(1000);
            //this.saveDataEntry();
        }

        if (tfnAmountWithheldYourShare != null) {
            if (tfnAmountWithheldYourShare.length > 0) {
                cy.wait(1000);
                pageObj_IFormIncome.textbox_IForm_Income_GrossInterest_TFNWithholdYourShare(rowNumber).focus().clear();
                pageObj_IFormIncome.textbox_IForm_Income_GrossInterest_TFNWithholdYourShare(rowNumber).click({force:true});
                cy.wait(500);
                pageObj_IFormIncome.textbox_IForm_Income_GrossInterest_TFNWithholdYourShare(rowNumber).type(tfnAmountWithheldYourShare, { force: true });
                pageObj_IFormIncome.textbox_IForm_Income_GrossInterest_TFNWithholdYourShare(rowNumber).tab();
                cy.log('TFN Amount Withheld Your Share  \'' + tfnAmountWithheldYourShare + '\' is input.');
                cy.wait(1000);
                //this.saveDataEntry();
            }
            
        }        

        if (grossInterestYourShare != null) {
            if (grossInterestYourShare.length > 0) {
                cy.wait(1000);
                pageObj_IFormIncome.textbox_IForm_Income_GrossInterest_GrossInterestYourShare(rowNumber).focus().clear();
                pageObj_IFormIncome.textbox_IForm_Income_GrossInterest_GrossInterestYourShare(rowNumber).click({force:true});
                cy.wait(500);
                pageObj_IFormIncome.textbox_IForm_Income_GrossInterest_GrossInterestYourShare(rowNumber).type(grossInterestYourShare, { force: true });
                pageObj_IFormIncome.textbox_IForm_Income_GrossInterest_GrossInterestYourShare(rowNumber).tab();
                cy.log('Gross Interest Your Share \'' + grossInterestYourShare + '\' is input.');
                cy.wait(1000);
                //this.saveDataEntry();
            }
        }

        if (grossInterest != null) {
            cy.wait(1000);
            pageObj_IFormIncome.textbox_IForm_Income_GrossInterest_GrossInterestTotal(rowNumber).focus().clear();
            pageObj_IFormIncome.textbox_IForm_Income_GrossInterest_GrossInterestTotal(rowNumber).click({ force: true });
            cy.wait(500);
            pageObj_IFormIncome.textbox_IForm_Income_GrossInterest_GrossInterestTotal(rowNumber).type(grossInterest, { delay: 200 },{ force: true });
            //pageObj_IFormIncome.textbox_IForm_Income_GrossInterest_GrossInterestTotal(rowNumber).tab({ shift: true }).tab().clear().type(grossInterest, { force: true }).tab();
            //pageObj_IFormIncome.label_IForm_Income_GrossInterest(1).click();
            cy.log('Gross Interest  \'' + grossInterest + '\' is input.');
            //cy.wait(1000);
            //pageObj_IFormIncome.textbox_IForm_Income_GrossInterest_GrossInterestTotal(rowNumber).focus().clear().type(grossInterest, { force: true });
            //pageObj_IFormIncome.textbox_IForm_Income_GrossInterest_GrossInterestTotal(rowNumber).tab({ force: true });
            cy.wait(1000);
            pageObj_IFormIncome.textbox_IForm_Income_GrossInterest_GrossInterestYourShare(rowNumber).dblclick();
            
            cy.wait(1000);
            //this.saveDataEntry();
        }
        cy.wait(30000);
        //cy.xpath("//div/label[@id='TaxReturnSaveStatusPopoverLabel']").trigger('mouseover').click({ force: true });
        cy.intercept('POST', '/services/SbrPrepare/RunSbrValidation').as('validate');
        pageObj_IFormIncome.button_validate().click({ force: true });
        //cy.intercept('POST', '/services/SbrPrepare/RunSbrValidation').as('validate');
        cy.wait('@validate').its('response.statusCode').should('eq', 200);
        //cy.wait(30000);
        //this.saveDataEntry();
    }

    //////////////// Edit Tax Return Form - IForm - Deduction - Work Related Car Expense /////////////////

    editTaxReturn_IForm_Deduction_WorkRelatedCarExpense(carExpenseDescription, carExpenseActionCode, carExpenseKm, businessPercentageBeingClaimed, declineInValueAmount, otherAmountToClaim, rowNumber) {
        //Open IForm and display D1 Work related car expenses first
        if ((rowNumber == 0) || (rowNumber == null)) {

            cy.xpath("//div[contains(text(),'Cover')]").click({force:true});
            cy.log("Item Cover is clicked once.");
            cy.wait(longwait);

            cy.xpath("//div[contains(text(),'Cover')]").click({force: true});
            cy.log("Item Cover is clicked the second time.");
            cy.wait(longwait);

            cy.xpath("//div[contains(text(), 'Main form')]").click({force: true})
            cy.log("Main Form is clicked.");
            cy.wait(longwait);

            cy.intercept('GET', '/app/features/tax2021/fIForm/fIForm_i_agents*').as('afterSelectCarExpense')
            pageObj_IFormIncome.textBox_IForm_Searchbox().clear();
            pageObj_IFormIncome.textBox_IForm_Searchbox().type('D1 Work related car expenses');
            cy.wait(1000);
            pageObj_IFormIncome.textBox_IForm_Searchbox().type('{enter}');
            cy.log('D1 Work related car expenses is input.');
            //cy.wait('@afterSelectCarExpense').its('response.statusCode').should('eq', 200);
            //cy.wait(10000);

            cy.xpath("//div[@class='ItemDesc ng-binding ui-draggable ui-draggable-handle' and contains(text(), 'Work related car expenses')]").click({ force: true });
            cy.wait(1000);
            cy.log('D1 Work related car expenses is clicked.');
            //this.saveDataEntry();

            if (carExpenseDescription != null) {
                cy.wait(1000);
                pageObj_IFormDeduction.textbox_IForm_Deductions_CarExpenseDescription(rowNumber).focus().clear();
                pageObj_IFormDeduction.textbox_IForm_Deductions_CarExpenseDescription(rowNumber).click({force:true});
                cy.wait(500);
                pageObj_IFormDeduction.textbox_IForm_Deductions_CarExpenseDescription(rowNumber).type(carExpenseDescription, { delay: 200 },{ force: true });
                pageObj_IFormDeduction.textbox_IForm_Deductions_CarExpenseDescription(rowNumber).tab();
                cy.log('Car Expense Description \'' + carExpenseDescription + '\' is input.');
                cy.wait(1000);                
            }

            if (carExpenseActionCode != null) {
                cy.wait(1000);
                pageObj_IFormDeduction.select_IForm_Deductions_CarExpenseActionCode(rowNumber).focus().select(carExpenseActionCode, {force:true});
                cy.log('Car Expense Action Code \'' + carExpenseActionCode + '\' is select.');
                pageObj_IFormDeduction.select_IForm_Deductions_CarExpenseActionCode(rowNumber).tab();
                cy.wait(1000);                
            }

            if (carExpenseKm != null) {
                cy.wait(1000);
                pageObj_IFormDeduction.textbox_IForm_Deductions_CarExpenseKMMethod(rowNumber).focus().clear();
                pageObj_IFormDeduction.textbox_IForm_Deductions_CarExpenseKMMethod(rowNumber).click({force:true});
                cy.wait(2500);
                pageObj_IFormDeduction.textbox_IForm_Deductions_CarExpenseKMMethod(rowNumber).type(carExpenseKm, { delay: 200 },{ force: true });
                pageObj_IFormDeduction.textbox_IForm_Deductions_CarExpenseKMMethod(rowNumber).tab();
                cy.log('Car Expense KM \'' + carExpenseKm + '\' is input.');
                cy.wait(1000);               
            }

            if (businessPercentageBeingClaimed != null) {
                if (businessPercentageBeingClaimed.length > 0) {
                    cy.wait(1000);
                    pageObj_IFormDeduction.textbox_IForm_Deductions_CarExpenseBusinessPercentage(rowNumber).focus().clear();
                    pageObj_IFormDeduction.textbox_IForm_Deductions_CarExpenseBusinessPercentage(rowNumber).click({force:true});
                    cy.wait(500);
                    pageObj_IFormDeduction.textbox_IForm_Deductions_CarExpenseBusinessPercentage(rowNumber).type(businessPercentageBeingClaimed, { force: true });
                    pageObj_IFormDeduction.textbox_IForm_Deductions_CarExpenseBusinessPercentage(rowNumber).tab();
                    cy.log('Car Expense Bussiness Percentage Being Claimed \'' + businessPercentageBeingClaimed + '\' is input.');
                    cy.wait(1000);                    
                }
                
            }

            if (declineInValueAmount != null) {
                if (declineInValueAmount.length > 0) {
                    cy.wait(1000);
                    pageObj_IFormDeduction.textbox_IForm_Deductions_CarExpenseDeclineInValueLogBookMethod(rowNumber).focus().clear();
                    pageObj_IFormDeduction.textbox_IForm_Deductions_CarExpenseDeclineInValueLogBookMethod(rowNumber).click({force:true});
                    cy.wait(500);
                    pageObj_IFormDeduction.textbox_IForm_Deductions_CarExpenseDeclineInValueLogBookMethod(rowNumber).type(declineInValueAmount, { force: true });
                    pageObj_IFormDeduction.textbox_IForm_Deductions_CarExpenseDeclineInValueLogBookMethod(rowNumber).tab();
                    cy.log('Car Expense Declien In Value Amount \'' + declineInValueAmount + '\' is input.');
                    cy.wait(1000);
                   
                }
                
            }

            cy.log('otherAmountToClaim=' + otherAmountToClaim);
            cy.log('otherAmountToClaim.length=' + otherAmountToClaim.length);
            if (otherAmountToClaim != null) {
                if (otherAmountToClaim.length > 0) {
                    cy.wait(1000);
                    pageObj_IFormDeduction.textbox_IForm_Deductions_CarExpenseOtherAmountToClaimLogbookMethod(rowNumber).focus().clear();
                    pageObj_IFormDeduction.textbox_IForm_Deductions_CarExpenseOtherAmountToClaimLogbookMethod(rowNumber).click({force:true});
                    cy.wait(500);
                    pageObj_IFormDeduction.textbox_IForm_Deductions_CarExpenseOtherAmountToClaimLogbookMethod(rowNumber).type(otherAmountToClaim, { force: true });
                    pageObj_IFormDeduction.textbox_IForm_Deductions_CarExpenseOtherAmountToClaimLogbookMethod(rowNumber).tab();
                    cy.log('Car Expense Other Amount to Claim \'' + otherAmountToClaim + '\' is input.');
                    cy.wait(1000);                   
                }

                
            }

        }

        cy.wait(30000);
        
        cy.intercept('POST', '/services/SbrPrepare/RunSbrValidation').as('validate');
        pageObj_IFormIncome.button_validate().click({ force: true });        
        cy.wait('@validate').its('response.statusCode').should('eq', 200);

    }

    ///////////////////////// Edit Tax Return IForm Deduction GiftsOrDonations  ////////////////
    editTaxReturn_IForm_Deduction_GiftsOrDonations(describeTheGifts, amountToClaim, rowNumber) {
        //this.saveDataEntry();

        if (describeTheGifts != null) {
            cy.wait(1000);
            pageObj_IFormDeduction.textbox_IForm_Deductions_GiftsOrDonations_DescribeOfDonation(rowNumber).focus().clear();
            pageObj_IFormDeduction.textbox_IForm_Deductions_GiftsOrDonations_DescribeOfDonation(rowNumber).click({force:true});
            cy.wait(500);
            pageObj_IFormDeduction.textbox_IForm_Deductions_GiftsOrDonations_DescribeOfDonation(rowNumber).type(describeTheGifts, { forec: true });
            pageObj_IFormDeduction.textbox_IForm_Deductions_GiftsOrDonations_DescribeOfDonation(rowNumber).tab();
            cy.log('Description of Gifts and Donations \'' + describeTheGifts + '\' is input.');
            cy.wait(1000);            
        }

        if (amountToClaim != null) {
            cy.wait(1000);
            pageObj_IFormDeduction.textbox_IForm_Deductions_GiftsOrDonations_AmountToClaim(rowNumber).focus().clear();
            pageObj_IFormDeduction.textbox_IForm_Deductions_GiftsOrDonations_AmountToClaim(rowNumber).click({force:true});
            cy.wait(4500);
            pageObj_IFormDeduction.textbox_IForm_Deductions_GiftsOrDonations_AmountToClaim(rowNumber).type(amountToClaim, { force: true });
            pageObj_IFormDeduction.textbox_IForm_Deductions_GiftsOrDonations_AmountToClaim(rowNumber).tab();
            cy.log('Gifts and Donations Amount \'' + amountToClaim + '\' is input.');
            cy.wait(1000);            
        }

        //cy.wait(30000);        

        cy.intercept('POST', '/services/SbrPrepare/RunSbrValidation').as('validate');
        pageObj_IFormIncome.button_validate().click({ force: true });        
        cy.wait('@validate').its('response.statusCode').should('eq', 200);
    }

    ///////////////////////// Edit Medicare Levy Related Items  ////////////////

    searchAndLocateTheItemInTaxreturnForm(itemName) {
        //Tax return form is opened first
        cy.xpath("//div[contains(text(),'Cover')]").click({force: true});
        cy.log("Item Cover is clicked once.");
        cy.wait(longwait);

        cy.xpath("//div[contains(text(),'Cover')]").click({ force: true });
        cy.log("Item Cover is clicked twice.");
        cy.wait(longwait);

        cy.xpath("//div[contains(text(), 'Main form')]").click({force: true});
        cy.log("Main Form is clicked.");
        cy.wait(longwait);

        cy.intercept('GET', '/app/features/tax2021/fIForm/fIForm_i_agents*').as('afterSelectItem');
        pageObj_IFormIncome.textBox_IForm_Searchbox().clear();
        var strSearch = itemName.substring(0, 18);
        pageObj_IFormIncome.textBox_IForm_Searchbox().type(strSearch);
        cy.wait(1000);
        pageObj_IFormIncome.textBox_IForm_Searchbox().type('{enter}');
        cy.log('Search String \''+strSearch+'\' is input.');
        //cy.wait(15000);
        //cy.wait('@afterSelectItem').its('response.statusCode').should('eq', 200);
        cy.xpath("//div[@class='ItemDesc ng-binding ui-draggable ui-draggable-handle' and contains(text(), '"+itemName+"')]").click({ force: true });
        
        cy.log('Item Link \'' + itemName + '\' is clicked.');
        cy.wait(longwait);
    }


    editTaxReturn_IForm_MedicareLevyRelatedItems(privatePatientHospitalCover, numberOfDaysNotLiableForSurcharge) {
        this.searchAndLocateTheItemInTaxreturnForm('M2 Medicare levy surcharge');
        //this.saveDataEntry();

        if (privatePatientHospitalCover != null) {
            cy.wait(1000);
            pageObj_IForm_TaxOffsetMedicareAdjustment.select_privatePatientHospitalCover().focus().select(privatePatientHospitalCover, {force: true});
            cy.log('Private Patient Hospital Cover \'' + privatePatientHospitalCover + '\' is input.');
            //pageObj_IForm_TaxOffsetMedicareAdjustment.select_privatePatientHospitalCover().tab({ force: true });
            pageObj_IForm_TaxOffsetMedicareAdjustment.select_privatePatientHospitalCover().tab({ force: true });
            cy.xpath("//label[@id='TaxReturnSaveStatusPopoverLabel']").click({ force: true });
            cy.wait(8000);
            
            cy.wait(1000);            

        }
        /*
        if (numberOfDaysNotLiableForSurcharge != null) {
            cy.wait(1000);
            pageObj_IForm_TaxOffsetMedicareAdjustment.textbox_NumberOfDaysNotLiableForSurcharge().focus().clear();
            pageObj_IForm_TaxOffsetMedicareAdjustment.textbox_NumberOfDaysNotLiableForSurcharge().click({force:true});
            cy.wait(500);
            //pageObj_IForm_TaxOffsetMedicareAdjustment.pr
            pageObj_IForm_TaxOffsetMedicareAdjustment.textbox_NumberOfDaysNotLiableForSurcharge().type(numberOfDaysNotLiableForSurcharge, { force: true });
            pageObj_IForm_TaxOffsetMedicareAdjustment.textbox_NumberOfDaysNotLiableForSurcharge().tab();
            cy.log('Number of Days Not Liable For Surcharge \'' + numberOfDaysNotLiableForSurcharge + '\' is input.');
            cy.wait(1000);
            //this.saveDataEntry();
        }
        */
        /*
        cy.wait(30000);       
        cy.intercept('POST', '/services/SbrPrepare/RunSbrValidation').as('validate');
        pageObj_IFormIncome.button_validate().click({ force: true });
        //cy.intercept('POST', '/services/SbrPrepare/RunSbrValidation').as('validate');
        cy.wait('@validate').its('response.statusCode').should('eq', 200);
        */
    }

    editTaxReturn_IForm_PrivateHealthInsurancePolicyDetails(healthInsurerID, membershipNo, premiumsEligibleForAusGovRebate, ausGovRebateReceived, benefitCode, taxClaimCode, rowNumber) {
        //this.searchAndLocateTheItemInTaxreturnForm('M2 Medicare levy surcharge');
        //this.saveDataEntry();

        if (healthInsurerID != null) {
            cy.wait(1000);
            pageObj_IForm_TaxOffsetMedicareAdjustment.textbox_HealthInsurerID(rowNumber).focus().clear();
            pageObj_IForm_TaxOffsetMedicareAdjustment.textbox_HealthInsurerID(rowNumber).click({force:true});
            cy.wait(500);
            pageObj_IForm_TaxOffsetMedicareAdjustment.textbox_HealthInsurerID(rowNumber).type(healthInsurerID, { force: true });
            pageObj_IForm_TaxOffsetMedicareAdjustment.textbox_HealthInsurerID(rowNumber).tab();
            cy.log('Health Insurance ID \'' + healthInsurerID + '\' is input.');
            cy.wait(1000);            
        }

        if (membershipNo != null) {
            cy.wait(1000);
            pageObj_IForm_TaxOffsetMedicareAdjustment.textbox_MembershipNumber(rowNumber).focus().clear();
            pageObj_IForm_TaxOffsetMedicareAdjustment.textbox_MembershipNumber(rowNumber).click({force:true});
            cy.wait(500);
            pageObj_IForm_TaxOffsetMedicareAdjustment.textbox_MembershipNumber(rowNumber).type(membershipNo, { force: true });
            pageObj_IForm_TaxOffsetMedicareAdjustment.textbox_MembershipNumber(rowNumber).tab();
            cy.log('Memebership No \'' + membershipNo + '\' is input.');
            cy.wait(1000);            
        }

        if (premiumsEligibleForAusGovRebate != null) {
            cy.wait(1000);
            pageObj_IForm_TaxOffsetMedicareAdjustment.textbox_PremiumsEligibleForAusGovRebate(rowNumber).focus().clear();
            pageObj_IForm_TaxOffsetMedicareAdjustment.textbox_PremiumsEligibleForAusGovRebate(rowNumber).click({force:true});
            cy.wait(500);
            pageObj_IForm_TaxOffsetMedicareAdjustment.textbox_PremiumsEligibleForAusGovRebate(rowNumber).type(premiumsEligibleForAusGovRebate, { force: true });
            pageObj_IForm_TaxOffsetMedicareAdjustment.textbox_PremiumsEligibleForAusGovRebate(rowNumber).tab();
            cy.log('Premiums Eligible For Australia Govenment Rebate \'' + premiumsEligibleForAusGovRebate + '\' is input.');
            cy.wait(1000);            
        }

        if (ausGovRebateReceived != null) {
            cy.wait(1000);
            pageObj_IForm_TaxOffsetMedicareAdjustment.textbox_AusGovRebateReceived(rowNumber).focus().clear();
            pageObj_IForm_TaxOffsetMedicareAdjustment.textbox_AusGovRebateReceived(rowNumber).click({force: true});
            cy.wait(500);
            pageObj_IForm_TaxOffsetMedicareAdjustment.textbox_AusGovRebateReceived(rowNumber).type(ausGovRebateReceived, { force: true });
            pageObj_IForm_TaxOffsetMedicareAdjustment.textbox_AusGovRebateReceived(rowNumber).tab();
            cy.log('Australia Govenment Rebate Received \'' + ausGovRebateReceived + '\' is input.');
            cy.wait(1000);
            
        }

        if (benefitCode != null) {
            cy.wait(1000);
            pageObj_IForm_TaxOffsetMedicareAdjustment.textbox_BenefitCode(rowNumber).focus().clear();
            pageObj_IForm_TaxOffsetMedicareAdjustment.textbox_BenefitCode(rowNumber).click({force:true});
            cy.wait(500);
            pageObj_IForm_TaxOffsetMedicareAdjustment.textbox_BenefitCode(rowNumber).type(benefitCode, { force: true });           
            cy.log('Benefit Code \'' + benefitCode + '\' is input.');
            cy.wait(1000);
            
        }

        if (taxClaimCode != null) {
            cy.wait(1000);
            pageObj_IForm_TaxOffsetMedicareAdjustment.textbox_taxClaimCode(rowNumber).focus().click({force:true});
            cy.wait(500);
            cy.xpath("//div[@class='option ui-select-choices-row-inner']//div[text()='" + taxClaimCode + "']").click({ force: true });
            cy.log('Benefit Code \'' + taxClaimCode + '\' is selected.');
            cy.wait(1000);            
        }
        /*
        cy.wait(30000);
        //this.saveDataEntry();
        cy.intercept('POST', '/services/SbrPrepare/RunSbrValidation').as('validate');
        pageObj_IFormIncome.button_validate().click({ force: true });
        //cy.intercept('POST', '/services/SbrPrepare/RunSbrValidation').as('validate');
        cy.wait('@validate').its('response.statusCode').should('eq', 200);*/
    }


    /////////////////////// Income Tests and Spouse Details ////////////////////

    editTaxReturn_IForm_IncomeTestsAndSpouseDetails(numberOfDependantChildren, spouseSurname, spouseFirstGivenName, spouseOtherGivenName, spouseDOB, spouseGender, spouseForTheFullYear, spouseDieDuringTheYear, spouseIncomePrefillDetails, spouseIncomeTaxableIncome, spouseIncomeEmployerExamptForFBT, spouseReportableSuperannuationContributions) {
        this.searchAndLocateTheItemInTaxreturnForm('IT1 Total reportable fringe benefits amounts');
        //this.saveDataEntry();

        if (numberOfDependantChildren != null) {
            cy.wait(1000);
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_NumberOfDependantChildren().focus().clear();
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_NumberOfDependantChildren().click({force:true});
            cy.wait(500);
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_NumberOfDependantChildren().type(numberOfDependantChildren);
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_NumberOfDependantChildren().tab();
            cy.log('Number of Dependant Childer \'' + numberOfDependantChildren + '\' is input.');
            cy.wait(1000);            
        }

        pageObj_IForm_IncomeTestAndSpouseDetails.textbox_otherTargetForeignIncomeAmounts().focus();
        pageObj_IForm_IncomeTestAndSpouseDetails.textbox_otherTargetForeignIncomeAmounts().click({ force: true });
        pageObj_IForm_IncomeTestAndSpouseDetails.textbox_otherTargetForeignIncomeAmounts().type("0", { force: true });
        cy.wait(500);

        pageObj_IForm_IncomeTestAndSpouseDetails.textbox_taxfreeGovernmentPensions().focus();
        pageObj_IForm_IncomeTestAndSpouseDetails.textbox_taxfreeGovernmentPensions().click({ force: true });
        pageObj_IForm_IncomeTestAndSpouseDetails.textbox_taxfreeGovernmentPensions().type("0", { force: true });
        cy.wait(500);       

        pageObj_IForm_IncomeTestAndSpouseDetails.textbox_netFinancialInvestmentLoss().focus();
        pageObj_IForm_IncomeTestAndSpouseDetails.textbox_netFinancialInvestmentLoss().click({ force: true });
        pageObj_IForm_IncomeTestAndSpouseDetails.textbox_netFinancialInvestmentLoss().type("0", { force: true });
        cy.wait(500);
        pageObj_IForm_IncomeTestAndSpouseDetails.textbox_netRentalPropertyLoss().focus();
        pageObj_IForm_IncomeTestAndSpouseDetails.textbox_netRentalPropertyLoss().click({ force: true });
        pageObj_IForm_IncomeTestAndSpouseDetails.textbox_netRentalPropertyLoss().type("0", { force: true });
        cy.wait(500);
        pageObj_IForm_IncomeTestAndSpouseDetails.textbox_childsupportYouPaid().focus();
        pageObj_IForm_IncomeTestAndSpouseDetails.textbox_childsupportYouPaid().click({ force: true });
        pageObj_IForm_IncomeTestAndSpouseDetails.textbox_childsupportYouPaid().type("0", { force: true });
        cy.wait(500);


        if (spouseSurname != null) {
            cy.wait(1000);
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_Surname().focus().clear();
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_Surname().click({force:true});
            cy.wait(500);
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_Surname().type(spouseSurname);
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_Surname().tab();
            cy.log('Spouse Surname \'' + spouseSurname + '\' is input.');
            cy.wait(1000);            
        }

        if (spouseFirstGivenName != null) {
            cy.wait(1000);
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_FirstGivenName().focus().clear();
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_FirstGivenName().click({force:true});
            cy.wait(500);
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_FirstGivenName().type(spouseFirstGivenName);
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_FirstGivenName().tab();
            cy.log('Spouse First Given Name \'' + spouseFirstGivenName + '\' is input.');
            cy.wait(1000);            
        }

        if (spouseOtherGivenName != null) {
            cy.wait(1000);
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_OtherGivenName().focus().clear();
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_OtherGivenName().click({force:true});
            cy.wait(500);
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_OtherGivenName().type(spouseOtherGivenName);
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_OtherGivenName().tab();
            cy.log('Spouse Other Given Name \'' + spouseOtherGivenName + '\' is input.');
            cy.wait(1000);            
        }

        if (spouseDOB != null) {
            cy.wait(1000);
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_DOB().focus().clear();
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_DOB().click({force:true});
            cy.wait(500);
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_DOB().type(spouseDOB);
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_DOB().tab();
            cy.log('Spouse DOB \'' + spouseDOB + '\' is input.');
            cy.wait(1000);            
        }

        if (spouseGender != null) {
            cy.wait(1000);
            pageObj_IForm_IncomeTestAndSpouseDetails.select_Gender().focus().select(spouseGender);
            cy.wait(500);
            
            cy.log('Spouse Gender \'' + spouseGender + '\' is selected.');
            pageObj_IForm_IncomeTestAndSpouseDetails.select_Gender().tab();
            cy.wait(1000);
            
        }

        if (spouseForTheFullYear != null) {
            cy.wait(1000);
            pageObj_IForm_IncomeTestAndSpouseDetails.select_SpouseForTheFullYear().focus().select(spouseForTheFullYear);
            cy.wait(500);
            
            cy.log('Spouse For the Full Year \'' + spouseForTheFullYear + '\' is selected.');
            pageObj_IForm_IncomeTestAndSpouseDetails.select_SpouseForTheFullYear().tab();
            cy.wait(1000);            
        }

        if (spouseDieDuringTheYear != null) {
            cy.wait(1000);
            pageObj_IForm_IncomeTestAndSpouseDetails.select_SpouseDieDuringTheYear().focus().select(spouseDieDuringTheYear);
            cy.wait(500);
            cy.log('Spouse Die During the Year \'' + spouseDieDuringTheYear + '\' is selected.');
            pageObj_IForm_IncomeTestAndSpouseDetails.select_SpouseDieDuringTheYear().tab();
            cy.wait(1000);            
        }

        if (spouseIncomePrefillDetails != null) {
            cy.wait(1000);
            pageObj_IForm_IncomeTestAndSpouseDetails.select_PrefillDetials().focus().select(spouseIncomePrefillDetails);
            cy.wait(500);
            cy.log('Spouse Income Prefill Details \'' + spouseIncomePrefillDetails + '\' is selected.');
            pageObj_IForm_IncomeTestAndSpouseDetails.select_PrefillDetials().tab();
            cy.wait(1000);            
        }

        if (spouseIncomeTaxableIncome != null) {
            cy.wait(1000);
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_TaxableIncome().focus().clear();
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_TaxableIncome().click({force: true});
            cy.wait(500);
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_TaxableIncome().type(spouseIncomeTaxableIncome);
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_TaxableIncome().tab();
            cy.log('Spouse Taxable Income \'' + spouseIncomeTaxableIncome + '\' is input.');
            cy.wait(1000);            
        }

        if (spouseIncomeEmployerExamptForFBT != null) {
            cy.wait(1000);
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_EmployersExamptFroFBT().focus().clear();
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_EmployersExamptFroFBT().click({force: true});
            cy.wait(500);
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_EmployersExamptFroFBT().type(spouseIncomeEmployerExamptForFBT, {force: true});
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_EmployersExamptFroFBT().tab();
            cy.log('Spouse Income Employer Exampt For FBT \'' + spouseIncomeEmployerExamptForFBT + '\' is input.');
            cy.wait(1000);            
        }

        if (spouseReportableSuperannuationContributions != null) {
            cy.wait(1000);
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_reportableSuperannuationContributions().focus().clear();
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_reportableSuperannuationContributions().click({ force: true });
            cy.wait(500);
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_reportableSuperannuationContributions().type(spouseReportableSuperannuationContributions);
            pageObj_IForm_IncomeTestAndSpouseDetails.textbox_reportableSuperannuationContributions().tab();
            cy.log('Spouse Reportable Superannuation Contributions \'' + spouseReportableSuperannuationContributions + '\' is input.');
            cy.wait(1000);            
        }

        this.searchAndLocateTheItemInTaxreturnForm('8 Electronic funds transfer');
        pageObj_IFormIncome.textbox_IForm_EFT_BSB().click({ force: true }).tab();        
        pageObj_IFormIncome.textbox_IForm_EFT_AccountNumber().click({ force: true });    
        

        //cy.wait(30000);
        cy.intercept('POST', '/services/SbrPrepare/RunSbrValidation').as('validate');
        pageObj_IFormIncome.button_validate().click({ force: true });        
        cy.wait('@validate').its('response.statusCode').should('eq', 200);
    }

    //* Business and Professional Items
    editTaxReturn_IForm_BusinessandProfessionalItem() {
        this.searchAndLocateTheItemInTaxreturnForm('P24 Taxpayer');        

        pageObj_IForm_BusinessAndProfessionalItems.textbox_taxAgentDeclarationDate().click({ force: true });
        cy.wait(500);
        const dayjs = require('dayjs');
        cy.wait(500);
        pageObj_IForm_BusinessAndProfessionalItems.textbox_taxAgentDeclarationDate().click({ force: true }).type('{enter}');
        pageObj_IForm_BusinessAndProfessionalItems.textbox_taxAgentTelephoneNumber().click();
        pageObj_IForm_BusinessAndProfessionalItems.textbox_taxAgentTelephoneNumber().type("123456789");
        cy.wait(500);

        pageObj_IForm_IncomeTestAndSpouseDetails.textbox_taxfreeGovernmentPensions().focus();
        pageObj_IForm_IncomeTestAndSpouseDetails.textbox_taxfreeGovernmentPensions().click({ force: true });
        pageObj_IForm_IncomeTestAndSpouseDetails.textbox_taxfreeGovernmentPensions().type("0");
        /*
        this.searchAndLocateTheItemInTaxreturnForm('8 Electronic funds transfer');
        pageObj_IFormIncome.textbox_IForm_EFT_AccountNumber().click({ force: true });
        pageObj_IFormIncome.textbox_IForm_EFT_AccountNumber().dblclick({ force: true });
        */
        cy.wait(5000);
        cy.intercept('POST', '/services/SbrPrepare/RunSbrValidation').as('validate');
        pageObj_IFormIncome.button_validate().click({ force: true });
        cy.wait('@validate').its('response.statusCode').should('eq', 200);
    }

    lodgeTaxReturn(clientRef, formtype, year) {
        cy.log('Start add Tax Form...');
        //cy.log(clientRef);
        this.searchClient(clientRef);

        //click the footer to disable the hint pop up
        cy.wait(2000);
        cy.xpath("//strong[starts-with(text(), 'Copyright')]").click({ force: true });
        cy.wait(10000);

        homePage.button_checkbox_taxform_click(year, formtype);
        homePage.button_Lodge().click({ force: true });
        cy.intercept('POST', '/signalr/abort?transport=serverSentEvents&clientProtocol*').as('lodgementprep');
        cy.wait('@lodgementprep').its('response.statusCode').should('eq', 200);
        //cy.wait(20000);
        LodgementDialog.button_Submit().click({ force: true });
        cy.intercept('GET', '/services/SbrTransmission/GetTransmissionStatus*').as('lodgementcomplete');
        cy.wait('@lodgementcomplete').its('response.statusCode').should('eq', 200);
        //cy.wait(30000);
        LodgementDialog.lodgement_successmessage().should('exist');

    }
    updatetaxformstatus(clientRef, formtype, year, status) {
        cy.log('Start add Tax Form...');
        //cy.log(clientRef);
        this.searchClient(clientRef);

        //click the footer to disable the hint pop up
        cy.wait(2000);
        cy.xpath("//strong[starts-with(text(), 'Copyright')]").click({ force: true });
        cy.wait(10000);

        homePage.button_edit_taxform_click(year, formtype);

        pageObj_AddNewTaxForm.dropdown_status().click({ force: true });
        pageObj_AddNewTaxForm.dropdown_status_select(status).click({ force: true });
        pageObj_AddNewTaxForm.button_Save().click({ force: true });
        cy.intercept('POST', '/services/Client/GetClientsTaxReturnsForUser').as('afterClickSaveButtonInNewTaxForm');
        cy.wait('@afterClickSaveButtonInNewTaxForm').its('response.statusCode').should('eq', 200);
        cy.log('Save button is clicked.');
    }

    deletetaxform(clientRef, formtype, year) {
        cy.log('Start add Tax Form...');
        //cy.log(clientRef);
        this.searchClient(clientRef);

        //click the footer to disable the hint pop up
        cy.wait(2000);
        cy.xpath("//strong[starts-with(text(), 'Copyright')]").click({ force: true });
        cy.wait(10000);

        //homePage.button_edit_taxform(year, formtype).click();
        homePage.button_edit_taxform_click(year, formtype);
        pageObj_AddNewTaxForm.button_deletetaxform().click();
        cy.intercept('DELETE', '/services/TaxForm/DeleteTaxForm?clientID=*').as('deletetaxform');
        pageObj_AddNewTaxForm.button_deleteconfirm_yes().click();        
        cy.wait('@deletetaxform').its('response.statusCode').should('eq', 200);

    }

}

export default CommonFunctions;