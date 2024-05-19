const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
dotenv.config();

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let profanityList = [];

// Load profanity List from csv
(async () => {
    try {
        const filepath = path.join(__dirname, 'profanityList.csv');
        profanityList = await new Promise((resolve, reject) => {
            const list = [];
            fs.createReadStream(filepath)
                .pipe(csv())
                .on('data', (row) => list.push(row.text.toLowerCase()))
                .on('end', () => resolve(list))
                .on('error', reject);
        });
        console.log('Profanity list loaded');
    } catch (error) {
        console.error('Error loading profanity list:', error);
    }
})();


// Routes
app.get('/', (req, res) => { res.render('index'); });

app.post('/filter', async (req, res) => {
    const { string } = req.body;
    if (!string) return res.status(400).json({ error: 'No string provided' });
    
    const wordsArray = string.split(/\W+/);
    const triggeredWords = wordsArray.filter(word => profanityList.includes(word.toLowerCase()));
    const containsProfanity = triggeredWords.length > 0;
    
    const filteredString = wordsArray.map(word => 
        profanityList.includes(word.toLowerCase()) ? '*'.repeat(word.length) : word
    ).join(' ');
    
    return res.status(200).json({
        containsProfanity,
        unfilteredString: string,
        filteredString: containsProfanity ? filteredString : string,
        triggeredWords
    });
});

app.listen(process.env.PORT, () => console.log(`it's alive on http://${process.env.HOST}:${process.env.PORT}`));