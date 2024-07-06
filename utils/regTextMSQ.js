
/**
 * Text message for change of password
 * @param {string} email - email address
 * @param {string} code - randomly generated code
 * @returns string of text
 */
function regTextMSQ(email, code) {

    try {
        return `
    Hi there! Please confirm your email now.

    Welcome, looking forward to taking care of your needs as soon as possible.

    Please confirm your email to start placing order, copy and paste this link on your browser address bar:

    https://express.mujaware.com/?rCode=${code}&email=${email}
    `;
    } catch (error) {
     console.warn(error);   
    }
   
}

module.exports = {
    regTextMSQ
}