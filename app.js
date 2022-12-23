import express from 'express';
import  details from './data/details.json'
import _ from 'lodash'
import ItemRouter from './routes/ItemRoute';
import morgan from 'morgan'




const BASE_DETAIL_URL = '/api/v1/details'

const PORT = 5000;
const server = express();

server.use(morgan('tiny'));



server.use(BASE_DETAIL_URL, ItemRouter);

console.log ("Hello, world!");
const message = "Hello node.js";
console.log(message);


server.get('/',(req, res) =>{
    res.send("Hello my js-route")
})

server.listen(PORT, () => {
    console.log('Server has been started on port '+ PORT)
})


