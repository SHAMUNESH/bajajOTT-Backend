const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userModelSchema = require('../models/userModel')
const secretKey = "jysbfcsyreycueywcfeygy#@%$@hrvdrs$#!#@&*&@76652"
const verifyToken = require('../verifyToken')


//User Authentication (Login)
router.post('/login', async (req,res) => {

    const email = req.body.email
    const password = req.body.password

    await userModelSchema.findOne({email : email}).then(existUser => {
        console.log('exist user', existUser)
        if(existUser && existUser._id) {
            bcrypt.compare(password, existUser.password, function(err,response){
                if(!err){
                    if(response) {
                         const authToken = jwt. sign({_id : existUser._id, email : existUser.email}, secretKey, {
                            expiresIn : '1h'
                        })
                        res.json({status:'ok', data : {authToken,response,existUser}})
                    }else if(!response) {
                        res.json({status: 'ok', data : {existUser,response}})
                    }

                }
            })

        }
    }).catch(err => {
        res.json({status: 'error',data : 'Something went wrong'})
    })

})



//User Registration (SignUp)
router.post('/register', async(req,res) => {

    const registerUserData = {
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        phn_no : req.body.phn_no
    }

    const salt = await bcrypt.genSalt(10)
    await bcrypt.hash(req.body.password,salt).then(hashedPassword => {
        if(hashedPassword){
            console.log('hashed password', hashedPassword)
            registerUserData.password = hashedPassword
        }
    })

    await userModelSchema.create(registerUserData).then(userStoredData => {
        if(userStoredData && userStoredData._id){
            console.log('user stored data',userStoredData)
            res.json({status: 'ok',data: userStoredData})
        }
    }).catch(err => {
        if(err){
            res.json({status : 'error',data : err})
        }
    })

})


//Dashboard User Access 
router.get('/dashboard',verifyToken, async(req,res) => {

    if(req && req.decodedToken) {
        res.json({status : 'ok', data : 'ok'})
    } 

})


module.exports = router