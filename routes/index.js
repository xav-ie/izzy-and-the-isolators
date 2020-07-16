const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    if (req.session.username) {
        console.log("logged in");
        res.send(req.session.username);
    }
    else {
        console.log("not logged in");
        req.session.username = 'Webtutorials.ME';
        res.send(req.session.username);
    }
    // res.send({ response: "I am alive" }).status(200);

    // console.log(sess);
});

router.post('/login', (req, res) => {
    sess = req.session;
    sess.email = req.body.email;
    res.end('done');
});


router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});


module.exports = router;