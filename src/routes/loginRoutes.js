const express = require('express');
const loginRouter = express.Router();
var bodyParser = require('body-parser'); 
const Userdata = require('../model/Userdata');

function router(nav1,nav2){ 
    loginRouter.use(bodyParser.urlencoded({ extended: true })); 
    loginRouter.get('/', function(req,res){
        nav=nav2;
        res.render("login", 
        {
            nav,
            title: 'Library App'
        }); 
    });

    loginRouter.post('/', function(req,res){
        if(req.body.name == "" || req.body.pwd ==""){
            nav=nav2;
            res.render("login", 
            {
                nav,
                title: 'Library App',
                msg: 'Enter Username and Password'
            });    
        }
        else{
            Userdata.findOne({name: req.body.name})
            .then(function(user){
                if(user.pwd == req.body.pwd){
                    nav=nav1;
                    res.render("home", 
                    {
                        nav,
                        title: 'Library App',
                        msg:''
                    });
                }
                else{
                    nav=nav2;
                    res.render("login", 
                    {
                        nav2,
                        title: 'Library App',
                        msg: 'Wrong Password'
                    });
                }
            })
            .catch(function(){
                nav=nav2;
                res.render("login", 
                {
                    nav,
                    title: 'Library App',
                    msg: 'Wrong Username'
                });
            })
        }
    });

    return loginRouter;
}

module.exports = router;