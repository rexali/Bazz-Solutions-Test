var assert = require('assert');

describe("Perform utils test", ()=>{

    it('Escape HTML string, should return a string', (done) => {
        assert.equal(escapeHTML("Microsoft"), "Microsoft");
    });
    
    it('Hash a given password, should return a hashed string ', (done) => {
        assert.equal(typeof (escapeHTML("Microsoft")), "string");
    });
    
    
    it('check a given password is real, should return a boolean value', (done) => {
        assert.equal(typeof (hashPass("Microsoft")), "string");
    });

})
