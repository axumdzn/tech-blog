const express = require('express');
const router = express.Router();
const { User, Blog, Comment } = require('../models');

router.get("/", (req, res) => {
    Blog.findAll({
        order:[["updatedAt",'DESC']],
        include:[User]
    }).then(postData=>{
        const hbsPost = postData.map(blog=>blog.get({plain:true}))
        res.render("home",{
            blogs:hbsPost
        })
    })
});

router.get("/dashboard",(req,res)=>{
    if(!req.session.user_id){
        return res.redirect("/login")
    };
    User.findOne({
        where:{id: req.session.user_id},
        include:[Blog],
    }).then(userData=>{
        const hbsUser = userData.get({plain:true});
        console.log(hbsUser);
        res.render("dashboard",hbsUser)
    })
});

router.get("/login",(req,res)=>{
    res.render("login")
});

router.get("/signup",(req, res) => {
    res.render('signup')
});

router.get("/newpost",(req, res) => {
    res.render('newpost')
});

router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.render("logout")
});


module.exports = router;