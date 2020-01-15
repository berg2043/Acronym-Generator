const passport = require('passport');
const LocalStrategy = require('passport-local');
const encryptLib = require('../modules/ecryption');
const pool = require('../modules/pool');

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser((id, done) => {
  pool.query(`SELECT * FROM "user" WHERE "id" = $1;`, [id]).then(result => {
    const user = result && result.rows && result.rows[0];

    if (user){
      // removes password to prevent it being sent
      delete user.password;
      done(null, user);      
    } else {
      done(null, null);
    }
  }).catch(err=>{
    console.log('err deserializing', err);
    done(err, null);
  });
});

passport.use('local', new LocalStrategy((username, password, done) => {
  pool.query(`SELECT * FROM "user" WHERE username = $1;`, [username]).then(result => {
    const user = result && result.rows && result.rows[0];
    if(user && encryptLib.comparePassword(password, user.password)) {
      done(null, user);
    } else {
      done(null, null);
    }
  }).catch((err)=>{
    console.log('error matching user password', err);
    done(err, null);
  });
}));

module.exports = passport;