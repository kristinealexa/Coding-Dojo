const express = require("express");
const app = express();
const port = 8000;
const { faker } = require('@faker-js/faker');


const createUser = () => {
    const tempUserObj = {
        password: faker.internet.password(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        lastName: faker.person.lastName(),
        firstName: faker.person.firstName(),
        _id: faker.string.uuid()
    }
    return tempUserObj;
}

app.get("/api/users/new", (req, res) => {
    res.json(createUser());
});

const createCompany = () => {
    const tempCompanyObj = {
        _id: faker.string.uuid(),
        name: faker.company.name(),
        addressStreet: faker.location.streetAddress(),
        addressCity: faker.location.city(),
        addressState: faker.location.state(),
        addressZipcode:faker.location.zipCode(),
        addressCountry: faker.location.country()
    }
    return tempCompanyObj;
}

app.get("/api/companies/new", (req,res) => {
    res.json(createCompany());
});

app.get("/api/user/company", (req,res) => {
    res.json({user:createUser(), company:createCompany()});
});

app.listen( port, () => console.log(`Listening on port: ${port}`) );