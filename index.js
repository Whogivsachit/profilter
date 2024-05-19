const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const app = express();
app.use(express.json());

// Load profanity List from csv
let profanitySet = new Set();
(async () => {
    try {
        const filepath = path.join(__dirname, 'profanityList.csv');
        const list = await new Promise((resolve, reject) => {
            const list = [];
            fs.createReadStream(filepath)
                .pipe(csv())
                .on('data', (row) => list.push(row.text.toLowerCase()))
                .on('end', () => resolve(list))
                .on('error', reject);
        });
        profanitySet = new Set(list);
        console.log('Profanity list loaded');
    } catch (error) {
        console.error('Error loading profanity list:', error);
    }
})();

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Send a POST request to / with the message you want to filter/check' });
});

app.post('/', async (req, res) => {
    const string = req.body.message;
    if (!string) return res.status(400).json({ error: 'No string provided' });
    
    const wordsArray = string.toLowerCase().split(/\W+/);
    const triggeredWords = wordsArray.filter(word => profanitySet.has(word));
    const containsProfanity = triggeredWords.length > 0;
    
    const filteredString = string.replace(/\w+/g, word =>
        profanitySet.has(word.toLowerCase()) ? '*'.repeat(word.length) : word
    );
    
    return res.status(200).json({
        containsProfanity,
        unfilteredString: string,
        filteredString: containsProfanity ? filteredString : string,
        triggeredWords
    });
});

app.listen(3000, () => console.log(`it's alive on http://localhost:3000`));