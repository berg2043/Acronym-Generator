const express = require('express');


// Globals
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes

// Static
app.use(express.static('build'));

// Spin Up
app.listen(PORT, () => {
  console.log('Server running on', PORT);
})