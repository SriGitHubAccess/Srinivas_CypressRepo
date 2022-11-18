class PracticeSettings {
    lable_PracticeSettins() {
        return cy.get('h4').contains('Practice Settings ');
    }

    tab_Agents() {
        return cy.get('div#Agents');
    }

    dropdown_Practice() {
        return cy.xpath("//div[@id='dxPracticeSelectMenuLocationBtn']");
    }

    dropdown_DafultIncomeTaxAgent() {
        return cy.get('div[id="ITAgentSelectBox"]');
    }

    button_Save() {
        return cy.get('input[value="Save"]');
    }

    button_Cancel() {
        return cy.get('input[value="Cancel"]');
    }
}

export default PracticeSettings;