const express = require('express');
const pool = require('./../modules/pool');
const { rejectUnauthenticated } = require('../modules/authenticationMiddleware');


const router = express.Router();

// Gets favorites from DB

// Adds new favorites to DB
router.post('/', rejectUnauthenticated, async (req,res) =>{
  const {
    id: wordId,
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
      return client.query(queryText, [userID, wordId, list]);
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
    id: wordId,
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

module.exports = router;
