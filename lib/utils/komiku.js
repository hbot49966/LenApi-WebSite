const fetch = require('node-fetch')
const cheerio = require('cheerio')

function komiku (query) {
    return new Promise((resolve, reject) => {
        fetch('https://data1.komiku.id/cari/?post_type=manga&s=' + encodeURIComponent(query), {
            method: 'get'
        })
        .then(res => res.text())
        .then(res => {
            const soup = cheerio.load(res)
            const engtitle = [];
            const thumb = [];
            const url = [];
            const desc = [];
            const IndTitle = [];
            const result = [];
            soup('div.daftar').each(function (a, b) {
                soup(b).find('h3').each(function (c, d) {
                    engtitle.push(soup(d).text())
                })
                soup(b).find('span.judul2').each(function(c, d) {
                    IndTitle.push(soup(d).text())
                })
                soup(b).find('div.kan').each(function(c, d) {
                    soup(d).find('a').each(function(e, f) {
                        url.push('https://komiku.id' + soup(f).attr('href'))
                    })
                    soup(d).find('p').each(function(e, f) {
                        desc.push(soup(f).text())
                    })
                })
                soup('div.bgei').each(function(c, d) {
                    soup(d).find('a').each(function(e, f) {
                        soup(f).find('img').each(function(g, h) {
                            thumb.push(soup(h).attr('data-src'))
                        })
                    })
                })
            })
            for (let i = 0; i < engtitle.length; i++) {
                result.push({
                    title: IndTitle[i],
                    source: url[i],
                    desc: desc[i],
                    thumbnail: thumb[i]
                })
            }
            resolve(result)
        })
        .catch(reject)
    })
}

module.exports = komiku