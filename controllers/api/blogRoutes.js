const router = require('express').Router();
const { Blog, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', (req,res) => {
    Blog.findOne({
        where: {id: req.params.id },
        include: [User, Comment]
    }).then(blogdata => {
        res.json(blogdata)
    }).catch(err => {
        console.log(err);
        res.status(500).json('internal server error')
    })
});
//create post
router.post('/',withAuth, async (req,res) => {
    try{
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newBlog);
    } catch(err)  {
        res.status(400).json(err);
    }
})
//grabs current blog
router.post('/:id',withAuth, async (req,res)=> {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            where: {
                user_id: req.session.user_id,
                id: req.params.id
            }
        });
        if(!blogData) {
            res.status(400).json({message: 'Cannot find blog with this id'})
        }
        res.status(200).json(blogData);
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