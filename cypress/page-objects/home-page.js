class HomePage {

    htclogo() {
        return cy.xpath("//img[starts-with(@src, 'Content/images/access/Access HandiTax Cloud Logo White_RGB.png')]");
    }

    firstNameLable() {
        return cy.get('[style="float: right; padding-top: 7px"] > .ng-binding', {timeout: 15000}).should('be.visible');
    }

    button_AddClient() {
        return cy.get('div#AddNewClientBtn');
    }

    button_LogoutHTC() {
        return cy.get('img[title=Logout]');
    }

    input_Search() {
        return cy.xpath('//div[@aria-label="Search in data grid"]//input');
    }

    button_PracticeSetting() {
        return cy.get("img[title='Practice Settings']");
    }
    checkbox_Taxform(year, formtype) {

        return cy.xpath("//tr[contains(.,'" + formtype + "') and contains(.,'" + year + "')]/td[2]");
    }
    button_Lodge() {
        return cy.xpath("//span[contains(.,'Test Lodge [1]')]");
    }
    button_edit_taxform_click(year, formtype) {
        cy.xpath("//tr[contains(.,'" + formtype + "') and contains(.,'" + year + "')]").invoke('index').then((i) => {
            console.log(i);
            //return cy.xpath("//img[@title='Edit Tax Form']").eq(i);
            cy.xpath("(//img[@title='Edit Tax Form'])[" + i + "]").click({ force: true });
        })
    }
    button_checkbox_taxform_click(year, formtype) {
        cy.xpath("//tr[contains(.,'" + formtype + "') and contains(.,'" + year + "')]").invoke('index').then((i) => {
            console.log(i);
            //return cy.xpath("//img[@title='Edit Tax Form']").eq(i);
            i = i +1;
            cy.xpath("(//span[@class='dx-checkbox-icon'])[" + i + "]").click({ force: true });
        })
    }
};

export default HomePage;