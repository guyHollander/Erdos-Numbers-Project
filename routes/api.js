import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/erdosPath', function(req, res, next) {
    
  res.json({hi:req.query})
});

export default router
