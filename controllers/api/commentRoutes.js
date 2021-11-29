const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//create post
router.post('/',withAuth, async (req,res) => {
    try{
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newComment);
    } catch(err)  {
        res.status(400).json(err);
    }
})
//grabs current comment. need one for all comments connected to a blog
router.post('/:id',withAuth, async (req,res)=> {
    try {
        const commentData = await Blog.findByPk(req.params.id, {
            where: {
                user_id: req.session.user_id,
                id: req.params.id
            }
        });
        if(!commentData) {
            res.status(400).json({message: 'Cannot find blog with this id'})
        }
        res.status(200).json(commentData);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.delete('/:id',withAuth, async (req,res) => {
    try {
        const delData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if(!delData) {
            res.status(404).json({message: 'Project not found with this id'})
        };
        res.status(200).json(delData);
    } catch (err){
        res.status(500).json(err);
    }
});

module.exports = router;