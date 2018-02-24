var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.send({
    id: 1,
    name: 'This is home page!'
  });
});

module.exports = router;
