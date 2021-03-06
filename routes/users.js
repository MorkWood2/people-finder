const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route      POST api/users
//@desc        Register a user
//@access       Public

router.post(
  '/',
  [
    //check(field I want to check is "name", then msg u want)
    check('name', 'Please add Name')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6
    })
  ],
  async (req, res) => {
    //get errors
    const errors = validationResult(req);
    // check to see if we have any errors
    //if there are we send response
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //destructuring
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      //create new User model in db
      user = new User({
        name,
        email,
        password
      });

      //define encryption
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      //jwt payload
      //user id unique
      const payload = {
        user: {
          id: user.id
        }
      };
      //takes in payload and secret parameters
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          //if no error return token
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error ');
    }
  }
);

module.exports = router;
