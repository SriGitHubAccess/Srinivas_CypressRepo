class pageObj_IForm_BusinessAndProfessionalItems {

    //////////////// Income Test //////////////////
    textbox_taxAgentDeclarationDate() {
        return cy.xpath("//div[@data-title='Declaration date - BLANK for auto.']");
    }
    textbox_taxAgentTelephoneNumber() {
        return cy.xpath("//input[@title='Daytime contact telephone - BLANK for auto entry or override default setup.']");
    }


};

export default pageObj_IForm_BusinessAndProfessionalItems;