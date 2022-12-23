import express from 'express';
import  details from './data/details.json';
import _ from 'lodash';


const router = express.Router();


router.get('/', (req,res) =>{
    res.json(details)
})


router.get('/:id', (req, res) => {
    const id = req.params.id
    const detail = _.find(details, detail => detail.id === id)
    if (detail){
        res.json(detail)
    }else {
        res.send('Detail not found')
    }
})






module.exports = router;