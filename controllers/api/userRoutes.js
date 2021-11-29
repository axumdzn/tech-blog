const router = require('express').Router();
const {User, Blog} = require('../../models');

router.get('/', (req,res) => {
    User.findAll({
        include:[Blog]
    }).then(dbUsers=>{
        if(dbUsers.length){
            res.json(dbUsers)
        } else {
            res.status(404).json({message:"No users found!"})
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"an error occured",err:err})
    })
});

router.post('/', async (req,res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
      
            res.status(200).json(userData);
        });
    } catch(err) {
        res.status(400).json(err)
    }
});

router.post('/login', async (req, res) => {
    try{
        const userData = await User.findOne({where: {username: req.body.username}});

        if(!userData) {
            res.status(400).json({message: 'Incorrect username or password, please try again'})
            return;
        }
        const validPass = await userData.checkPassword(req.body.password);
        
        if(!validPass) {
            res.status(400).json({message:'Incorrect usename or password, please try again'});
            return;
        }
        req.session.save(()=> {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({user: userData, message: 'Logged in'})
        });
    
    } catch(err) {
        res.status(400).json(err)
    }
});

router.post('/logout',(req,res)=> {
    if(req.session.logged_in) {
        req.session.destroy(()=> {
            res.status(204).end()
        })
    } else {
        res.status(404).end();
    }
})

module.exports = router;