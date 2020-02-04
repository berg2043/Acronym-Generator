const express = require('express');
const pool = require('./../modules/pool');
const permute = require('./../modules/permutations');
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authenticationMiddleware');
require('dotenv').config();

const router = express.Router();

// Adds the words to session to be used in the GET request
router.post('/', async (req, res) => {
  let tempUser = Date.now()+Math.floor(Math.random()*100).toString()+'.json';
  req.user = req.user || tempUser;
  req.session.words = req.session && req.session.words || [];
  req.session.words = req.body;
  console.log('getting syns', Date(Date.now()))
  let linksArr = req.session.words.map(word => {
    return `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${process.env.THESAURUS_KEY}`;
  })
  try {
    const response = await axios.all(linksArr.map(link => axios.get(link)))
    let arrOfResponses = response.map(r => r.data);
    const arrOfSyns = [];
    for (let i=0;  i < arrOfResponses.length; i++) {
      if(arrOfResponses[i][0].meta){
        let wordAndSyns = [arrOfResponses[i][0].meta.id];
        for (let lexicalCategoires of arrOfResponses[i]) {
          wordAndSyns = wordAndSyns.concat(lexicalCategoires.meta.syns[0]);
        }
        arrOfSyns.push(wordAndSyns);
      } else {
        arrOfSyns.push([req.session.words[i].toLowerCase()])
      }
    }
    let seedWord = arrOfSyns.reduce((outer, inner)=>{
      let arr = inner.reduce((acum, word)=>{
        acum[word[0]] = 1;
        return acum;
      },{})
      outer.push(Object.keys(arr));
      return outer;
    },[])
    console.log('permuting', Date(Date.now()))
    let potentialAcronyms
    potentialAcronyms = await axios({
      method: 'POST',
      url: process.env.LAMBDA_API, 
      data: {words: seedWord, fileName: req.user},
      maxContentLength: Infinity
    })
    console.log('back from db', Date(Date.now()))
    const finalResponse = [];
    for(let row of potentialAcronyms.data){
      const holder = []
      for(let i=0; i<row.word.split('').length; i++){
        holder.push(arrOfSyns[i].filter(word=>word[0]===row.word[i]))
      }
      finalResponse.push({
        user: req.user,
        acronym: [row.word],
        word_id: row.id,
        wordLists: permute(holder, false)
      });
    }
    console.log('sending info', Date(Date.now()))
    const queryText = `
        INSERT INTO user_acronyms ("user", "acronym", "word_id", "wordLists") (
          SELECT
            (data->>'user')::text, (data->>'acronym')::text, (data->>'word_id')::int, (data->>'wordLists')::text[][]
          FROM (
            SELECT json_array_elements($1::json) AS data
          ) tmp
        );
      `
    pool.query(queryText, [JSON.stringify(finalResponse)])
    res.send(500);
  } catch (error){
    console.log(error);
    res.sendStatus(500);
  }
})

// Takes words from session, gets accronyms from API and checks them with the wordlist
// Returns found words and the lists that made them
router.get('/', async (req, res)=>{
  
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