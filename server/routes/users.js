var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send('Got users!');
});
router.get('/login', function(req, res, next) {
  res.send(`Got users login!`);
});

module.exports = router;
