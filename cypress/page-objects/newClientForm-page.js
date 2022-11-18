class NewClientForm {

    formTitle() {
        return cy.get('h4').contains('Add New Client');
    }
    
    tfnInput() {
        return cy.get('input#tfn')
    }

    tfnTrailingInput() {
        return cy.get('input#tfnTrailing')
    }

    abnInput() {
        return cy.get('input[name=abn]')
    }

    abnDivisionInput() {
        return cy.get('input[name=abnDivision]')
    }

    dropdown_clientType() {
        return cy.get('div#clientType')
	}

    dropdown_Gender() {
        return cy.get('div[title=Gender]')
    }

    input_Surname() {
        return cy.get('input[name=surname]')
    }

    select_Title() {
        return cy.get('select[title="Enter personal title"]')
    }

    input_Firstname() {
        return cy.get('input[name=firstName]')
    }

    input_Othername() {
        return cy.get('input[name=otherName]')
    }

    select_suffix() {
        return cy.get('select[name=suffix]')
    }

    input_AltName() {
        return cy.get('input[name=altName]')
    }

    input_DOB() {
        return cy.xpath('//div[@id="dateOfBirth"]//input[@type="text"]')
    }

    websiteInput() {
        return cy.get('input[name=website]')
    }

    dateDeceasedInput() {
        return cy.xpath('//div[@id="dateDeceased"]//input[@type="text"]')
    }

    textbox_BusinessName() {
        return cy.xpath("//input[@placeholder='Business Name']");
    }

    input_DateIncoporated() {
        return cy.get('div#dateOfBirth');
    }

    input_Website() {
        return cy.get('input[name=website]');
    }

    //////////////// Address Form /////////////////

    lable_TableAddress() {
        return cy.get('h5').contains('Addresses');
    }

    cell_AddressType(rowNumber) {
        return cy.xpath("//div[@class='row' and contains(h5, 'Addresses') and contains(div, 'Type')]//td[contains(@aria-label, 'Column Type, Value')]").eq(rowNumber);
    }

    cell_AddressType_TextBox() {
        return cy.xpath("//div[@class='row' and contains(h5, 'Addresses') and contains(div, 'Type')]//td[contains(@aria-label, 'Column Type, Value')]//input[@type='text']");
    }

    cell_Street1(rowNumber) {
        return cy.xpath("//div[@class='row' and contains(h5, 'Addresses') and contains(div, 'Type')]//td[contains(@aria-label, 'Column Street 1, Value')]").eq(rowNumber);
    }

    cell_Street1_TextBox(rowNumber) {
        return cy.xpath("//div[@class='row' and contains(h5, 'Addresses') and contains(div, 'Type')]//td[contains(@aria-label, 'Column Street 1, Value')]//input[@type='text']");
    }

    cell_Street2(rowNumber) {
        return cy.xpath("//div[@class='row' and contains(h5, 'Addresses') and contains(div, 'Type')]//td[contains(@aria-label, 'Column Street 2, Value')]").eq(rowNumber);
    }

    cell_Street2_TextBox(rowNumber) {
        return cy.xpath("//div[@class='row' and contains(h5, 'Addresses') and contains(div, 'Type')]//td[contains(@aria-label, 'Column Street 2, Value')]//input[@type='text']");
    }

    cell_Suburb(rowNumber) {
        return cy.xpath("//div[@class='row' and contains(h5, 'Addresses') and contains(div, 'Type')]//td[contains(@aria-label, 'Column Suburb, Value')]").eq(rowNumber);
    }

    cell_Suburb_TextBox(rowNumber) {
        return cy.xpath("//div[@class='row' and contains(h5, 'Addresses') and contains(div, 'Type')]//td[contains(@aria-label, 'Column Suburb, Value')]//input[@type='text']");
    }

    cell_State(rowNumber) {
        return cy.xpath("//div[@class='row' and contains(h5, 'Addresses') and contains(div, 'Type')]//td[contains(@aria-label, 'Column State, Value')]").eq(rowNumber);
    }

    cell_State_TextBox(rowNumber) {
        return cy.xpath("//div[@class='row' and contains(h5, 'Addresses') and contains(div, 'Type')]//td[contains(@aria-label, 'Column State, Value')]//input[@type='text']");
    }

    cell_Code(rowNumber) {
        return cy.xpath("//div[@class='row' and contains(h5, 'Addresses') and contains(div, 'Type')]//td[contains(@aria-label, 'Column Code, Value')]").eq(rowNumber);
    }

    cell_Code_TextBox(rowNumber) {
        return cy.xpath("//div[@class='row' and contains(h5, 'Addresses') and contains(div, 'Type')]//td[contains(@aria-label, 'Column Code, Value')]//input[@type='text']");
    }

    cell_Country(rowNumber) {
        return cy.xpath("//div[@class='row' and contains(h5, 'Addresses') and contains(div, 'Type')]//td[contains(@aria-label, 'Column Country, Value')]").eq(rowNumber);
    }

    cell_Country_TextBox(rowNumber) {
        return cy.xpath("//div[@class='row' and contains(h5, 'Addresses') and contains(div, 'Type')]//td[contains(@aria-label, 'Column Country, Value')]//input[@type='text']");
    }

    //////////// Phone Number //////////////

    lable_TablePhoneNumber() {
        return cy.get('h5').contains('Phone Numbers');
    }

    cell_PhoneType(rowNumber) {
        return cy.xpath("//div[@class='row pad-right' and contains(., 'Phone Numbers')]//td[contains(@aria-label, 'Column Type, Value')]").eq(rowNumber);
    }

    cell_PhoneType_TextBox(rowNumber) {
        return cy.xpath("//div[@class='row pad-right' and contains(., 'Phone Numbers')]//td[contains(@aria-label, 'Column Type, Value')]//input[@type='text']");
    }

    cell_PhoneNumber(rowNumber) {
        return cy.xpath("//div[@class='row pad-right' and contains(., 'Phone Numbers')]//td[contains(@aria-label, 'Column Number, Value')]").eq(rowNumber);
    }

    cell_PhoneNumber_TextBox(rowNumber) {
        return cy.xpath("//div[@class='row pad-right' and contains(., 'Phone Numbers')]//td[contains(@aria-label, 'Column Number, Value')]//input[@type='text']");
    }

    cell_PhoneDescription(rowNumber) {
        return cy.xpath("//div[@class='row pad-right' and contains(., 'Phone Numbers')]//td[contains(@aria-label, 'Column Description, Value')]").eq(rowNumber);
    }

    cell_PhoneDescription_TextBox(rowNumber) {
        return cy.xpath("//div[@class='row pad-right' and contains(., 'Phone Numbers')]//td[contains(@aria-label, 'Column Description, Value')]//input[@type='text']");
    }

    /////////////////// Email Addresss ////////////////

    cell_EmailContactName(rowNumber) {
        return cy.xpath("//div[@class='row' and contains(h5, 'Email Addresses')]//td[contains(@aria-label, 'Column Contact Name, Value')]").eq(rowNumber);
    }

    cell_EmailContactName_TextBox(rowNumber) {
        return cy.xpath("//div[@class='row' and contains(h5, 'Email Addresses')]//td[contains(@aria-label, 'Column Contact Name, Value')]//input[@type='text']");
    }

    cell_EmailAddress(rowNumber) {
        return cy.xpath("//div[@class='row' and contains(h5, 'Email Addresses')]//td[contains(@aria-label, 'Column Email, Value')]").eq(rowNumber);
    }

    cell_EmailAddress_TextBox(rowNumber) {
        return cy.xpath("//div[@class='row' and contains(h5, 'Email Addresses')]//td[contains(@aria-label, 'Column Email, Value')]//input[@type='text']");
    }

    //////////// Checkboxes Show on Tax Form ////////////////

    mobilePhoneCheckbox() {
        return cy.get('div[role=checkbox]').contains('title','Show mobile number on tax form cover?')
    }

    daytimePhoneCheckbox() {
        return cy.get('div[role=checkbox]').contains('title', 'Show daytime number on tax form cover?')
    }

    emailAddressCheckbox() {
        return cy.get('div[role=checkbox]').contains('title', 'Show email address on tax form cover?')
    }

    ///////////// Bank Account ///////////////

    input_BSB() {
        return cy.get('input[name=bsb]')
    }

    input_AccountNumber() {
        return cy.get('input[name=AccNumber]')
    }

    input_AccountName() {
        return cy.get('input[name=AccountName]')
    }

    textbox_BankAccountNote() {
        return cy.get('textarea#clientNotes')
    }

    ///////////// Practice Setting /////////////////

    //////////// Action butotn /////////////
    button_Save() {
        return cy.get('input[value=Save]')
    }

    input_ClientRef() {
        return cy.get('input[title="Client Reference"]');
    }

};

export default NewClientForm;