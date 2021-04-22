const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/fetch_gtfs_feed', (req, res) => {

    res.send("hello world");

});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});

