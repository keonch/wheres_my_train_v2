const express = require('express');
const path = require('path');
const app = express();
const https = require('https');
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');

app.use(express.static(path.join(__dirname, 'client/build')));

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

app.get('/api/fetch_gtfs_feed', (req, res) => {
    https.get(
        "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace",
        {
            headers: { "x-api-key": process.env.mta_datamine }
        },
        (datamineResponse) => {
            const response = {
                datamineResCode: null,
                body: []
            }
            datamineResponse.on('data', (chunk) => {
                console.log("Receiving Data");
                response.body.push(chunk);
            });
            datamineResponse.on('end', () => {
                console.log("Finished receiving data");
                response.datamineResCode = datamineResponse.statusCode;
                res.send(response);
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

