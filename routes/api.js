const express = require('express'), router = express.Router();

/* GET home page. */
router.get('/erdosPath', function(req, res, next) {
    
  res.json({hi:req.query})
});

module.exports = router;
