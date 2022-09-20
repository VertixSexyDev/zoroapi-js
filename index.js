const express = require('express');
const { search } = require('./functions/search');
const { status } = require('./functions/status');
const { trending } = require('./functions/trending');
const { pchecker } = require('./helpers/checkparams');

var app = module.exports = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/search', pchecker ,search);

app.get('/status', status);

app.get('/trending', trending);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
