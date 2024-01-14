const express = require('express');
const router = express.Router();
const { checkToken } = require('../../auth/token_validation');
const { offerInvestment, getInvestmentsByDeveloper } = require('../investments/investment.controller');

router.post('/investments/offer', checkToken, offerInvestment);
router.get('/investments/developer/:developerId', checkToken, getInvestmentsByDeveloper);

module.exports = router;
