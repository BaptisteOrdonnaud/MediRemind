var express = require('express');
var router = express.Router();

const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const { checkDate } = require('../modules/checkDate');

const uid2 = require('uid2');
const bcrypt = require('bcrypt');


// Sign Up
router.post('/signup', (req, res) => {
  if (!checkBody(req.body, ['nom', 'prenom', 'dateDeNaissance', 'email', 'telephone', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  if (!checkDate(req.body.dateDeNaissance)) {
    res.json({ result: false, error: 'Invalid date format for dateDeNaissance' });
    return;
  }

  User.findOne({ email: req.body.email })
    .then(data => {
      console.log('find', data)
      if (!data) {
        const hash = bcrypt.hashSync(req.body.password, 10);
        const newUser = new User({
          nom: req.body.nom,
          prenom: req.body.prenom,
          dateDeNaissance: req.body.dateDeNaissance,
          email: req.body.email,
          telephone: req.body.telephone,
          password: hash,
          token: uid2(32),
        });
        console.log('user', newUser)
        newUser.save().then(newDoc => {
          // console.log('test ', newDoc)
          res.json({ result: true, user: newDoc });
        });
      } else {
        res.json({ result: false, error: 'User already exists' });
      }
    });
});

// Sign In
router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['email', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.findOne({ email: req.body.email }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, user: data });
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  });
});

//Retourne l’utilisateur correspondant au token
router.get('/:token', (req, res) => {
  User.findOne({
    nom: req.params.nom
  }).then(user => {
    res.json({ result: true, user: user });
  });
});




module.exports = router;
