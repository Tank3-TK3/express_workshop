const express = require('express');
const app = express();

/*
Verbos HTTP
    GET
    POST
    PATCH
    PUT
    DELETE
*/

app.get('/', (req, res, next) => {
    res.status(200);
    res.send('Bienvenido');
});

app.listen(3000, () => {
    console.log('Server is runing...');
});