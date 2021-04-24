const express = require('express');
const app = express();
const path = require('path');
const endpoints = require('./mta-datamine-endpoints.json');
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const https = require('https');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/fetch_gtfs_feed/:trainGroup', (req, res) => {
    const trainGroup = req.params.trainGroup;
    const url = endpoints[trainGroup];
    https.get(
        url,
        {
            headers: { "x-api-key": process.env.mta_datamine }
        },
        (datamineResponse) => {
            const data = [];
            datamineResponse.on('data', (chunk) => {
                console.log("Receiving Data");
                data.push(chunk);
            });
            datamineResponse.on('end', () => {
                console.log("Finished receiving data");
                const decodedData = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(Buffer.concat(data));
                res.json(decodedData);
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
            res.statusCode = 403;
            res.json(err);
        });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
