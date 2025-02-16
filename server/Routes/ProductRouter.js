const express = require('express');
const ensureAuthenticated = require('../Middlewares/Auth');
const router = express.Router();


router.get('/',ensureAuthenticated,(req,res)=>{

     console.log('---llogged in user Detail---',req.user)
    res.status(200).json([
        {
            name: "mobile",
            price: 10000
        },
        {
            name: "tv",
            price: 20000
        }
    ])
});

module.exports = router;