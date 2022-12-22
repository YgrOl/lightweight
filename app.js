import express from 'express';
import  details from './data/details.json'

const BASE_DETAIL_URL = '/api/v1/details'

const PORT = 3000;
const server = express();

console.log ("Hello, world!");
const message = "Hello node.js";
console.log(message);

server.get('/',(req, res) =>{
    res.send("Hello my js-route")
})

server.listen(PORT, () => {
    console.log('Server has been started on port '+ PORT)
})

