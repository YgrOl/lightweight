import express from 'express';
import _ from 'lodash';
import  details from '../data/details.json'
import mongoose from 'mongoose';


const DB_URL = `mongodb+srv://sasha:sldsfefrn@cluster0.wjav5y3.mongodb.net/test`;
mongoose.set("strictQuery", false);
const DB_USER = `sasha`;
const DB_password =`sldsfefrn`;



mongoose.connect(DB_URL);
const db = mongoose.connection


db.once('open', () => {
    console.log('DB connection is established')
})

const DetailScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    type: String,
    description: String
});

const DetailModel = mongoose.model(`Detail`, DetailScheme);












const router = express.Router();


let detailsArray = details;



router.get('/', (req, res) =>{
    DetailModel.find((error, details) => {
        if(error){
            res.status(500).send(error);
            return handleError(error);
        }
        res.json(details);
    });
});


router.get('/:id', (req, res) =>{
    const id = req.params.id;
    DetailModel.findById(id, (error, detail) => {
        if (error){
            res.status(500).send(error);
            return errorHandler(error);
        }
        if(detail){
            res.json(detail);
        } else {
            res.status(404).send('Detail with same id NOT FOUND');
        }
    });
});



router.post('/', (req, res) => {

    const id = mongoose.Types.ObjectId();
    const detailToPersist = Object.assign({
            _id: id
        }, req.body
    );
    const detail = new DetailModel(detailToPersist);

    detail.save( error => {
            if(error){
                res.status(500).send(error);
                return handleError(error);
            }
            res.json(detail);
        }
    );
});



router.delete('/:id', (req, res) =>{
    const id = req.params.id;
    DetailModel.findByIdAndDelete(id, (error, detail) => {
        if(error){
            res.status(500).send(error);
            return handleError(error);
        }
        res.status(200).send('Detail is deleted!');
    });
});



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

router.put('/:id', (req, res)=>{
    const id = req.params.id;
    DetailModel.findById(id, (error, detail) => {
        if (error){
            res.status(500).send(error);
            return handleError(error);
        }
        if(detail){
            detail.name = req.body.name;
            detail.type = req.body.type;
            detail.description = req.body.description;
            detail.save( error => {
                    if(error){
                        res.status(500).send(error);
                        return handleError(error);
                    }
                    res.json(detail);
                }
            );
        }
    });
});


function errorHandler(err, req, res, next){
    res.status(500);
    res.render('error',{error: err});
}


module.exports = router;



