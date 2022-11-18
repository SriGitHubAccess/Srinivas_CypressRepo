class pageObj_IForm_IncomeTestAndSpouseDetails {

    //////////////// Income Test //////////////////
    textbox_NumberOfDependantChildren() {
        return cy.xpath("//input[@title='Number of dependent children.']");
    }

    //////////////// Spouse Details ///////////////

    textbox_Surname() {
        return cy.xpath("//input[contains(@title, 'family name') and contains(@title, 'Spouse')]");
	}

    textbox_FirstGivenName() {
        return cy.xpath("//input[contains(@title, 'first name') and contains(@title, 'Spouse')]");
    }

    textbox_OtherGivenName() {
        return cy.xpath("//input[contains(@title, 'other given names') and contains(@title, 'Spouse')]");
    }

    textbox_DOB() {
        return cy.xpath("//div[contains(@data-title, 'date of birth')]//input[@type='text']");
    }

    select_Gender() {
        return cy.xpath("//select[contains(@title, 'gender')]");
    }

    select_SpouseForTheFullYear() {
        return cy.xpath("//select[contains(@title, 'Did you have a spouse for the full year')]");
    }

    select_SpouseDieDuringTheYear() {
        return cy.xpath("//select[contains(@title, 'Did your spouse die during the year')]");
    }

    select_PrefillDetials() {
        return cy.xpath("//select[contains(@title, 'Auto pre-fill Labels O to F from related ref tax return details')]");
    }

    textbox_TaxableIncome() {
        return cy.xpath("//input[contains(@title, 'taxable income (excluding any assesable FHSS released amount)')]");
    }

    textbox_EmployersExamptFroFBT() {
        return cy.xpath("//input[contains(@title, 'total reportable fringe benefits amounts- from organisations eligible for FBT exemption')]");
    }

    textbox_reportableSuperannuationContributions() {
        return cy.xpath("//input[contains(@title, 'Spouse reportable superannuation contributions.')]");
    }
    textbox_netFinancialInvestmentLoss() {
        return cy.xpath("//input[contains(@title, 'Total amount for Label X - leave BLANK for auto-calculation.')]");
    }
    textbox_netRentalPropertyLoss() {
        return cy.xpath("//input[contains(@title, 'Total amount for Label Y - leave BLANK for auto-calculation.')]");
    }
    textbox_childsupportYouPaid() {
        return cy.xpath("//input[contains(@title, 'Child support you paid.')]");
    }
    textbox_taxfreeGovernmentPensions() {
        return cy.xpath("//input[contains(@title, 'Tax-free government pensions.')]");
    }
    textbox_otherTargetForeignIncomeAmounts() {
        return cy.xpath("//input[contains(@title, 'Other Target Foreign Income amounts.')]");
    }



};

export default pageObj_IForm_IncomeTestAndSpouseDetails;