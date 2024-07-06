const { escape, unescape } = require("html-escaper");
/**
 * Escape html or form input
 * @param {string} value - a string of value
 * @returns a string
 */
function escapeHTML(value) {
    try {
      
        return escape(value);
    } catch (error) {
        
    }
   
}

/**
 * Unscape html or form input
 * @param {string} value - a string of value
 * @returns a string
 */
function unscapeHTML(value) {
    try {

        return unescape(value)
    } catch (error) {
       console.warn(error); 
    }
}  

module.exports={
   escapeHTML,
   unscapeHTML
}