const express = require('express');
const pool = require('./../modules/pool');
const permute = require('./../modules/permutations');
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authenticationMiddleware');
require('dotenv').config();

const router = express.Router();

// Adds the words to session to be used in the GET request
router.post('/', (req, res) => {
  req.session.words = req.session && req.session.words || [];
  req.session.words = req.body;
  res.sendStatus(201);
})

// Takes words from session, gets accronyms from API and checks them with the wordlist
// Returns found words and the lists that made them
router.get('/', (req, res)=>{
  let linksArr = req.session.words.map(word => {
    return `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${process.env.THESAURUS_KEY}`;
  })
  axios.all(linksArr.map(link => axios.get(link))).then(response => {
    let arrOfResponses = response.map(r => r.data);
    const arrOfSyns = [];
    for (let singleAPIResponse of arrOfResponses) {
      let wordAndSyns = [singleAPIResponse[0].meta.id];
      for (let lexicalCategoires of singleAPIResponse) {
        wordAndSyns = wordAndSyns.concat(lexicalCategoires.meta.syns[0]);
      }
      arrOfSyns.push(wordAndSyns);
    }
    const potentialAcronyms = permute(arrOfSyns);
    const queryText = `SELECT * FROM "words" WHERE "word" = ANY($1::varchar(50)[]);`;
    pool.query(queryText, [Object.keys(potentialAcronyms)]).then(results => {
      const finalResponse = [];
      for(let row of results.rows){
        finalResponse.push({
          [row.word]: {
            id: row.id,
            wordLists: potentialAcronyms[row.word],
          }
        });
      }
      res.send(finalResponse);
    })
  }).catch(err => {
    console.log('err getting acronyms', err)
  })
})

// Deletes a word from the master word list
router.delete('/:id', rejectUnauthenticated, async (req, res) => {
  try {
    const admin = await pool.query(`SELECT "admin" FROM "user" WHERE "id" = $1;`, [req.session.passport.user]);
    if(admin.rows[0].admin){
      // const queryText = `DELETE FROM "words" WHERE "id" = $1;`;
      // await pool.query(queryText, [req.params.id]);
      res.sendStatus(200);
      console.log(req.params.id)
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  };
});

module.exports = router;