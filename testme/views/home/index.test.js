var app = require('../../../app');
var supertest = require('supertest');
var cheerio = require('cheerio');


describe('Test views', ()=>{
var request = supertest(app);
  beforeEach(function() {
            request.get('/')
                   .set('Accept','application/json')
                   .set('Content-Type','application/json')
  });

it(`home/index.ejs should return 'Hello, the server is runing'`, (done)=>{
          request.expect(200,(res)=>{
             var html_response = res.text;
             var $ = cheerio.load(html_response);
             var serverHomePage = $('.server').html().trim();
             if (serverHomePage!=='Hello, the server is runing') {
                throw new Error('Error!')
             }
          }).end(done);   
});


});
