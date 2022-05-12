const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();
const ejsMate = require('ejs-mate');

//create the express
const app = express();

const PORT = process.env.PORT || 3000;

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json());

app.get('/', (req, res) => {
    res.render('index.ejs')
})
app.post('/convert-mp3', async (req, res) => {
    const videoID = req.body.videoID;
    if (videoID === "undefined" || videoID === "" || videoID === null) {
        return res.render('index', { success: false, message: "Please enter video URL" });
    } else {
        console.log(videoID);
        return res.render('index', { success: true, song_link: videoID })
    }
})

app.post('/search', async (req, res) => {
    const getquery = req.body.search;
    const query = getquery.toLowerCase();
    console.log(query)

    if (query.includes("about") || query.includes("uxair") || query.includes("developer") || query.includes("email") || query.includes("contact")) {
        return res.render('about', { searched: getquery });
    }else if(query.includes("ads")){
        return res.render('index', { searchError: false, notFound: getquery })
    } else {
        if (getquery === "undefined" || getquery === "" || getquery === null) {
            return res.render('index', { searchError: true, notFound: "Please type something in search box!" })
        } else {
            return res.render('index', { searchError: true, notFound: "Results Not Found for: " + getquery})
        }
    }
})

app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`);
})
