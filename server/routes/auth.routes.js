// routes/auth.routes.js

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const userSchema = require("../models/User");
const callBack = require('../models/call-back');

const authorize = require("../middlewares/auth");
const { check, validationResult, query } = require('express-validator');

// Sign-up
router.post("/register-user",
    [
        check('name')
            .not()
            .isEmpty()
            .isLength({ min: 3 })
            .withMessage('Name must be atleast 3 characters long'),
        check('email', 'Email is required')
            .not()
            .isEmpty(),
        check('password', 'Password should be between 5 to 8 characters long')
            .not()
            .isEmpty()
            .isLength({ min: 5, max: 8 })
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        console.log(req.body);

        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        }
        else {
            bcrypt.hash(req.body.password, 10).then((hash) => {
                const user = new userSchema({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                });
                user.save().then((response) => {
                    res.status(201).json({
                        message: "User successfully created!",
                        result: response
                    });
                }).catch(error => {
                    res.status(500).json({
                        error: error
                    });
                });
            });
        }
    });


// Sign-in
router.post("/signin", (req, res, next) => {
    let getUser;
    userSchema.findOne({
        email: req.body.email
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        getUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        let jwtToken = jwt.sign({
            email: getUser.email,
            userId: getUser._id,
            name: getUser.name,
        }, "longer-secret-is-better", {
            expiresIn: "1h"
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            _id: getUser._id
        });
    }).catch(err => {
        return res.status(401).json({
            message: "Authentication failed"
        });
    });
});

// Get Users
router.route('/').get((req, res) => {
    userSchema.find((error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
})

// Get Single Admin
router.route('/admin/:id').get(authorize, (req, res, next) => {
    userSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

// Get Single User
router.route('/user-profile/:id').get(authorize, (req, res, next) => {
    userSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

// Update User
router.route('/update-user/:id').put((req, res, next) => {
    userSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('User successfully updated!')
        }
    })
})


// Delete User
router.route('/delete-user/:id').delete((req, res, next) => {
    userSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

//Get list of calls
router.get('/list',authorize, (req, res, next) => {
    callBack.find({}, function (err, data) {
      if (err) return (err);
      res.json(data);
    });
  });
  
//List of callbacks not done yet  
router.get('/list-callBack-not-done',authorize, (req, res, next) => {
    callBack.find({done:"No"}, function (err, data) {
      if (err) return (err);
      res.json(data);
    });
  });

  //List of callbacks done Already  
router.get('/list-callBack-done',authorize, (req, res, next) => {
 
    callBack.find({done:"Yes"}, function (err, data) {
      if (err) return (err);
      res.json(data);
    });
  });

//List of callbacks not done yet  
router.get('/list-done-callBack',authorize, (req, res, next) => {
    callBack.find({done:"No"}, function (err, data) {
      if (err) return (err);
      res.json(data);
    });
  });

  //Add callback request to Database.
router.post('/add-callback',(req,res,next)=>{
    let newCallBack = new callBack({
    ticketID:req.body.ticketID,
    ldap: req.body.ldap,
    reason: req.body.reason,
    date: req.body.date,
    time: req.body.time,
    done:"No",
    supervised_by:"No",
    supervised_date:""
      });
    
      newCallBack.save(newCallBack,(err,user)=>{
    if(err){
      res.json({success:false, msg:'Could not save the callback details.'})
    }
    else {
      res.json({success: true, msg: 'Callback details saved successfully.'});
    }
      })
    })
    
//Mark a callback as Done.
router.put('/updateCallBackDetails',(req, res, next) => {
    // if (err) throw err;
    const id = req.body._id;
    const supervised_by = req.body.supervised_by;
    const done = req.body.done;
    const supervised_date = Date.now();
    const query = {_id : id};
    const values = {$set: {supervised_by: supervised_by,done:done,supervised_date:supervised_date} };
    console.log("id is " + id);
      
    callBack.updateOne(query,values , function (err, data) {
      if (err) {
        console.error(err);
      } else {
        console.log(data);
        // res.json(results);
        res.json({ callBackData: data });
      }
  });
  });
  


module.exports = router;
