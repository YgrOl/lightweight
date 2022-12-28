import express from 'express';
import _ from 'lodash';
import  details from '../data/details.json'
import mongoose from 'mongoose';



const DB_URL = 'mongodb://localhost:27017/lightW';
const DB_USER = '';
const DB_password = '';




const router = express.Router();


let detailsArray = details;

mongoose.connect(DB_URL);
const db = mongoose.connection;
db.once('open', () => {
    console.log('DB CONNECTION IS ESTABLISHED')
});



router.get('/', (req,res) =>{



    res.json(detailsArray)
})


router.post('/',(req,res) =>{
    detailsArray.push(req.body)
    res.status(200).send("OK")
})


router.get('/:id', (req, res) => {
    const id = req.params.id
    const detail = _.find(details, detail => detail.id === id)
    if (detail){
        res.json(detail)
    }else {
        console.log('not found')
        res.send('Detail not found')
    }
})






module.exports = router;