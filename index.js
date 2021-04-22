const express = require('express');
const path = require('path');
const app = express();
const https = require('https');

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/fetch_gtfs_feed', (req, res) => {
    const response = https.get(
        "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace",
        {
            headers: { "x-api-key": process.env.mta_datamine }
        },
        (resp) => {
            resp.on('data', (chunk) => {
                console.log("Receiving Data");
            });
            resp.on('end', () => {
                console.log("Finished receiving data");
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    res.send(response);
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

