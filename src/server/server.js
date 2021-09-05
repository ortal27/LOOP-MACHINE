const express = require('express')
const padsData = require('../Data.json');

const app = express()

app.use(express.static('public'))


app.get('/pads', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(padsData));
})


app.listen(8080, '0.0.0.0');


