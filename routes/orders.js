

const path = require('path');

const express = require('express');

const orderController = require('../controllers/orders');

const router = express.Router();

router.get('/orders', orderController.getOrders);

router.get('/checkout', orderController.getCheckout);
router.post('/newcart',orderController.getNewCart);

router.post('/deleteCart',orderController.DeleteCartItems);
router.post('/orders',orderController.PostOrder);
router.get('/orderItems',orderController.getOrdersItems);

module.exports = router;