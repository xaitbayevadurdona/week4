const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const publicPath = path.join(__dirname);
const port = process.env.PORT || 3000;
app.use(cors());
app.use(function(req, res, next) {
    req.rawBody = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
        req.rawBody += chunk;
    });
    req.on('end', function() {
        next();
    });
});
app.use(bodyParser.json());
app.all('/result4/', (req, res) => {

    const x_test = req.headers["x-test"];
    console.log(req.rawBody);
    if (x_test && req.rawBody) {
        res.setHeader("Content-Type", "application/json");
        res.header("Access-Control-Allow-Headers", "x-text, x-test, Content-Type");
        res.json({message: "itmo294646", "x-result": x_test, "x-body": req.rawBody});
    } else {
        res.setHeader("Content-Type", "application/json");
        res.header("Access-Control-Allow-Headers", "x-text, x-test");
        res.json({message: "itmo294646", "x-result": x_test});
    }
    res.json({message: "itmo294646"});

});

app.listen(port, () => {
    console.log('Server is up!');
});
