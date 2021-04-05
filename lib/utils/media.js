const tiktod = require('tiktok-scraper')

async function tikstalk(nama) {
    return new Promise((resolve, reject) => {
        tiktod.getUserProfileInfo(nama, {
            number: 1,
        })
        .then(data => {
            resolve(data)
        })
    })
}

tikstalk('lendrach')