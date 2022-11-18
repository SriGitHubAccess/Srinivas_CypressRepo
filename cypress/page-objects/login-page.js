class LoginPage {

    url= Cypress.env('baseUrl')

    button_Login() {
        return cy.get('span:contains(Login)')
    }

    input_LoginName() {
        return cy.get('#signInName')
    }

    button_Next() {
        return cy.get('#continue')
    }

    input_Password() {
        return cy.get('#password')
    }

    button_Signin() {
        return cy.get('#continue')
    }

    
};

export default LoginPage;