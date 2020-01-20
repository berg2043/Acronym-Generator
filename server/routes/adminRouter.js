const express = require('express');
const pool = require('./../modules/pool');
const { rejectUnauthenticated } = require('../modules/authenticationMiddleware');

const router = express.Router();

// Gets list of words flagged for removal by users
router.get('/', rejectUnauthenticated, async (req, res) => {
  try {
    const admin = await pool.query(`SELECT "admin" FROM "user" WHERE "id" = $1;`, [req.session.passport.user]);
    if(admin.rows[0].admin){
      const queryText = `
        SELECT "w"."id", "w"."word", LENGTH("w"."word") FROM "removals" "r"
        JOIN "words" w ON "r"."id" = "w"."id"
        ORDER BY "w"."word";
      `
      const removals = await pool.query(queryText);
      res.send(removals.rows);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.sendStatus(500);
    console.log(err);
  };
});

// Adds flagged items
router.post('/', (req, res) => {
  console.log(req.body);
  const queryText = `INSERT INTO "removals" VALUES($1);`;
  pool.query(queryText, [req.body.id]).then(() => {
    res.sendStatus(201);
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
});

// Deletes word from removals
router.delete('/:id', rejectUnauthenticated, async (req, res) => {
  try {
    const admin = await pool.query(`SELECT "admin" FROM "user" WHERE "id" = $1;`, [req.session.passport.user]);
    if(admin.rows[0].admin){
      const queryText = `DELETE FROM "removals" WHERE "id" = $1;`;
      await pool.query(queryText, [req.params.id]);
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.sendStatus(500);
    console.log(err);
  };
});

module.exports = router;