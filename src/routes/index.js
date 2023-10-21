const express = require('express')
router = express.Router()
userRouter = require('./User.router'),
productRouter = require('./Product.router')
categoryRouter = require('./Category.router')

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/category', categoryRouter)

module.exports = router