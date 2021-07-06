const express = require('express');
const bodyparser = require('body-parser');
const reader =  require('fs');

const parser = require('./parser');
const index = new parser('index', reader);

const app = express();
app.use(bodyparser.json());
app.use(
    bodyparser.urlencoded({
        extended: true
    })
);


app.get('/', (request, response) => {
    response.end(index.render());
});

app.listen(3000, () => {
    console.log('Listening port 3000');
});