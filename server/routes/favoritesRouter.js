const express = require('express');
const pool = require('./../modules/pool');
const { rejectUnauthenticated } = require('../modules/authenticationMiddleware');


const router = express.Router();

// Gets favorites from DB
router.get('/', rejectUnauthenticated, (req,res) => {
  const queryText = `
  SELECT "f"."user_id", "w"."word", "f"."word_list" FROM "favorites" as "f"
  JOIN "words" as "w" ON "f"."word_id" = "w"."id"
  WHERE "user_id" = $1 
  ORDER BY "word_id";`;
  pool.query(queryText, [req.session.passport.user]).then(results=>{
    res.send(results.rows);
  }).catch(err=>{
    console.log(err);
  });
});


// Adds new favorites to DB
router.post('/', rejectUnauthenticated, async (req,res) =>{
  const {
    id: wordID,
    wordLists
   } = req.body[Object.keys(req.body)[0]];
  const userID = req.session.passport.user;
  const queryText = `
    INSERT INTO "favorites" VALUES($1,$2,$3) 
    ON CONFLICT ON CONSTRAINT "favorites_pkey" DO NOTHING
  `;
  const client = await pool.connect();
  try {
    await pool.query(`BEGIN`);
    await Promise.all(wordLists.map(list=>{
      return client.query(queryText, [userID, wordID, list]);
    }));
    await client.query('COMMIT');
    res.sendStatus(201);
  } catch (error) {
    await client.query('ROLLBACK');
    console.log('Error in Post Favorites', error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

// Removes favorites from DB
router.delete('/', async (req,res) => {
  const {
    wordLists
   } = req.body[Object.keys(req.body)[0]];
   const userID = req.session.passport.user;
   const queryText = `
     DELETE FROM "favorites" WHERE "user_id" = $1 AND "word_list" = $2; 
   `;
   const client = await pool.connect();
   try {
    await pool.query(`BEGIN`);
    await Promise.all(wordLists.map(list=>{
      return client.query(queryText, [userID, list]);
    }));
    await client.query('COMMIT');
    res.sendStatus(200);
  } catch (error) {
    await client.query('ROLLBACK');
    console.log('Error in Delete Favorites', error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
})

// Updates favorites on the DB
router.put('/', async (req,res) => {
  const {
    acronym,
    words: newWords,
    wordList
  } = req.body;
  const userID = req.session.passport.user;
  const client = await pool.connect();
  try {
    const wordID = await pool.query('SELECT "id" FROM "words" WHERE "word" = $1;',[acronym]);
    console.log(wordID.rows[0].id);
    await pool.query(
      `UPDATE "favorites" SET "word_id" = $1, "word_list" = $2 WHERE "user_id" = $3 AND "word_list" = $4;`,
      [wordID.rows[0].id, Object.values(newWords), userID, wordList]
      )
    res.sendStatus(200);
  } catch (error) {
    console.log('Error in Put Favorites', error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
})

module.exports = router;
