# SNAPS (Spawning Nice Acronyms for People with Style)

## Descriptipon
_Durration: 2 weeks_

## Description
This is an acronym genertaor. A user inputs words to describe something, and the 
app takes those words and synonyms of those words and combine them to create 
acronyms that are also words.  Users can browse these acronyms and word lists.  
If they log in, they can choose their favorite acronyms and word lists to be 
saved to their profile.  They can also flag acronyms that they don't believe are words.

## Prerequisites

* Node.js
* react
* redux
* postgres

## Installation

1. Run npm install
2. Create a database called `acronym` on your local postgres server. Update
`server\modules\pool.js` as needed for username and password of your postgres server
3. Run the SQL commands found in `database.sql`
3. Run `npm run build` to build a local react app
4. Run `npm run server` to run the server.
5. Go to `localhost:5000` 

An online version of this app is available soon.

## Usage

The `+` button adds more field and the `X` button removes fields.  Without AWS 
integration, the limit is 5 words, and it is 7 words with AWS integration.

After a short delay, the a list of acronyms will be displayed.

Pressing the down caret will display lists of words that make up the acronym.

Pressing heart will favorite an acronym or word list if the user is logged in or
prompt the user to log in.

Pressing the flag will send the word to be reviewd by the admin to see if it is a
real word or not.

Users are able to review thier favorites to remove or edit the words there.

## Built With

Javascript
* Node.js
* express
* pg
* react
* redux
* material-ui
* passport
* bcrypt

SQL
* postgres
* pgadmin 4

AWS
* Lambda
* S3
* Redshift

## Known bugs
* With longer acronyms, the browser will be under heavy load and may crash.  Pagination
is currently being worked on to reduce the amount of data stored on the browser.

## Support

Contact phillipb1991@msn.com for any questions, concerns, or bug reports.