describe('Example to demonstrate file upload in cypress', function () {
    before(function () {
        cy.visit('https://the-internet.herokuapp.com/upload')
    })

    it('File Upload using cypress-file-upload npm package', () => {
        //const filepath = 'TextFile1.txt'
        const filepath = 'ImageFile1.bmp';
        cy.get('input[type="file"]').attachFile(filepath);
        cy.get('#file-submit').click();
        cy.get('#uploaded-files').contains(filepath);
        cy.get('h3').should('contain', 'File Uploaded!');


    })

})

