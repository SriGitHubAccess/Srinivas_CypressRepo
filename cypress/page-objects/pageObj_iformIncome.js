class PageObj_IFormIncome {

    textBox_IForm_Searchbox() {
        return cy.get('input#TaxItemSearchBox');
    }

    textBox_IFrom_Income_Occupation() {
        return cy.xpath("//input[@type='text' and @ngmodel='oVisSheet.oItem_occupat.aGroups[0][0]']");
        //return cy.get('.HsTaxEditAutocomplete > .dx-dropdowneditor-input-wrapper > .dx-texteditor-container > .dx-texteditor-input');
    }

    textBox_OccupationCode() {
        return cy.xpath("//input[@title='Occupation code']");
    }


    textBox_IForm_Income_PayerABN(rowNumber) {
        return cy.xpath("//div[@name='Item_grp_cert']//input[@title='Payers ABN / WPN or blank.']").eq(rowNumber);
    }

    textBox_IForm_Income_PayerName(rowNumber){
        return cy.xpath("//div[@name='Item_grp_cert']//input[@title='Payers name.']").eq(rowNumber);
    }

    textBox_IForm_Income_TaxWithHeld(rowNumber){
        return cy.xpath("//div[@name='Item_grp_cert']//input[@title='Tax withheld.']").eq(rowNumber);
    }

    textBox_IForm_Income_GrossPay(rowNumber){
        return cy.xpath("//div[@name='Item_grp_cert']//input[@title='Gross income.']").eq(rowNumber);
    }

    textBox_IForm_Income_AllowanceDescription(){
        return cy.xpath("//div[@hsitemname='allowncs']//input[@title='Allowance or benefit - Description.']");
    }

    textBox_IForm_Income_AllowanceTaxWithheld(){
        return cy.xpath("//div[@hsitemname='allowncs']//input[@title='Tax withheld.']");
    }

    textBox_IForm_Income_AllowanceGrossIncome(){
        return cy.xpath("//div[@hsitemname='allowncs']//input[@title='Gross income.']");
    }

    textBox_IForm_Income_GovernmentAllowancesDescription(){
        return cy.xpath("//div[@name='Item_unemploy']//input[@title='Payers name.']");
    }

    textBox_IForm_Income_GovernmentAllowancesTaxWithheld(){
        return cy.xpath("//div[@name='Item_unemploy']//input[@title='Tax withheld.']");
    }

    textBox_IForm_Income_GovernmentAllowancesGrossIncome(){
        return cy.xpath("//div[@name='Item_unemploy']//input[@title='Gross income.']");
    }

    ////////////// Super Lump Sum Schedule /////////////

    textbox_IForm_Income_8SuperLumpSumSchedule_paymentDate(rowNumber){
        return cy.xpath("//div[@data-title='Australian superannuation lump sum payments - Date of Payment (dd/mm/ccyy)']//input[@type='text']").eq(rowNumber);
    }

    textbox_IForm_Income_8SuperLumpSumSchedule_TaxWithheld(rowNumber){
        return cy.xpath("//input[@title='Tax withheld amount.']").eq(rowNumber);
    }

    textbox_IForm_Income_8SuperLumpSumSchedule_TaxableComponent_TaxedElement(rowNumber){
        return cy.xpath("//input[@title='Australian superannuation lump sum payments - Taxable component - Taxed element.']").eq(rowNumber);
    }

    textbox_IForm_Income_8SuperLumpSumSchedule_TaxableComponent_UntaxedElement(rowNumber){
        return cy.xpath("//div[@name='Item_details']//input[@title='Australian superannuation lump sum payments - Taxable component - Untaxed element.']").eq(rowNumber);
    }

    textbox_IForm_Income_8SuperLumpSumSchedule_TaxFreeComponent(rowNumber){
        return cy.xpath("//div[@name='Item_details']//input[@title='Australian superannuation lump sum payments - Tax-Free component.']").eq(rowNumber);
    }

    selectElement_IForm_Income_8SuperLumpSumSchedule_IsDeathBenefit(rowNumber){
        return cy.xpath("//div[@name='Item_details']//select[@title='Is this payment a death benefit? (Y/N)']").eq(rowNumber);
    }

    textbox_IForm_Income_8SuperLumpSumSchedule_PayerABN(rowNumber){
        return cy.xpath("//div[@name='Item_details']//input[contains(@title, 'Australian Business Number (ABN).')]").eq(rowNumber);
    }

    textbox_IForm_Income_8SuperLumpSumSchedule_PayerName(rowNumber){
        return cy.xpath("//div[@name='Item_details']//input[contains(@title, 'Description.')]").eq(rowNumber);
}

    textbox_IForm_Income_8SuperLumpSumSchedule_lowRateamountPriorYears(){
        return cy.xpath("//input[contains(@title, 'Amounts received in prior years')]");
    }

    textBox_IForm_Income_8SuperLumpSumSchedule_ContactPerson() {
        return cy.get("input[title='Enter the contact name']");
    }

    textBox_IForm_Income_8SuperLumpSumSchedule_ContactNumberAreaCode() {
        return cy.get("input[title='Enter the contact phone area code']");
    }

    textBox_IForm_Income_8SuperLumpSumSchedule_ContactNumber() {
        return cy.get("input[title='Enter the contact telephone number']");
    }

    ////// End of Super Lump Sum form ////////

    //////////////// Gross Interest ///////////////

    text_IForm_Income_GrossInterest_Bank(rowNumber){
        return cy.xpath("//div[@name='Item_interest']//input[@title='Bank.']").eq(rowNumber);
    }

    text_IForm_Income_GrossInterest_Branch(rowNumber){
        return cy.xpath("//div[@name='Item_interest']//input[@title='Branch']").eq(rowNumber);
    }

    text_IForm_Income_GrossInterest_AccountNumber(rowNumber){
        return cy.xpath("//div[@name='Item_interest']//input[@title='Account number']").eq(rowNumber);
    }

    text_IForm_Income_GrossInterest_AccountHolder(rowNumber){
        return cy.xpath("//div[@name='Item_interest']//input[@title='Number of account holders.']").eq(rowNumber);
    }

    select_IForm_Income_GrossInterest_ForeighCountryCodeIfNotAus(rowNumber){
        return cy.xpath("//div[@name='Item_interest']//select[@title='Enter foreign country code if not Australia']").eq(rowNumber);
    }

    select_IForm_Income_GrossInterest_BusinessInterestIncome(rowNumber){
        return cy.xpath("//div[@name='Item_interest']//select[@title='Business interest income? (Y/N)']", 1, 1, driver).eq(rowNumber);
    }

    textbox_IForm_Income_GrossInterest_TFNWithholdTotal(rowNumber){
        return cy.xpath("//div[@name='Item_interest']//input[@title='TFN amounts withheld from gross interest - total.']").eq(rowNumber);
    }

    textbox_IForm_Income_GrossInterest_TFNWithholdYourShare(rowNumber) {
        return cy.xpath("//div[@name='Item_interest']//input[@title='TFN amounts withheld from gross interest - your share.']").eq(rowNumber);
    }

    textbox_IForm_Income_GrossInterest_GrossInterestTotal(rowNumber){
        return cy.xpath("//div[@name='Item_interest']//input[@title='Gross interest - total.']").eq(rowNumber);
    }

    textbox_IForm_Income_GrossInterest_GrossInterestYourShare(rowNumber) {
        return cy.xpath("//div[@name='Item_interest']//input[@title='Gross interest - your share.']").eq(rowNumber);
    }

    textbox_IForm_Income_AmountReceivedWithinuntaxed_PlanCap(rowNumber) {
        return cy.xpath("//div[@name='Item_pydetails']//input[@title='Australian superannuation lump sum payments - Taxable component - Untaxed element.']").eq(rowNumber);
    }   
    
    label_IForm_Income_GrossInterest(rowNumber) {
        return cy.xpath("//div[(@class='HsLabel') and contains(.,'Gross interest')]").eq(rowNumber);
    }
    text_abn_untaxed(rowNumber) {
        return cy.xpath("//div[@name='Item_pydetails']//input[contains(@title, 'Australian Business Number')]").eq(rowNumber);
    }
    button_validate() {
        return cy.xpath("//input[@value='Validate']");
    }
    textbox_IForm_EFT_BSB() {
        return cy.xpath("//input[@title='Bank/State/Branch number.']");
    }
    textbox_IForm_EFT_AccountNumber() {
        return cy.xpath("//input[@title='Account number.']");
    }
    dropdown_eft_selection() {
        return cy.xpath("//select[@class='HsTaxEdit HsTaxEditSelect HsTaxEditWtUnderlay  ng-pristine ng-valid ng-not-empty ng-touched']");
    }
    
    ////// End of Gross Interest //////



};

export default PageObj_IFormIncome;