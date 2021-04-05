dir = process.cwd()

var express = require('express');
var client = express.Router();

client.get('/', (req, res) => {
    res.sendFile(dir + '/view/index.html')
})
client.get('/about', (req, res) => {
    res.sendFile(dir + '/view/about.html')
})
client.get('/config', (req, res) => {
    config = {
        status: true,
        result: {
            prefix : '/',
            namabot: 'MarlonBot',
            namaowner: 'Lendra',
            youtube : 'LendraCH'
        }
    }
    res.json(config)
})

module.exports = client