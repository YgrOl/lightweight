import express from 'express';
import _ from 'lodash';
import  details from '../data/details.json'
import mongoose from 'mongoose';


const DB_URL = `mongodb+srv://sasha:sldsfefrn@cluster0.wjav5y3.mongodb.net/test`;
mongoose.set("strictQuery", false);
const DB_USER = ``;
const DB_password =``;



mongoose.connect(DB_URL);
const db = mongoose.connection


db.once('open', () => {
    console.log('DB')
})















const router = express.Router();


let detailsArray = details;



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