var expect = require('chai').expect;
var app = require('app');
var supertest = require('supertest');

describe('All voter routes and api', async () => {

    var request;
    var jwtoken;
    var result = await fetch('/jwt');
    var json_data = await result.json();
    jwtoken = json_data.jwtoken


    before((done) => {
        // runs once before the first test in this block
        Console.log("Start of the Rest Cases ===========")
    });

    beforeEach(function () {
        request = supertest(app)
            .set("User-Agent", "Bazz Solutions")
            .set("Accept", "application/json")
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer' + jwtoken)
    });



    it('Get JWT-TOKEN, should return a JsonWebToken string', (done) => {

        request = supertest(app)
            .get('/jwt')
            .expect(function (res) {
                let { status, message, data} = res.body; // destructure response body
                expect(res.status).equal(200);
                expect(status).to.equal('success');
                expect(message).to.equal('jwtoken successful!!!');
                expect(data).not.undefined;
            }).end(done)
    })


    it('Register an admin, should return a candidate data', (done) => {
        const formData = {
            username: '',
            email: '', // enter email
            password: '' // enter password
        }
        request = supertest(app)
            .post('/auth/register')
            .send(formData)
            .expect(function (res) {
                let { status, message, data } = res.body; // destructure response
                expect(res.status).equal(200);
                expect(status).to.equal('success');
                expect(message).to.equal('mail sent successfully!!!');
                expect(data.id).not.undefined;
            }).end(done)
    })


    it('Authenticate admin user, should return authenticated data', () => {
        const formData = {
            email: '', // enter email in the database
            password: '' // enter password in the database
        }
        request = supertest(app)
            .post('/auth/login')
            .send(formData)
            .expect(function (res) {
                let { status, message, data } = res.body; // destructure response
                expect(res.status).equal(200);
                expect(status).to.equal('success');
                expect(message).to.equal('user authenticated!!!');
                expect(data.id).is.not.undefined;
                expect(data.email).is.not.undefined;
            }).end(done);
    })


    it('Get admin profile, should return admin profile data ', () => {
        const formData = {
            userId: '', // enter userId
        }
        request = supertest(app)
            .post('/profile/me')
            .send(formData)
            .expect(function (res) {
                let { status, message, data } = res.body; // destructure response
                expect(res.status).equal(200);
                expect(status).to.equal('success');
                expect(message).to.equal('user authenticated!!!');
                expect(data.id).is.not.undefined;
                expect(data.email).is.not.undefined;
            }).end(done);
    })

    it('Update admin profile, should return admin profile data ', () => {
        const formData = {
            userId: '', // enter userId
            username: '',
            email: '',
            date_of_birth: '',
            permanent_address: '',
            present_address: '',
            city: '',
            postal_code: '',
            country: ''
        }
        request = supertest(app)
            .patch('/profile/me')
            .send(formData)
            .expect(function (res) {
                let { status, message, data } = res.body; // destructure response
                expect(res.status).equal(200);
                expect(status).to.equal('success');
                expect(message).to.equal('user authenticated!!!');
                expect(data.id).is.not.undefined;
                expect(data.email).is.not.undefined;
            }).end(done);
    })

    afterEach(function () {
        // runs after each test in this block
        Console.log(" ==========================")
    });

    after(function () {
        // runs once after the last test in this block
        Console.log("End of the test cases ===========")
    });


})