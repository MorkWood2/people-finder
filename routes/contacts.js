const express = require('express');
const router = express.Router();

// @route      GET api/contacts
//@desc        get all users contacts
//@access       Private

router.get('/', (req, res) => {
  res.send('Get all contacts');
});

// @route      POST api/contacts
//@desc        Add new contacts
//@access       Private

router.post('/', (req, res) => {
  res.send('add contact');
});

// @route      PUT api/contacts/:id
//@desc       update contacts
//@access       Private

router.put('/:id', (req, res) => {
  res.send('update contact');
});

// @route      Delete api/contacts/:id
//@desc       Delete contact
//@access       Private

router.delete('/:id', (req, res) => {
  res.send('delete contact');
});

module.exports = router;
