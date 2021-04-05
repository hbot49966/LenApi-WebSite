__path = process.cwd()

var express = require('express');
var db = require('../database/db');
try {
    var len = db.get("len");
} catch (err) {
    console.log('')
}

var api = "lenapi"
var creatorlist = ["Lendra", "Oriza", "Yudistira"];
var creator = creatorlist[Math.floor(Math.random() * creatorlist.length)];

// Module
var ytdl = require('ytdl-core')
var cors = require('cors');
var secure = require('ssl-express-www');
var axios = require('axios');
var request = require('request');
var cheerio = require('cheerio');
var fetch = require('node-fetch');
var client = express.Router();
// Tools for api
const {
    yta,
    ytv,
    fb,
    tiktok
} = require('../lib/utils/downloader')
const {
    komiku
} = require('../lib')
// Function
var { color, bgcolor } = require(__path + '/lib/color.js');
var { fetchJson, fetchText } = require(__path + '/lib/fetcher.js')
var options = require(__path + '/lib/options.js');
const { response } = require('express');
const { slice, filter } = require('lodash');
var cookie = "HSID=A7EDzLn3kae2B1Njb;SSID=AheuwUjMojTWvA5GN;APISID=cgfXh13rQbb4zbLP/AlvlPJ2xBJBsykmS_;SAPISID=m82rJG4AC9nxQ5uG/A1FotfA_gi9pvo91C;__Secure-3PAPISID=m82rJG4AC9nxQ5uG/A1FotfA_gi9pvo91C;VISITOR_INFO1_LIVE=RgZLnZtCoPU;LOGIN_INFO=AFmmF2swRQIhAOXIXsKVou2azuz-kTsCKpbM9szRExAMUD-OwHYiuB6eAiAyPm4Ag3O9rbma7umBK-AG1zoGqyJinh4ia03csp5Nkw:QUQ3MjNmeXJ0UHFRS3dzaTNGRmlWR2FfMDRxa2NRYTFiN3lfTEdOVTc4QUlwbUI4S2dlVngxSG10N3ZqcHZwTHBKano5SkN2dDlPSkhRMUtReE42TkhYeUVWS3kyUE1jY2I1QzA1MDZBaktwd1llWU9lOWE4NWhoZV92aDkxeE9vMTNlcG1uMU9rYjhOaDZWdno2ZzN3TXl5TVNhSjNBRnJaMExrQXpoa2xzRVUteFNWZDI5S0Fn;PREF=app=desktop&f4=4000000&al=id;SID=2wezCMTUkWN3YS1VmS_DXaEU84J0pZIQdemM8Zry-uzWm8y1njBpLTOpxSfN-EaYCRSiDg.;YSC=HCowA1fmvzo;__Secure-3PSID=2wezCMTUkWN3YS1VmS_DXaEU84J0pZIQdemM8Zry-uzWm8y1dajgWzlBh9TgKapGOwuXfA.;SIDCC=AJi4QfFK0ri9fSfMjMQ4tOJNp6vOb9emETXB_nf2S05mvr2jBlmeEvlSsQSzPMuJl_V0wcbL1r8;__Secure-3PSIDCC=AJi4QfGeWHx-c4uTpU1rXCciO1p0s2fJWU07KrkZhWyD1Tqi8LyR-kHuBwHY9mViVYu1fRh2PA"

const ind = require('../lang/mess');

var cok = 15
        var arr = '123456789abcdefghijklmnopqrstuvwxyz'
        var random = '';

        for (var i = cok; i > 0; i--) {
            random += arr[Math.floor(Math.random() * arr.length)];
        }

        var cokk = 5
        var randomlagi = '';

        for (var i = cokk; i > 0; i--) {
            randomlagi += arr[Math.floor(Math.random() * arr.length)];
        }

        var randomTextNumber = random+randomlagi+'---------LenApi'+'Len-Api';

client.get('/infonpm', async (req, res, next) => {
    var apikeyInput = req.query.apikey,
    nama = req.query.nama
    if (!apikeyInput) return res.json(ind.notparam)
    if (apikeyInput != api) res.json(ind.notkey)
    if (!nama) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama"})

    fetch(encodeURI(`https://registry.npmjs.org/${nama}`))
    .then(response => response.json())
    .then(data => {
        var result = data
        res.json({
            status: true,
            creator: `${creator}`,
            result
        })
    })
})

client.get('/ytmp3', async (req, res, next) => {
    var apikeyInput = req.query.apikey,
    url = req.query.url
    if (!apikeyInput) return res.json(ind.notparam)
    if (apikeyInput != api) return res.json(ind.notkey)
    if (!url) return res.json(ind.noturl)

    yta(url)
    .then(async (data) => {
        const shortlink = await fetchText(`https://tinyurl.com/api-create.php?url=${data.dl_link}`)
        res.json({
            status: true,
            creator: `${creator}`,
            result: {
                title: data.title,
                thumb: data.thumb,
                filesizeF: data.filesizeF,
                kualitas: data.quality,
                url: shortlink
            }
        })
    })
})

client.get('/gsmarena', async (req, res, next) => {
    var apikeyInput = req.query.apikey,
    merek = req.query.merk,
    seri = req.query.seri
    if (!apikeyInput) return res.json(ind.notparam)
    if (apikeyInput != api) return res.json(ind.notkey)
    if (!merek) return res.json(ind.notmerk)
    if (!seri) return res.json(ind.notspek)
    fetchJson(`https://api-mobilespecs.azharimm.tk/brands/${merek}/${seri}`)
    .then(result => {
        var brand = result.data.brand,
        phone_name = result.data.phone_name,
        thumb = result.data.phone_img_url,
        spek = result.data.specifications
        res.json({
            status: true,
            creator: `${creator}`,
            result: {
                brands: brand,
                nama_hp: phone_name,
                thumb: thumb,
                details: {
                    spek
                }
            }
        })
    })
})

client.get('/anime/komiku', async (req, res, next) => {
    var apikeyInput = req.query.apikey
    judul = req.query.judul
    if (!apikeyInput) return res.json(ind.notparam)
    if (apikeyInput != api) return res.json(ind.notkey)

    komiku(judul)
    .then(data => {
        res.json({
            data
        })
    })
})

client.get('/tiktokmp4', async (req, res, next) => {
    var apikeyInput = req.query.apikey,
    url = req.query.url
    if (!apikeyInput) return res.json(ind.notparam)
    if (apikeyInput != api) return res.json(ind.notkey)

    tiktok(url)
    .then(async (result) => {
       const shortlink = await fetchText(`https://tinyurl.com/api-create.php?url=${result.mp4direct}`)
       res.json({
           status: true,
           creator: `${creator}`,
           result: {
               judul: result.nameInfo,
               hastag: result.textInfo,
               upload: result.timeInfo,
               thumb: result.image,
               link: shortlink
           }
       })
    })
})

client.get('/fbdl', async (req, res, next) => {
    var apikeyInput = req.query.apikey,
    url = req.query.url
    if (!apikeyInput) return res.json(ind.notparam)
    if (apikeyInput != api) return res.json(ind.notkey)
    if (!url) return res.json(ind.noturl)
    fb(url)
    .then(data => {
        res.json({
            status: true,
            creator: `${creator}`,
            result: {
                title: data.title,
                author: data.author,
                durasi: data.durasi,
                link_author: data.link_author,
                thumb: data.thumb,
                url: data.url,
                desc: data.desc
            }
        })
    }) 
})

module.exports = client