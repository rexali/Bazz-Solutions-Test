/**
 * HTML message for registration of new user
 * @param {string} email - email address
 * @param {string} code - randomly generated code
 * @returns string of text
 */
function regHTMLMSQ(email, code) {

    try {
        
        return `
        <html>
        <body>
        <h1 style="color:green;">Hi there! Please confirm your email now</h1>
        <p style="font-size:18px;">
        Welcome, looking forward to taking care of your needs as soon as possible.
        </P>
        <p style="font-size:18px;">
        Please confirm your email to start placing order, click this link: 
        <a href="https://express.mujaware.com/?random_code=${code}&emailAddress=${email}">
        Confirm
        </a>
        </p>
        <p style="font-size:18px;">Thank you.</P>
        </body>
        </html>
        `;
    } catch (error) {
        console.warn(error);
    }
   
}

module.exports = {
    regHTMLMSQ
}