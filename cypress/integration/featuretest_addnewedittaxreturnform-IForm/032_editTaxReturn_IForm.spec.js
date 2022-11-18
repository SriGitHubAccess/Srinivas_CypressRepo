
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

describe('Edit Tax Return - IForm', () => {

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
    
                cy.log('newTaxReturnIFormData.clientRef= ' + newTaxReturnIFormData.clientRef);
    
            })
    
      })
    
    
   it('Edit Tax Return - IForm - Income - Salary and Gross Interest', () => {
        
        //Launch THC QA
        commonFunctions.launchHTC(loginPage.url);

        //Login HTC QA as Ben
       commonFunctions.loginHTC(loginuserdetails.email, loginuserdetails.password, loginuserdetails.firstName);

        //Display Tax Return form
       commonFunctions.displayTaxReturnForm(newTaxReturnIFormData.individualIncome[0].clientRef, newTaxReturnIFormData.individualIncome[0].formType);
       var rowNumber=0;

       //Edit Tax Return - I Form - Income - Salary and Wages
       rowNumber = 0;
       commonFunctions.editTaxReturn_IForm_Income_SalaryOrWages(newTaxReturnIFormData.individualIncome[0].occupation, newTaxReturnIFormData.individualIncome[0].occupationCode, newTaxReturnIFormData.individualIncome[0].payment[rowNumber].payerABN, newTaxReturnIFormData.individualIncome[0].payment[rowNumber].payerName, newTaxReturnIFormData.individualIncome[0].payment[rowNumber].taxWithheld, newTaxReturnIFormData.individualIncome[0].payment[rowNumber].grossPay, rowNumber);
       rowNumber = 1;
       commonFunctions.editTaxReturn_IForm_Income_SalaryOrWages(null, null, newTaxReturnIFormData.individualIncome[0].payment[rowNumber].payerABN, newTaxReturnIFormData.individualIncome[0].payment[rowNumber].payerName, newTaxReturnIFormData.individualIncome[0].payment[rowNumber].taxWithheld, newTaxReturnIFormData.individualIncome[0].payment[rowNumber].grossPay, rowNumber);

        //Edit Tax Return - I Form - Income - Gross Income
        rowNumber = 0;
        commonFunctions.editTaxReturn_IForm_Income_GrossInterest(newTaxReturnIFormData.individualIncome[0].grossInterest[rowNumber].grossInterest_Bank, newTaxReturnIFormData.individualIncome[0].grossInterest[rowNumber].grossInterest_branch, newTaxReturnIFormData.individualIncome[0].grossInterest[rowNumber].grossInterest_AccountNumber, newTaxReturnIFormData.individualIncome[0].grossInterest[rowNumber].grossInterest_AccountHolder, newTaxReturnIFormData.individualIncome[0].grossInterest[rowNumber].grossInterest_TFNAmountWithheldTotal, newTaxReturnIFormData.individualIncome[0].grossInterest[rowNumber].grossInterest_TFNAmountWithheldYourShare, newTaxReturnIFormData.individualIncome[0].grossInterest[rowNumber].grossInterest_GrossInterest, newTaxReturnIFormData.individualIncome[0].grossInterest[rowNumber].grossInterest_grossInterestyourShare, rowNumber);
       

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
        commonFunctions.displayTaxReturnForm(newTaxReturnIFormData.individualIncome[0].clientRef, newTaxReturnIFormData.individualIncome[0].formType);
        var rowNumber = 0;

       
        //Edit Tax Return - I Form - Income - Super Lump Sum Schedule
        rowNumber = 0;
        commonFunctions.editTaxReturn_IForm_Income_SuperLumpSumSchedule(newTaxReturnIFormData.individualIncome[0].superLumpSumSchedulePayment[rowNumber].superLumpSumSchedule_PaymentDate, newTaxReturnIFormData.individualIncome[0].superLumpSumSchedulePayment[rowNumber].superLumpSumSchedule_TaxWithheld, newTaxReturnIFormData.individualIncome[0].superLumpSumSchedulePayment[rowNumber].superLumpSumSchedule_TaxedComponent_TaxedElement, newTaxReturnIFormData.individualIncome[0].superLumpSumSchedulePayment[rowNumber].superLumpSumSchedule_TaxedComponent_UntaxedElement, newTaxReturnIFormData.individualIncome[0].superLumpSumSchedulePayment[rowNumber].superLumpSumSchedule_TaxableComponent_TaxFreeComponent, newTaxReturnIFormData.individualIncome[0].superLumpSumSchedulePayment[rowNumber].superLumpSumSchedule_DeathBenefit, newTaxReturnIFormData.individualIncome[0].superLumpSumSchedulePayment[rowNumber].superLumpSumSchedule_PayerABN, newTaxReturnIFormData.individualIncome[0].superLumpSumSchedulePayment[rowNumber].superLumpSumSchedule_PayerName, newTaxReturnIFormData.individualIncome[0].superLumpSumSchedule_ContactPerson, newTaxReturnIFormData.individualIncome[0].superLumpSumSchedule_ContactNumberAreaCode, newTaxReturnIFormData.individualIncome[0].superLumpSumSchedule_ContactNumber, rowNumber);

       
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
        commonFunctions.displayTaxReturnForm(newTaxReturnIFormData.individualIncome[0].clientRef, newTaxReturnIFormData.individualIncome[0].formType);

        //Edit Tax Return IForm Deduction Work Related Car Expense
        var rowNumber = 0;
        commonFunctions.editTaxReturn_IForm_Deduction_WorkRelatedCarExpense(newTaxReturnIFormData.individualDeduction[0].workRealtedCareExpenses[rowNumber].carExpenseDescription, newTaxReturnIFormData.individualDeduction[0].workRealtedCareExpenses[rowNumber].carExpenseActionCode, newTaxReturnIFormData.individualDeduction[0].workRealtedCareExpenses[rowNumber].carExpenseKm, newTaxReturnIFormData.individualDeduction[0].workRealtedCareExpenses[rowNumber].businessPercentageBeingClaimed, newTaxReturnIFormData.individualDeduction[0].workRealtedCareExpenses[rowNumber].declineInValueAmount, newTaxReturnIFormData.individualDeduction[0].workRealtedCareExpenses[rowNumber].otherAmountToClaim, rowNumber);

        //Edit Tax Return IForm Deduction Gifts or Donations
        var rowNumber = 0;
        commonFunctions.editTaxReturn_IForm_Deduction_GiftsOrDonations(newTaxReturnIFormData.individualDeduction[0].giftsOrDonations[rowNumber].describeTheGifts, newTaxReturnIFormData.individualDeduction[0].giftsOrDonations[rowNumber].amountToClaim, rowNumber);

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
        commonFunctions.displayTaxReturnForm(newTaxReturnIFormData.individualIncome[0].clientRef, newTaxReturnIFormData.individualIncome[0].formType);

        //Edit Tax Return IForm - Income Tests
        commonFunctions.editTaxReturn_IForm_IncomeTestsAndSpouseDetails(newTaxReturnIFormData.incomeTestAndSpouseDetails.incomeTest.numberOfDependantChildren, newTaxReturnIFormData.incomeTestAndSpouseDetails.spouseDetails.surname, newTaxReturnIFormData.incomeTestAndSpouseDetails.spouseDetails.firstGivenName, newTaxReturnIFormData.incomeTestAndSpouseDetails.spouseDetails.otherGivenName, newTaxReturnIFormData.incomeTestAndSpouseDetails.spouseDetails.dob, newTaxReturnIFormData.incomeTestAndSpouseDetails.spouseDetails.gender, newTaxReturnIFormData.incomeTestAndSpouseDetails.spouseDetails.spouseForTheFullYear, newTaxReturnIFormData.incomeTestAndSpouseDetails.spouseDetails.spouseDieDuringTheYear, newTaxReturnIFormData.incomeTestAndSpouseDetails.spouseDetails.spouseIncome.prefillDetials, newTaxReturnIFormData.incomeTestAndSpouseDetails.spouseDetails.spouseIncome.taxableIncome, newTaxReturnIFormData.incomeTestAndSpouseDetails.spouseDetails.spouseIncome.employersExamptForFBT, newTaxReturnIFormData.incomeTestAndSpouseDetails.spouseDetails.spouseIncome.reportableSuperannuationContributions);

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
        commonFunctions.displayTaxReturnForm(newTaxReturnIFormData.individualIncome[0].clientRef, newTaxReturnIFormData.individualIncome[0].formType);

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
        commonFunctions.displayTaxReturnForm(newTaxReturnIFormData.individualIncome[0].clientRef, newTaxReturnIFormData.individualIncome[0].formType);

        //Edit Tax Return IForm Tax Offset, Medicare and Adjustment
        commonFunctions.editTaxReturn_IForm_MedicareLevyRelatedItems(newTaxReturnIFormData.taxOffsetsMedicareAdjustments[0].medicareLevySurcharge_privatePatientHospitalCover, newTaxReturnIFormData.taxOffsetsMedicareAdjustments[0].medicareLevySurcharge_numberOfDaysNotLiableForSurcharge);

        //Edit private Health Insurance Policy Details
        var rowNumber = 0;
        commonFunctions.editTaxReturn_IForm_PrivateHealthInsurancePolicyDetails(newTaxReturnIFormData.taxOffsetsMedicareAdjustments[0].privateHealthInsurancePolicyDetails[rowNumber].healthInsurerID, newTaxReturnIFormData.taxOffsetsMedicareAdjustments[0].privateHealthInsurancePolicyDetails[rowNumber].membershipNo, newTaxReturnIFormData.taxOffsetsMedicareAdjustments[0].privateHealthInsurancePolicyDetails[rowNumber].premiumsEligibleForAusGovRebate, newTaxReturnIFormData.taxOffsetsMedicareAdjustments[0].privateHealthInsurancePolicyDetails[rowNumber].ausGovRebateReceived, newTaxReturnIFormData.taxOffsetsMedicareAdjustments[0].privateHealthInsurancePolicyDetails[rowNumber].benefitCode, newTaxReturnIFormData.taxOffsetsMedicareAdjustments[0].privateHealthInsurancePolicyDetails[rowNumber].taxClaimCode, rowNumber);

        //Edit Tax Return IForm - Income Tests
        commonFunctions.editTaxReturn_IForm_IncomeTestsAndSpouseDetails(newTaxReturnIFormData.incomeTestAndSpouseDetails.incomeTest.numberOfDependantChildren, newTaxReturnIFormData.incomeTestAndSpouseDetails.spouseDetails.surname, newTaxReturnIFormData.incomeTestAndSpouseDetails.spouseDetails.firstGivenName, newTaxReturnIFormData.incomeTestAndSpouseDetails.spouseDetails.otherGivenName, newTaxReturnIFormData.incomeTestAndSpouseDetails.spouseDetails.dob, newTaxReturnIFormData.incomeTestAndSpouseDetails.spouseDetails.gender, newTaxReturnIFormData.incomeTestAndSpouseDetails.spouseDetails.spouseForTheFullYear, newTaxReturnIFormData.incomeTestAndSpouseDetails.spouseDetails.spouseDieDuringTheYear, newTaxReturnIFormData.incomeTestAndSpouseDetails.spouseDetails.spouseIncome.prefillDetials, newTaxReturnIFormData.incomeTestAndSpouseDetails.spouseDetails.spouseIncome.taxableIncome, newTaxReturnIFormData.incomeTestAndSpouseDetails.spouseDetails.spouseIncome.employersExamptForFBT, newTaxReturnIFormData.incomeTestAndSpouseDetails.spouseDetails.spouseIncome.reportableSuperannuationContributions);

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
        commonFunctions.displayTaxReturnForm(newTaxReturnIFormData.individualIncome[0].clientRef, newTaxReturnIFormData.individualIncome[0].formType);

        //Download and Validate Prefill Report
        commonFunctions.downloadAndValidatePrefillReport();

        commonFunctions.displayHomePage();
        commonFunctions.logoutHTC();

    })*/
})