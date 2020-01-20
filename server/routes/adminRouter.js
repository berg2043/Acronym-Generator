const express = require('express');
const pool = require('./../modules/pool');
const { rejectUnauthenticated } = require('../modules/authenticationMiddleware');

const router = express.Router();

// Gets list of words flagged for removal by users
router.get('/', rejectUnauthenticated, async (req,res)=>{
  try {
    const admin = await pool.query(`SELECT "admin" FROM "user" WHERE "id" = $1;`, [req.session.passport.user]);
    console.log(admin.rows[0]);
    // if(!admin){
    //   res.sendStatus(403);
    //   break;
    // }
    const queryText = `
      SELECT "w"."id", "w"."word", LENGTH("w"."word") FROM "removals" "r"
      JOIN "words" w ON "r"."id" = "w"."id"
      ORDER BY "w"."word";
    `
    const removals = await pool.query(queryText);
    console.log(removals.rows);
    res.send(removals.rows);
  } catch (error) {
    res.sendStatus(500);
    cosnole.log(err);
  }
});

module.exports = router;