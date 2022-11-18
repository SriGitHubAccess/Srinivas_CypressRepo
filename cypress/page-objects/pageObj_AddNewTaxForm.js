class PageObj_AddNewTaxForm {

    formTitle() {
        return cy.get('h4').contains('Add New Tax Form');
    }

    dropdown_FormType() {
        return cy.get('div#TaxFormFormTypesMenuLocation');
    }

    input_FormType() {
        return cy.xpath("//div[@id='TaxFormFormTypes']//input[@class='dx-texteditor-input']");
    }
    input_FormType_Selection(formType) {
        return cy.xpath("//span[@class='dx-menu-item-text' and contains(.,'" + formType + "')]");
    }
    input_FromDate() {
        return cy.get('div#fromDate');
    }

    input_toDate() {
        return cy.get('div#toDate');
    }

    checkbox_Resident() {
        return cy.xpath("//div[@dx-check-box='modalOptions.CustomModelOptions.ctrlConfig.ResidentCheckBox']");
    }

    checkbox_Prefill() {
        return cy.xpath("//div[@dx-check-box='modalOptions.CustomModelOptions.ctrlConfig.PrefillCheckBox']");
    }

    dropdown_Agent() {
        return cy.get('div[dx-select-box="modalOptions.CustomModelOptions.ctrlConfig.AgentSelectBox"]');
    }

    button_Save() {
        return cy.get('input[value=Save]');
    }

    dropdown_status() {
        return cy.xpath("//div[@dx-select-box='modalOptions.CustomModelOptions.ctrlConfig.StatusSelectBox']//div[@class='dx-texteditor-buttons-container']");
    }
    dropdown_status_select(status) {
        return cy.xpath("//div[@class='dx-item-content dx-list-item-content' and contains(.,'" + status + "')]");
    }
    button_deletetaxform() {
        return cy.xpath("//a[contains(.,'Delete Tax form')]");
    }
    button_deleteconfirm_yes() {
        return cy.xpath("//input[@value='Yes']");
    }
}

export default PageObj_AddNewTaxForm;