/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */


const { timeStamp } = require('console');
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');  
const exec = require('child_process').execSync;  
module.exports = (on,config) => {  
    
  /*  on('before:browser:launch', (browser, options) => {
        return useFixedBrowserLaunchSize(browser, options, config)
    });*/
    
    on('before:run', async (details) => {  
            console.log('override before:run');  
            await beforeRunHook(details);  
            //If you are using other than Windows remove below two lines  
           
            await exec("IF EXIST cypress\\reports rmdir /Q /S cypress\\reports >prerun-output")
            await exec("IF EXIST cypress\\videos rmdir /Q /S cypress\\videos >prerun-output")
            await exec("IF EXIST cypress\\results rmdir /Q /S cypress\\results >prerun-output")
            await exec("if not exist cypress\\reports\\log mkdir cypress\\reports\\log >prerun-output")
            await exec("if not exist cypress\\archive-reports mkdir cypress\\archive-reports >prerun-output")
        });

        on('after:run', async () => {  
            console.log('override after:run');  
            //if you are using other than Windows remove below line starts with await exec  
            // cy.task must return something, cannot return undefined
            
            await exec("npx jrm ./cypress/reports/dochubtest-combinedjunitreport.xml ./cypress/reports/junit/*.xml"); 
            
           // archive reports

            await afterRunHook();  
            await exec("xcopy /E /H /C /I /Y cypress\\reports\\*.xml cypress\\archive-reports\\"); 
            await exec("xcopy /E /H /C /I /Y cypress\\reports\\*.html cypress\\archive-reports\\"); 

        });  

        on('task', {
            log(message) {
                console.log(message)
                return null
            },
        });

};

  function  useFixedBrowserLaunchSize (browser, options) {
      if (browser.family === 'firefox') {
        // (height must account for firefox url bar, which we can only shrink to 1px)
        options.args.push(
          '-width', '1280', '-height', '721',
        )
      } else if (browser.name === 'electron') {
        options.preferences.width = 1280
        options.preferences.height = 720
      } else if (browser.family === 'chromium') {
        options.args.push('--window-size=1280,720')
      }
    return options
  }

  function getUTC() {
    const now = new Date()
    return now.toISOString()
  }
