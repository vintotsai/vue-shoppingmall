const router = require('express').Router()
router.post('/',(req,res,next)=>{
  console.log(req.body)
  res.send(`post test`)
})

module.exports = router