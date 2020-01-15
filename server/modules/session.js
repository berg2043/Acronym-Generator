const cookieSession = require('cookie-session');

// Checks the security of the secret or if it is even set
const secretCheck = () =>{
  if(
    !process.env.SERVER_SESSION_SECRET ||
    process.env.SERVER_SESSION_SECRET.length < 8
  ){
    console.log(`
      Your current session secret is insecure. Please ensure that you not only
      have a .env file but that the file includes a SERVER_SESSION_SECRT which is
      greater than 8 characters.  I recommend that it uses a collection of numbers,
      symbols, uppercase letters, and lowercase letters.
    `)
  }
  return process.env.SERVER_SESSION_SECRET
};

module.exports = cookieSession({
  secret: secretCheck() || 'secret', //default value if not set
  key: 'user',
  resave: 'false',
  saveUnitialized: false,
  maxAge: 60*60*1000, // 1 hour
  secure: false
});