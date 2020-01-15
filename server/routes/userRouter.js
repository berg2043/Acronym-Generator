const express = require('express');
const { rejectUnauthenticated } = require('../modules/authenticationMiddleware')
const encryptLib = require('../modules/ecryption');
const userStrategy = require('../strategies/userStrategy');
const pool = require('./../modules/pool');

const router = express.Router();

// Responds if user is authenticated or not
router.get('/', rejectUnauthenticated, (req, res)=>{
  res.send(req.user)
});

// Registers users
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const queryText = `INSERT INTO "user" (username, password) VALUES($1, $2);`;
  pool.query(queryText, [username, password]).then(()=>{
    res.sendStatus(201)
  }).catch(err=>{
    console.log(err);
    res.sendStatus(500);
  });
});

// Logs users in
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// Clear all server session information about this user
router.post('/logout', (req, res) => {
  req.logout();
  res.sendStatus(200);
});

module.exports = router;