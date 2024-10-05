const express = require('express');
const customerController = require('../controllers/userControllers');
const wrapAsync = require('../utils/wrapAsync');
const router = express.Router();


// ## home page GET / 
router.get('/', customerController.homePage);
router.get('/about', customerController.aboutPage);

router.get('/new', customerController.renderNewForm);
router.post('/new', wrapAsync(customerController.addNewUser));
router.get('/show/:id', wrapAsync(customerController.renderShowpage));
router.get('/:id/edit', customerController.renderEditpage);
router.put('/:id', wrapAsync(customerController.updateDetails));
router.delete('/:id', wrapAsync(customerController.destroyCustomerDetails));
router.post('/search', wrapAsync(customerController.searchCustomer));

module.exports = router;