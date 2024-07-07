// var app = require('../app');
// var supertest = require('supertest');
// var cheerio = require('cheerio');

// describe('test server home page', (done) => {
//     var request;

//     beforeEach(function () {
//         request = supertest(app)
//             .get('/')
//             .set("User-Agent", "Bazz Solutions Test")
//             .set("Accept", "text/plain");

//     });

//     it('should return html response ', function (done) {
//         request.expect('Content-Type', "text/html; charset=utf-8")
//             .expect(200)
//             .end(done);
//     });

//     it('should return Bazz Solutions Test', function (done) {
//         request.expect(function (res) {
//             let htmlRes = res.text;
//             let $ = cheerio.load(htmlRes);
//             let registerHeaderTest = $('.title').html().trim()
//             if (registerHeaderTest !== 'Bazz Solutions Test') {
//                 throw new Error('Not found')
//             }
//         }).end(done);
//     });

//     it("it should return 'Hello, the server is runing'", function (done) {
//         request.expect(function (res) {
//             let htmlRes = res.text;
//             let $ = cheerio.load(htmlRes);
//             let loginHeaderText = $('.paragraph').html().trim();
//             if (loginHeaderText === 'the server is runing') {
//                 throw new Error(`'the server is runing' is Not found`)
//             }
//         }).end(done)
//     })


// });
