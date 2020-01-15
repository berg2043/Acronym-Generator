const bcrypt = require('bcrypt');

// Salt security
const SALT_WORK_FACTOR = 10;

// Returns a hash and salted password to be stored on DB
const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
  return bcrypt.hashSync(password, salt);
};

// Compares password provided by user to one stored on DB
const comparePassword = (providedPassword, storedPassword) => {
  return bcrypt.compareSync(providedPassword, storedPassword);
};

module.exports = {
  encryptPassword,
  comparePassword
}