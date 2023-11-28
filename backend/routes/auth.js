const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { body, matchedData, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'somesecret$tring';

/**
 * ROUTE: 01
 * Create a user using POST "/api/auth/createuser". No login required.
 */
router.post('/createuser',[
    body('name','Name must be at-least 03 characters').isLength({min:3}),
    body('email','Enter a valid email address').isEmail(),
    body('password','Password must be at-least 05 characters').isLength({min:5}),
],async (req,res)=>{
    /**
     * If there are error, return Bad request and the error.
     */
    const result = validationResult(req);
    if (result.isEmpty()) {
        const data = matchedData(req);      
        /**
         * Check duplication of email address
         */
        let user = await User.findOne({email: data.email});

        if(user){
            res.status(400).json({error: 'Email address already exists'})
        }else{
            try {
                //Create new user
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(data.password, salt);
                user = await User.create({
                    name: data.name,
                    email: data.email,
                    password: hash   
                });

                var authtoken = jwt.sign({ id: user.id }, JWT_SECRET);
                
                res.status(200).json({authtoken});
            } catch (error) {
                console.error(error.message);
                res.status(500).json({error: 'Internal server error'})
            }
        }
    }else{
        res.status(400).send({ errors: result.array()});
    }
})

/**
 * ROUTE: 02
 * Create a user using POST "/api/auth/login". No login required.
 */
router.post('/login',[
    body('email','Enter a valid email address').isEmail(),
    body('password','Password cannot be blank').exists(),
],async (req,res)=>{
    /**
     * If there are error, return Bad request and the error.
     */
    const result = validationResult(req);
    if (result.isEmpty()) {
        const data = matchedData(req);
        try {
            let user = await User.findOne({email: data.email});
            if(!user){
                res.status(400).json({error: 'Plese try to login with correct credentials'})
            }else{
                const passwordCompare = await bcrypt.compare(data.password,user.password);
                if(!passwordCompare){
                    res.status(400).json({error: 'Plese try to login with correct credentials'})
                }else{
                    var authtoken = jwt.sign({ id: user.id }, JWT_SECRET);
                    res.status(200).json({authtoken});
                }
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json({error: 'Internal server error'})
        }

    }else{
        res.status(400).send({ errors: result.array() });
    }
})

/**
 * ROUTE: 03
 * Get a user using POST "/api/auth/getuser".
 */
router.post('/getuser',fetchuser,async (req,res)=>{
   try {
        //console.log(req.id);
        const userid = req.id;
        const user = await User.findById(userid).select("-password");
        res.status(200).json({user});
   } catch (error) {
        console.error(error.message);
        res.status(500).json({error: 'Internal server error'})
   }
})

module.exports = router