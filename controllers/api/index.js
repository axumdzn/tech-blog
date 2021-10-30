const router = require('express').Router();

const user = require('./userRoutes');
const blog = require('./blogRoutes');
const comment = require('./commentRoutes');

router.use('/user',user);
router.use('/blog',blog);
router.use('/comment',comment);

module.exports = router;