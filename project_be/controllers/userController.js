const express = require('express')
const bodyParser = require('body-parser')

const database = require('../model/database')

const app = express()
app.use(bodyParser.json())

// app.post('/users')
const addUser = async (req, res, next) => {
    try {
        console.log('===================');
        console.log(req.body);
        await database.User.create(req.body)
        res.status(201).json({message : 'created'})
    } catch (err) {
        next(err)
    }    
}

// app.get('/users/:id', async 
const checkUser = async (req, res, next) => {
    try {
        let user = await database.User.findOne({ where: { username: req.body.username, password: req.body.password } });
        console.log(user);
        if (user){
            res.status(200).json(user.dataValues)    
        }
        else{
            res.status(404).json({message : 'not found'})   
        }
    } catch (err) {
        next(err)
    }    
}


module.exports = {
    checkUser,
    addUser
  }