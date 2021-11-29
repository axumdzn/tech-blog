const router = require('express').Router();

const user = require('./userRoutes');
const blog = require('./blogRoutes');
const comment = require('./commentRoutes');

router.use('/users',user);
router.use('/blogs',blog);
router.use('/comments',comment);

module.exports = router;