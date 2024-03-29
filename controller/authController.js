const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../model/userSchema');
const router = express.Router();

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//list all user
router.get('/users',(req,res) => {
    User.find({}).then(function (users) {
        res.send(users);
        });

})


// module.exports={
//     try{
//         const User=await User.find()
//         res.status(200).son(User)
//     }catch(error){
//         res.status(400).json({message:"error finding users"})
//     }
//     }







//register user
router.post('/register',(req,res) => {
    let hashpassword = bcrypt.hashSync(req.body.password,8);
    User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashpassword,
        phone:req.body.phone
        // role:req.body.role?req.body.role:'User'
    })
    .then(function (users) {
        res.send(users);
        });
})

//login user
// router.post('/login',(req,res) => {
//     User.findOne({email:req.body.email},(err,user) => {
//         if(err) return res.status(500).send({auth:false,token:'There is problem while login'})
//         if(!user) return res.status(201).send({auth:false,token:'No User Found Register First'});
//         else{
//             const passIsvalid = bcrypt.compareSync(req.body.password,user.password);
//             if(!passIsvalid) return res.status(201).send({auth:false,token:'Invalid Password'});
//             let token = jwt.sign({id:user._id},config.secert,{expiresIn:86400})
//             return res.status(200).send({auth:true,token});
//         }
//     })
// })



router.post('/login',(req,res) => {
    User.findOne({email:req.body.email})

    .then((user)=>{
        if(!user)
        { 
            return res.status(201).send({auth:false,token:'No User Found Register First'})
        }
        else{
            const passIsvalid = bcrypt.compareSync(req.body.password,user.password);
            if(!passIsvalid) return res.status(201).send({auth:false,token:'Invalid Password'});
            let token = jwt.sign({id:user._id},config.secert,{expiresIn:86400})
            return res.status(200).send({auth:true,token, user});

        }

    })
    .catch((err)=>{
        return res.status(500).send({auth:false,token:'There is problem while login'});
    });
        
        
        
    //     ,(err,user) => {
    //     if(err) return res.status(500).send({auth:false,token:'There is problem while login'})
    //     if(!user) return res.status(201).send({auth:false,token:'No User Found Register First'});
    //     else{
    //         const passIsvalid = bcrypt.compareSync(req.body.password,user.password);
    //         if(!passIsvalid) return res.status(201).send({auth:false,token:'Invalid Password'});
    //         let token = jwt.sign({id:user._id},config.secert,{expiresIn:86400})
    //         return res.status(200).send({auth:true,token});
    //     }
    // })
})


//userInfo
router.get('/userInfo',(req,res) => {
    let token = req.headers['x-access-token']
    // if(!token) return res.status(201).send({auth:false,token:'No Token Provided'});
    // jwt.verify(token,config.secert,(err,data) => {
    //     if(err) return res.status(201).send({auth:false,token:'Invalid Token'});
    //     User.findById(data.id,(err,user) => {
    //         res.send(user)
    //     })
    // })


    // jwt.verify(token,config.secert)

        if(!token) {
            return res.status(201).send({auth:false,token:'No Token Provided'});
        }
        else{
            jwt.verify(token,config.secert,(err, user) => {
                if (err) {
                  console.log(err);
                  return res.status(201).send({auth:false,token:'Invalid Token'});
                }else{
                    res.send(user);
                    sessionStorage.setItem('userInfo',user);

                    // let users = User.findById(user.id)
                    // .then(
                    //     res.send(users))

                    // res.send(users)

                    // sessionStorage.setItem('userInfo',users);

                }

        }
            )
    }


    // .catch((err) => {
    //     return res.status(201).send({auth:false,token:'Invalid Token'});
    // }
    // )
        
        
        
        

})

module.exports = router;