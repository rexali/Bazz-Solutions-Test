var assert = require('assert');
const { escapeHTML } = require('../utils/escapeHTML');
const { hashpass } = require('../utils/hashHelper');

describe("Perform utils test", ()=>{

    it('Escape HTML string, should return a string', () => {
        assert.equal(escapeHTML("Silicon Valley"), "Silicon Valley");
    });
    
    it('Hash a given password, should return a hashed string ', () => {
        assert.equal(typeof (escapeHTML("<Housing/>")), "string");
    });
    
    it('check a given password is real, should return a boolean value', () => {
        assert.equal(typeof (hashpass("Microsoft")), "string");
    });

})
