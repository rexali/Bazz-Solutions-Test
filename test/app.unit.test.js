var expect = require('assert');
var supertest = require('supertest');
var app = require('../app');
const { assert } = require('console');

async function getJwtToken() {
    var result = await fetch('/jwt');
    return await result.json();
}

describe('Test all the Bazz Solutions Endpoints', async () => {

    var request;
    var userId =2;
    var registerData = {
        username: 'idrisismail', // enter username
        email: 'idrisismail@gmail.com', // enter email
        password: 'manmustwak' // enter password
    }

    before((done) => {
        // runs once before the first test in this block  
        console.log("Start of the Rest Cases ===========");
        done();
    });

    beforeEach(async function (done) {
        getJwtToken().then((result) => {
            request = supertest(app)
                .set("User-Agent", "Bazz Solutions")
                .set("Accept", "application/json")
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer' + result.jwtoken);
        });
        done();
    });

    it('Get JWT-TOKEN, should return a JsonWebToken string', (done) => {

        request = supertest(app)
            .get('/jwt')
            .expect(function (res) {
                let { status, message, data } = res.body; // destructure response body
                assert(res.status, 200);
                assert(status, 'success');
                assert(message, 'jwtoken created');
            }).end(done)
    })


    it('Register an admin, should return a user data', (done) => {
       
        request = supertest(app)
            .post('/auth/register')
            .send(registerData)
            .expect(function (res) {
                let { status, message, data } = res.body; // destructure response
                expect(res.status,200);
                expect(status,'success');
                expect(message,'registration successful');
            }).end(done)
    })


    it('Authenticate admin user, should return authenticated data', (done) => {
        const data = {
            email: registerData.email, // enter email in the database
            password: registerData.password // enter password in the database
        }
        request = supertest(app)
            .post('/auth/login')
            .send(data)
            .expect(function (res) {
                let { status, message, data } = res.body; // destructure response
                userId = data.userId;
                expect(res.status, 200);
                expect(status, 'success');
                expect(message, 'Logged in successfully');
            }).end(done);
    })


    it('Get admin profile, should return admin profile data ', (done) => {
        var profileId = {
            userId,
        }
        request = supertest(app)
            .post('/profile/me')
            .send(profileId)
            .expect(function (res) {
                let { status, message, data } = res.body; // destructure response
                expect(res.status, 200);
                expect(status, 'success');
                expect(message, 'profile collected');
            }).end(done);
    })

    it('Update admin profile, should return admin profile data ', (done) => {
        const profileData = {
            userId, // userId
            username: 'idrisismail',
            email: 'idrisismail@gmail.com',
            date_of_birth: '9/10/1978',
            permanent_address: 'Sokoto',
            present_address: 'Kano',
            city: 'Kano',
            postal_code: '700050',
            country: 'Nigeria'
        }
        request = supertest(app)
            .patch('/profile/me')
            .send(profileData)
            .expect(function (res) {
                let { status, message, data } = res.body; // destructure response
                expect(res.status, 200);
                expect(status, 'success');
                expect(message, 'profile updated');
            }).end(done);
    })

    afterEach(function (done) {
        // runs after each test in this block
        console.log(" ==========================");
        done();
    });

    after(function () {
        // runs once after the last test in this block
        console.log("End of the test cases ===========");
        done();
    });


})