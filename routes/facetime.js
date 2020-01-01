var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('facetime', {
        title: 'FaceTime',
        facetime : true
    });
});

module.exports = router;