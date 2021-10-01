const puppeteer = require('puppeteer')
const express = require('express')
const cors = require('cors')
const app = express()

//middlewares
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

var browser, page
const scraper = {

    async open(url) {
        browser = await puppeteer.launch()
        page = await browser.newPage()

        //headers
        page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36')
        await page.goto(url)

        // await page.screenshot({
        //     path: 'example.png'
        // });
    },

    async getdata() {
        await page.reload({
            waitUntil: ["networkidle0", "domcontentloaded"]
        });

        const gay = await page.evaluate(() => Array.from(document.getElementsByClassName('leaderboard-row'), e => e.innerText));
        var data = []

        var leaderboarddata = {
            rank: [],
            username: [],
            score: [],
            time: []
        }

        //split and throw into object arrays
        gay.forEach(e => {
            data.push(e.split('\n'))
        });
        for (var i = 0; i < data.length; i++) {
            leaderboarddata.rank.push(data[i][0])
            leaderboarddata.username.push(data[i][2])
            leaderboarddata.score.push(data[i][4])
            leaderboarddata.time.push(data[i][6])
        }
        return leaderboarddata
    },
    async stop() {
        await browser.close()
    }
}


// APIs
app.get('/open', async (req, res) => {
    console.log('open');
    await scraper.open(req.query.url)
    res.status(200).end()
})

app.get('/data', async (req, res) => {
    data = await scraper.getdata()
    return res.status(200).send(data)
})

app.get('/stop', async (req, res) => {
    await scraper.stop()
    console.log('stopped');
    return res.status(200)
})

app.listen(4000)
