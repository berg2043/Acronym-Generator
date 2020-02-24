-- In addition to creating the words table and inserting all the words,
-- you'll want to create a tempword table.  This table acts as an in between 
-- table to hold acronyms from the permutations.  These words are then filtered
-- based on the words table and sent back to the lambda script to go back to the
-- server.  Once there, the server pairs the acronyms up with the synonyms.

CREATE TABLE tempwords(
  words VARCHAR(50) PRIMARY KEY
);