function User(email, password, firstName, lastName,clientref) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.clientref = clientref;

};

const faker = require('faker');
//const benHurr47 = new User("cloudtest47@handisoft.com.au", "Access2021", "Ben", "Hurr");
const randomUser = new User(faker.internet.email(), faker.internet.password(), faker.name.firstName(), faker.name.lastName(), faker.random.number());
//const htcqasuperuser01 = new User('htcqasuperuser01@mailinator.com', 'Access2022', 'Peter', 'Hilander');
//const htcqasuperuser02 = new User('htcqasuperuser02@mailinator.com', 'Access2022', 'John', 'Ebner');
//const htcqasuperuser03 = new User('htcqasuperuser03@mailinator.com', 'Access2022', 'Sarah', 'Brightman');


module.exports = {
    randomUser,
};