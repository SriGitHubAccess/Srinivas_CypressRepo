class PageObj_IForm_TaxOffsetMedicareAdjustment {

    //////////////// Medicare Levy Surcharge //////////////////
    select_privatePatientHospitalCover() {
        return cy.xpath("//select[@title='Were you, your spouse and all dependents covered for whole year ? (Y/N)']");
    }
    select_privatePatientHospitalCover_N() {
        return cy.xpath("//select[@title='Were you, your spouse and all dependents covered for whole year ? (Y/N)']").children().last();
    }

    textbox_NumberOfDaysNotLiableForSurcharge() {
        return cy.xpath("//input[@title='Number of days NOT liable for the surcharge - 0 to 365 (leap year 0 to 366)']");
	}

    //////////// End of Medicare Levy Surcharge ////////////////


    /////////// Private health insurance policy details ////////////
    textbox_HealthInsurerID(rowNumber) {
        return cy.xpath("//input[@title='Health insurer ID.']").eq(rowNumber);
    }

    textbox_MembershipNumber(rowNumber) {
        return cy.xpath("//input[@title='Membership number']").eq(rowNumber);
    }

    textbox_PremiumsEligibleForAusGovRebate(rowNumber) {
        return cy.xpath("//input[@title='Your premiums eligible for Australian Government rebate']").eq(rowNumber);
    }

    textbox_AusGovRebateReceived(rowNumber) {
        return cy.xpath("//input[@title='Your Australian Government rebate received']").eq(rowNumber);
    }

    textbox_BenefitCode(rowNumber) {
        return cy.xpath("//input[@title='Benefit code (shown at label L in private health fund statement)']").eq(rowNumber);
    }

    textbox_taxClaimCode(rowNumber) {
        return cy.xpath("//input[@aria-label='Tax claim code']").eq(rowNumber);
    }

};

export default PageObj_IForm_TaxOffsetMedicareAdjustment;