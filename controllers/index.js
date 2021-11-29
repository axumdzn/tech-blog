const router = require('express').Router();

const api = require('./api');

router.use('/api', api);

const frontEndRoutes = require('./frontendRoutes');
router.use(frontEndRoutes);

module.exports = router;