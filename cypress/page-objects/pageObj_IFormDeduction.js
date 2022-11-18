class PageObj_IFormDeduction {

    //////////////// Work Related Car Expense //////////////////
    textBox_IForm_Income_TaxWithHeld(rowNumber) {
        return cy.xpath("//div[@name='Item_grp_cert']//input[@title='Tax withheld.']").eq(rowNumber);
    }

    textbox_IForm_Deductions_CarExpenseDescription(rowNumber){
        return cy.xpath("//div[@name='Item_car']//input[@title='Car expenses description (car make/model)']").eq(rowNumber);
    }

    select_IForm_Deductions_CarExpenseActionCode(rowNumber){
        return cy.xpath("//div[@name='Item_car']//select[@title='Car expenses action code: S - Cents/km or B - Logbook']").eq(rowNumber);
    }

    textbox_IForm_Deductions_CarExpenseKMMethod(rowNumber){
        return cy.xpath("//div[@name='Item_car']//input[@title='No. of Kilometres (Cents/KM method)']").eq(rowNumber);
    }

    textbox_IForm_Deductions_CarExpenseBusinessPercentage(rowNumber){
        return cy.xpath("//div[@name='Item_car']//input[@title='Business percentage being claimed for business usage for this car (Logbook method).']").eq(rowNumber);
    }

    textbox_IForm_Deductions_CarExpenseDeclineInValueLogBookMethod(rowNumber){
        return cy.xpath("//div[@name='Item_car']//input[@title='Decline in Value amount (Logbook method).']").eq(rowNumber);
    }

    textbox_IForm_Deductions_CarExpenseOtherAmountToClaimLogbookMethod(rowNumber){
        return cy.xpath("//div[@name='Item_car']//input[@title='Other amount to claim (Logbook method).']").eq(rowNumber);
    }

    //////////// End of Work Related Car Expense ////////////////

    ///////////  Gifts or Donations /////////////////

    textbox_IForm_Deductions_GiftsOrDonations_DescribeOfDonation(rowNumber) {
        return cy.get("input[title='Describe this gift.']").eq(rowNumber);
    }

    textbox_IForm_Deductions_GiftsOrDonations_AmountToClaim(rowNumber) {
        return cy.xpath("//div[@name='Item_gifts']//input[@title='Amount to claim.']").eq(rowNumber);
    }

    //////////   End of Gifts or Donations /////////
};

export default PageObj_IFormDeduction;