
import LoginPage from '../../page-objects/login-page';
//import { benHurr47, randomUser, loginuserdetails } from '../../data';
import { benHurr47, randomUser, userlogin } from '../../fixtures';
import HomePage from '../../page-objects/home-page';
import NewClientForm from '../../page-objects/newClientForm-page.js'
import CommonFunctions from '../../support/commonFunctions.js'
import * as common from 'mocha/lib/interfaces/common';

const loginPage = new LoginPage();
const homePage = new HomePage();
const newClientForm = new NewClientForm();
const commonFunctions = new CommonFunctions();

describe('Edit Tax Return - CForm', () => {

    var newTaxReturnCFormData;
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

              cy.fixture('newClientCForm.json').then((testData) => {
                // "this" is still the test context object
                this.testData = testData;
                newTaxReturnCFormData = this.testData;
    
                cy.log('newTaxReturnCFormData.clientRef= ' + newTaxReturnCFormData.clientRef);
    
            })
    
      })
    
    
   it('Edit Tax Return - CForm - Income - Salary and Gross Interest', () => {
        
        //Launch THC QA
        commonFunctions.launchHTC(loginPage.url);

        //Login HTC QA as Ben
       commonFunctions.loginHTC(loginuserdetails.email, loginuserdetails.password, loginuserdetails.firstName);

        //Display Tax Return form
       commonFunctions.displayTaxReturnForm(newTaxReturnCFormData.individualIncome[0].clientRef, newTaxReturnCFormData.individualIncome[0].formType);
       var rowNumber=0;

       //Edit Tax Return - I Form - Income - Salary and Wages
       rowNumber = 0;
       commonFunctions.editTaxReturn_CForm_Income_SalaryOrWages(newTaxReturnCFormData.individualIncome[0].occupation, newTaxReturnCFormData.individualIncome[0].occupationCode, newTaxReturnCFormData.individualIncome[0].payment[rowNumber].payerABN, newTaxReturnCFormData.individualIncome[0].payment[rowNumber].payerName, newTaxReturnCFormData.individualIncome[0].payment[rowNumber].taxWithheld, newTaxReturnCFormData.individualIncome[0].payment[rowNumber].grossPay, rowNumber);
       rowNumber = 1;
       commonFunctions.editTaxReturn_CForm_Income_SalaryOrWages(null, null, newTaxReturnCFormData.individualIncome[0].payment[rowNumber].payerABN, newTaxReturnCFormData.individualIncome[0].payment[rowNumber].payerName, newTaxReturnCFormData.individualIncome[0].payment[rowNumber].taxWithheld, newTaxReturnCFormData.individualIncome[0].payment[rowNumber].grossPay, rowNumber);

        //Edit Tax Return - I Form - Income - Gross Income
        rowNumber = 0;
        commonFunctions.editTaxReturn_IForm_Income_GrossInterest(newTaxReturnCFormData.individualIncome[0].grossInterest[rowNumber].grossInterest_Bank, newTaxReturnCFormData.individualIncome[0].grossInterest[rowNumber].grossInterest_branch, newTaxReturnCFormData.individualIncome[0].grossInterest[rowNumber].grossInterest_AccountNumber, newTaxReturnCFormData.individualIncome[0].grossInterest[rowNumber].grossInterest_AccountHolder, newTaxReturnCFormData.individualIncome[0].grossInterest[rowNumber].grossInterest_TFNAmountWithheldTotal, newTaxReturnCFormData.individualIncome[0].grossInterest[rowNumber].grossInterest_TFNAmountWithheldYourShare, newTaxReturnCFormData.individualIncome[0].grossInterest[rowNumber].grossInterest_GrossInterest, newTaxReturnCFormData.individualIncome[0].grossInterest[rowNumber].grossInterest_grossInterestyourShare, rowNumber);
       

        commonFunctions.saveDataEntry();
        commonFunctions.displayHomePage();
        commonFunctions.logoutHTC();

   })
    
 
    it('Edit Tax Return - IForm - Income - Super Lump Sum', () => {

        //Launch THC QA
        commonFunctions.launchHTC(loginPage.url);

        //Login HTC QA as Ben
        commonFunctions.loginHTC(loginuserdetails.email, loginuserdetails.password, loginuserdetails.firstName);

        //Display Tax Return form
        commonFunctions.displayTaxReturnForm(newTaxReturnCFormData.individualIncome[0].clientRef, newTaxReturnCFormData.individualIncome[0].formType);
        var rowNumber = 0;

       
        //Edit Tax Return - I Form - Income - Super Lump Sum Schedule
        rowNumber = 0;
        commonFunctions.editTaxReturn_IForm_Income_SuperLumpSumSchedule(newTaxReturnCFormData.individualIncome[0].superLumpSumSchedulePayment[rowNumber].superLumpSumSchedule_PaymentDate, newTaxReturnCFormData.individualIncome[0].superLumpSumSchedulePayment[rowNumber].superLumpSumSchedule_TaxWithheld, newTaxReturnCFormData.individualIncome[0].superLumpSumSchedulePayment[rowNumber].superLumpSumSchedule_TaxedComponent_TaxedElement, newTaxReturnCFormData.individualIncome[0].superLumpSumSchedulePayment[rowNumber].superLumpSumSchedule_TaxedComponent_UntaxedElement, newTaxReturnCFormData.individualIncome[0].superLumpSumSchedulePayment[rowNumber].superLumpSumSchedule_TaxableComponent_TaxFreeComponent, newTaxReturnCFormData.individualIncome[0].superLumpSumSchedulePayment[rowNumber].superLumpSumSchedule_DeathBenefit, newTaxReturnCFormData.individualIncome[0].superLumpSumSchedulePayment[rowNumber].superLumpSumSchedule_PayerABN, newTaxReturnCFormData.individualIncome[0].superLumpSumSchedulePayment[rowNumber].superLumpSumSchedule_PayerName, newTaxReturnCFormData.individualIncome[0].superLumpSumSchedule_ContactPerson, newTaxReturnCFormData.individualIncome[0].superLumpSumSchedule_ContactNumberAreaCode, newTaxReturnCFormData.individualIncome[0].superLumpSumSchedule_ContactNumber, rowNumber);

       
        commonFunctions.saveDataEntry();
        commonFunctions.displayHomePage();
        commonFunctions.logoutHTC();

    })
    
    it('Edit Tax Return - IForm - Deduction', () => {

        //Launch THC QA
        commonFunctions.launchHTC(loginPage.url);

        //Login HTC QA as Ben
        commonFunctions.loginHTC(loginuserdetails.email, loginuserdetails.password, loginuserdetails.firstName);
        
        //Display Tax Return form
        commonFunctions.displayTaxReturnForm(newTaxReturnCFormData.individualIncome[0].clientRef, newTaxReturnCFormData.individualIncome[0].formType);

        //Edit Tax Return IForm Deduction Work Related Car Expense
        var rowNumber = 0;
        commonFunctions.editTaxReturn_IForm_Deduction_WorkRelatedCarExpense(newTaxReturnCFormData.individualDeduction[0].workRealtedCareExpenses[rowNumber].carExpenseDescription, newTaxReturnCFormData.individualDeduction[0].workRealtedCareExpenses[rowNumber].carExpenseActionCode, newTaxReturnCFormData.individualDeduction[0].workRealtedCareExpenses[rowNumber].carExpenseKm, newTaxReturnCFormData.individualDeduction[0].workRealtedCareExpenses[rowNumber].businessPercentageBeingClaimed, newTaxReturnCFormData.individualDeduction[0].workRealtedCareExpenses[rowNumber].declineInValueAmount, newTaxReturnCFormData.individualDeduction[0].workRealtedCareExpenses[rowNumber].otherAmountToClaim, rowNumber);

        //Edit Tax Return IForm Deduction Gifts or Donations
        var rowNumber = 0;
        commonFunctions.editTaxReturn_IForm_Deduction_GiftsOrDonations(newTaxReturnCFormData.individualDeduction[0].giftsOrDonations[rowNumber].describeTheGifts, newTaxReturnCFormData.individualDeduction[0].giftsOrDonations[rowNumber].amountToClaim, rowNumber);

        commonFunctions.saveDataEntry();
        commonFunctions.displayHomePage();
        commonFunctions.logoutHTC();
      
    })
    
    
    
    
    /*
    it('Edit Tax Return - IForm - Income Tests and Spouse Details', () => {

        //Launch THC QA
        commonFunctions.launchHTC(loginPage.url);

        //Login HTC QA as Ben
        commonFunctions.loginHTC(loginuserdetails.email, loginuserdetails.password, loginuserdetails.firstName);

        //Display Tax Return form
        commonFunctions.displayTaxReturnForm(newTaxReturnCFormData.individualIncome[0].clientRef, newTaxReturnCFormData.individualIncome[0].formType);

        //Edit Tax Return IForm - Income Tests
        commonFunctions.editTaxReturn_IForm_IncomeTestsAndSpouseDetails(newTaxReturnCFormData.incomeTestAndSpouseDetails.incomeTest.numberOfDependantChildren, newTaxReturnCFormData.incomeTestAndSpouseDetails.spouseDetails.surname, newTaxReturnCFormData.incomeTestAndSpouseDetails.spouseDetails.firstGivenName, newTaxReturnCFormData.incomeTestAndSpouseDetails.spouseDetails.otherGivenName, newTaxReturnCFormData.incomeTestAndSpouseDetails.spouseDetails.dob, newTaxReturnCFormData.incomeTestAndSpouseDetails.spouseDetails.gender, newTaxReturnCFormData.incomeTestAndSpouseDetails.spouseDetails.spouseForTheFullYear, newTaxReturnCFormData.incomeTestAndSpouseDetails.spouseDetails.spouseDieDuringTheYear, newTaxReturnCFormData.incomeTestAndSpouseDetails.spouseDetails.spouseIncome.prefillDetials, newTaxReturnCFormData.incomeTestAndSpouseDetails.spouseDetails.spouseIncome.taxableIncome, newTaxReturnCFormData.incomeTestAndSpouseDetails.spouseDetails.spouseIncome.employersExamptForFBT, newTaxReturnCFormData.incomeTestAndSpouseDetails.spouseDetails.spouseIncome.reportableSuperannuationContributions);

        commonFunctions.saveDataEntry();
        commonFunctions.displayHomePage();
        commonFunctions.logoutHTC();

    })
    */
    it('Edit Tax Return - IForm - Business and Professional Item', () => {

        //Launch THC QA
        commonFunctions.launchHTC(loginPage.url);

        //Login HTC QA as Ben
        commonFunctions.loginHTC(loginuserdetails.email, loginuserdetails.password, loginuserdetails.firstName);

        //Display Tax Return form
        commonFunctions.displayTaxReturnForm(newTaxReturnCFormData.individualIncome[0].clientRef, newTaxReturnCFormData.individualIncome[0].formType);

        //Edit Tax Return IForm - Income Tests
        commonFunctions.editTaxReturn_IForm_BusinessandProfessionalItem();

        commonFunctions.saveDataEntry();
        commonFunctions.displayHomePage();
        commonFunctions.logoutHTC();

    })

    it('Edit Tax Return - IForm - Tax Offset, Medicare and Adjustment', () => {

        //Launch THC QA
        commonFunctions.launchHTC(loginPage.url);

        //Login HTC QA as Ben
        commonFunctions.loginHTC(loginuserdetails.email, loginuserdetails.password, loginuserdetails.firstName);

        //Display Tax Return form
        commonFunctions.displayTaxReturnForm(newTaxReturnCFormData.individualIncome[0].clientRef, newTaxReturnCFormData.individualIncome[0].formType);

        //Edit Tax Return IForm Tax Offset, Medicare and Adjustment
        commonFunctions.editTaxReturn_IForm_MedicareLevyRelatedItems(newTaxReturnCFormData.taxOffsetsMedicareAdjustments[0].medicareLevySurcharge_privatePatientHospitalCover, newTaxReturnCFormData.taxOffsetsMedicareAdjustments[0].medicareLevySurcharge_numberOfDaysNotLiableForSurcharge);

        //Edit private Health Insurance Policy Details
        var rowNumber = 0;
        commonFunctions.editTaxReturn_IForm_PrivateHealthInsurancePolicyDetails(newTaxReturnCFormData.taxOffsetsMedicareAdjustments[0].privateHealthInsurancePolicyDetails[rowNumber].healthInsurerID, newTaxReturnCFormData.taxOffsetsMedicareAdjustments[0].privateHealthInsurancePolicyDetails[rowNumber].membershipNo, newTaxReturnCFormData.taxOffsetsMedicareAdjustments[0].privateHealthInsurancePolicyDetails[rowNumber].premiumsEligibleForAusGovRebate, newTaxReturnCFormData.taxOffsetsMedicareAdjustments[0].privateHealthInsurancePolicyDetails[rowNumber].ausGovRebateReceived, newTaxReturnCFormData.taxOffsetsMedicareAdjustments[0].privateHealthInsurancePolicyDetails[rowNumber].benefitCode, newTaxReturnCFormData.taxOffsetsMedicareAdjustments[0].privateHealthInsurancePolicyDetails[rowNumber].taxClaimCode, rowNumber);

        //Edit Tax Return IForm - Income Tests
        commonFunctions.editTaxReturn_IForm_IncomeTestsAndSpouseDetails(newTaxReturnCFormData.incomeTestAndSpouseDetails.incomeTest.numberOfDependantChildren, newTaxReturnCFormData.incomeTestAndSpouseDetails.spouseDetails.surname, newTaxReturnCFormData.incomeTestAndSpouseDetails.spouseDetails.firstGivenName, newTaxReturnCFormData.incomeTestAndSpouseDetails.spouseDetails.otherGivenName, newTaxReturnCFormData.incomeTestAndSpouseDetails.spouseDetails.dob, newTaxReturnCFormData.incomeTestAndSpouseDetails.spouseDetails.gender, newTaxReturnCFormData.incomeTestAndSpouseDetails.spouseDetails.spouseForTheFullYear, newTaxReturnCFormData.incomeTestAndSpouseDetails.spouseDetails.spouseDieDuringTheYear, newTaxReturnCFormData.incomeTestAndSpouseDetails.spouseDetails.spouseIncome.prefillDetials, newTaxReturnCFormData.incomeTestAndSpouseDetails.spouseDetails.spouseIncome.taxableIncome, newTaxReturnCFormData.incomeTestAndSpouseDetails.spouseDetails.spouseIncome.employersExamptForFBT, newTaxReturnCFormData.incomeTestAndSpouseDetails.spouseDetails.spouseIncome.reportableSuperannuationContributions);

        commonFunctions.saveDataEntry();
        commonFunctions.displayHomePage();
        commonFunctions.logoutHTC();


    })
    /*
    
    it('Edit Tax Return - IForm - Download and Validate Prefill Report', () => {

        //Launch THC QA
        commonFunctions.launchHTC(loginPage.url);

        //Login HTC QA as Ben
        commonFunctions.loginHTC(loginuserdetails.email, loginuserdetails.password, loginuserdetails.firstName);

        //Display Tax Return form
        commonFunctions.displayTaxReturnForm(newTaxReturnCFormData.individualIncome[0].clientRef, newTaxReturnCFormData.individualIncome[0].formType);

        //Download and Validate Prefill Report
        commonFunctions.downloadAndValidatePrefillReport();

        commonFunctions.displayHomePage();
        commonFunctions.logoutHTC();

    })*/
})