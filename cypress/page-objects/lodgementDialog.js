class lodgementDialog {
    
    button_Submit() {
        return cy.xpath("//input[(@type='button') and (@value='Submit')]");
    }
    button_Cancel() {
        return cy.xpath("//input[(@type='button') and (@value='Cancel')]");
    }
    button_LodgementList() {
        return cy.xpath("//input[(@type='button') and (@value='LodgementList')]");
    }
    lodgement_successmessage() {
        return cy.xpath("//span[contains(.,'Process complete: 1 accepted, 0 rejected, 0 failed')]");
    }
    
}

export default lodgementDialog;