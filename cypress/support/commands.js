// JavaScript source code
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-file-upload';

import { userlogin } from "../fixtures/";


Cypress.Commands.add('checkIfElementExists', (strElementPath) => {
    //return document.querySelectorAll(ele).length;

    cy.get("body").then(($body) => {
        // synchronously query for element
        if ($body.find(strElementPath).length>=1) {
            cy.get(strElementPath).should('be.visible');
            return true;
        } else {
            return false;
        }
    })
})


Cypress.Commands.add('getPdfContent', () => {
    const fs = require('fs');
    const pdf = require('pdf-parse');

    var path = require('path');
    path.normalize('c:/test1.pdf');

    let dataBuffer = fs.readFileSync(path);

    pdf(dataBuffer).then(function (data) {

        // number of pages
        console.log(data.numpages);
        // number of rendered pages
        console.log(data.numrender);
        // PDF info
        console.log(data.info);
        // PDF metadata
        console.log(data.metadata);
        // PDF.js version
        // check https://mozilla.github.io/pdf.js/getting_started/
        console.log(data.version);
        // PDF text
        console.log(data.text);

    });
})

Cypress.Commands.add('configenv_settestdata', (loginuserdetails) => {

            cy.fixture('userlogin-trialloop.json').then((userlogin) => {
                // "this" is still the test context object
                this.userlogin = userlogin;
                const data = this.userlogin;
                cy.get(data).each((tObject) => {
                    if ((tObject.identifier) === Cypress.env('loginuser') && (tObject.envname) === Cypress.env('envname'))
                    {
                        cy.log('loginuser=' + Cypress.env('loginuser'));
                        cy.log('envname=' + Cypress.env('envname'));
                        
                        loginuserdetails = tObject;
                        Cypress.env('baseUrl', loginuserdetails.baseUrl)
                        Cypress.env('logoutredirectlogin_Url', loginuserdetails.logoutredirectlogin_Url)
                        
                        
                        cy.log('loginuser=' + Cypress.env('loginuser'));
                        cy.log('identifier=' + tObject.identifier);
                        cy.log('baseUrl=' + tObject.baseUrl);
                        cy.log('logoutredirectlogin_Url=' + Cypress.env('logoutredirectlogin_Url'));           
                    }
                    else {
                        cy.log('Condition NOT met');

                    }

                });

            })
            return loginuserdetails;
})