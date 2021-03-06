const express = require('express');
const sessionMiddleware = require('./modules/session');
const passport = require('./strategies/userStrategy'); 
const wordRouter = require('./routes/wordRouter');
const userRouter = require('./routes/userRouter');
const favoritesRouter = require('./routes/favoritesRouter');
const adminRouter = require('./routes/adminRouter');
require('dotenv').config();

// Globals
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(sessionMiddleware);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/words', wordRouter);
app.use('/api/user', userRouter);
app.use('/api/favorites', favoritesRouter);
app.use('/api/admin', adminRouter);

// Static
app.use(express.static('build'));
app.get('*', function(req, res) {
  res.sendFile('index.html', {root: 'build'});
});

// Spin Up
app.listen(PORT, () => {
  console.log('Server running on', PORT);
});