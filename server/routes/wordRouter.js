const express = require('express');
const pool = require('./../modules/pool');
const permute = require('./../modules/permutations');
const permuteToString = require('./../modules/permuteToString');
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
  console.log('getting syns')
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
    let seedWord = arrOfSyns.reduce((outer, inner)=>{
      let arr = inner.reduce((acum, word)=>{
        acum[word[0]] = 1;
        return acum;
      },{})
      outer.push(Object.keys(arr));
      return outer;
    },[])
    // console.log(seedWord)
    console.log('permuting', Date(Date.now()))
    const potentialAcronyms = permuteToString(permute(seedWord));
    console.log('querrying', Date(Date.now()))
    const queryText = `SELECT * FROM "words" WHERE "word" = ANY($1::varchar(50)[]);`;
    pool.query(queryText, [potentialAcronyms]).then(results => {
      console.log('back from db', Date(Date.now()))
      const finalResponse = [];
      for(let row of results.rows){
        const holder = []
        for(let i=0; i<row.word.split('').length; i++){
          holder.push(arrOfSyns[i].filter(word=>word[0]===row.word[i]))
        }
        finalResponse.push({
          [row.word]: {
            id: row.id,
            wordLists: permute(holder),
          }
        });
      }
      console.log('sending info', Date(Date.now()))
      res.send(finalResponse);
    })
  // res.sendStatus(200);
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