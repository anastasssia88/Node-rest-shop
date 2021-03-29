const express = require('express')
const router = express.Router() 

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requstion for /orders'
    })
})

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }

    res.status(201).json({
        message: 'Handling POST requstion for /orders',
        order: order
    })
})

router.patch('/:oderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order updated'
    })
})

router.delete('/:oderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order deleted'
    })
})

module.exports = router;