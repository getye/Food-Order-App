const express = require('express');
const MenuController = require('../controllers/MenuController');
const protect = require('../middleware/auth');
const menuRouter = express.Router();
const pizza = require('../middleware/pizza-images')

menuRouter.post('/kitchen-manager/add/menu', pizza.single('picture'), protect, MenuController.addMenu);
menuRouter.get('/customer/view/menus', MenuController.viewMenus); 
menuRouter.post('/customer/order/pizza', protect, MenuController.orderPizza); 
menuRouter.get('/customer/view/orders', protect, MenuController.viewOrders); 
menuRouter.get('/manager/view/orders', protect, MenuController.managerViewOrders); 
menuRouter.get('/manager/view/menus', protect, MenuController.managerViewMenus); 
menuRouter.put('/kitchen-managr/update/order/status/:order_id', MenuController.updateOrderStatus);
menuRouter.get('/reports/monthly-orders', protect, MenuController.reports); 



module.exports = menuRouter;
