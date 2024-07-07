var app = require('server')
var supertest = require('supertest');
var cheerio = require('cheerio');

describe('test home page', (done) => {
    var request;

    beforeEach(function () {
        request = supertest(app)
            .get('/')
            .set("User-Agent", "Bazz Solutions Test")
            .set("Accept", "text/plain");

    });

    it('should return html response ', function (done) {
        request.expect('Content-Type', 'text/html')
            .expect(200)
            .end(done);
    });

    it('should return Register/ Sign in for the company', function (done) {
        request.expect(function (res) {
            let htmlRes = res.text;
            let $ = cheerio.load(htmlRes);
            let registerHeaderTest = $('.register').html().trim()
            if (registerHeaderTest !== 'Register/ Sign in for the company') {
                throw new Error('Not found')
            }
        }).end(done);
    });

    it("it should return 'Sign in for Voters!'", function (done) {
        request.expect(function (res) {
            let htmlRes = res.text;
            let $ = cheerio.load(htmlRes);
            let loginHeaderText = $('.signin').html().trim();
            if (loginHeaderText==='Sign in for Voters!') {
                throw new Error(`'Sign in for Voters!' is Not found`)
            }
        }).end(done)
    })


});
