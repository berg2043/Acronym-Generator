const express = require('express');
const sessionMiddleware = require('./modules/session');
const wordRouter = require('./routes/wordRouter');
require('dotenv').config();

// Globals
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(sessionMiddleware);

// Routes
app.use('/api/words', wordRouter);

// Static
app.use(express.static('build'));

// Spin Up
app.listen(PORT, () => {
  console.log('Server running on', PORT);
})