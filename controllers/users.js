const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.get('/signup', (req, res) => {
    res.render('users/signup.ejs');
});

router.post('/signup', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, user) => {
        req.session.userId = user._id
        res.redirect('/books');
    })
});

router.get('/login', (req, res) => {
    res.render('users/login.ejs', { error: null });
});

router.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if(!foundUser) return res.redirect('users/login.ejs', { error: 'Bad Credentials' });
        const isMatch = bcrypt.compareSync(req.body.password, foundUser.password);
        if(!isMatch) return res.redirect('users/login.ejs', { error: 'Bad Credentials' });
        req.session.userId = foundUser._id;
        res.redirect('/books');
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
});

module.exports = router;