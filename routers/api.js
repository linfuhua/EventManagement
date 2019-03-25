var express = require("express");
var router = express.Router();
var User = require("../models/User");
var Event = require("../models/Event");
var resondMes;
router.use(function (req,res,next) {
    resondMes = {
        code : 0,
        message :''
    };
    next()
});

// router.post('/user/register',function (req, res, next) {
//     var username  = req.body.username;
//     var password = req.body.password;
//     //用户名不能为空
//     if(username == ''){
//         resondMes.code = 1;
//         resondMes.message = "用户名不能为空";
//         res.json(resondMes);
//         return
//     }
// //    密码不能为空
//     if(password == ''){
//         resondMes.code = 2;
//         resondMes.message = "密码不能为空";
//         res.json(resondMes);
//         return
//     }
//
//     User.findOne({
//        username : username
//     }).then(function (userInfo) {
//         console.log(userInfo);
//         if(!userInfo){
//         //    表示数据库有该记录
//             var user = new User({
//                 username : username,
//                 password :password
//             });
//             return  user.save();
//         }
//     }).then(function (newUserInfo) {
//         console.log(newUserInfo);
//         resondMes.message = "登录成功";
//         res.json(resondMes);
//     });
//     // resondMes.message = "登录成功";
//     // res.json(resondMes);
// });

//页面跳转
router.get('/firstPage',function (req,res,next) {
    res.render('main/firstPage');
});
router.get('/search',function (req,res,next) {
    res.render('main/Search');
});
router.get('/create',function (req,res,next) {
    res.render('main/Create');
});
router.get('/admin',function (req,res,next) {
    res.render('main/Admin')
});

//查询全部
router.post('/event/queryAll',function (req,res,next) {
    var name =  req.body.name;
    Event.find({},function (err,doc) {
        if(err){
            res.json({
                status:"1",
                msg:err.message,
                result:''
            });
        }else{
            if(doc){
                res.json({
                    status:"0",
                    msg:'',
                    result:doc
                });
                console.log(doc);
            }else{
                console.log("查询为空");
                res.json({
                    status:"1001",
                    msg:'查询为空',
                    result:''
                });
            }
        }
    })
});

//details查询
router.post('/event/queryFirst',function (req,res,next) {
    var name =  req.body.name || '';
    Event.findOne({name:name},function (err,doc) {
        if(err){
            res.json({
                status:"1",
                msg:err.message,
                result:''
            });
        }else{
            if(doc){
                res.json({
                    status:"0",
                    msg:'',
                    result:doc
                });
                console.log(doc);
            }else{
                console.log("查询为空");
                res.json({
                    status:"1001",
                    msg:'查询为空',
                    result:''
                });
            }
        }
    })
});

//Event添加
router.post("/event/createEvent",function (req,res,next) {
    var name =  req.body.name;
    var des = req.body.des;
    var fulldes = req.body.fulldes;
    var data = req.body.data;
    var time = req.body.time;
    var top = req.body.top;
    Event.create({
        name: name,
        des: des,
        fulldes: fulldes,
        data :data,
        time:time,
        top:top
    }, function (error, doc) {
        if (error) {
            console.error(error);
            res.json({
                status:"0",
                msg:error.message,
                result:''
            });
        } else {
            console.error(doc);
            res.json({
                status:"0",
                msg:'',
                result:doc
            });
        }

    })
});


//Event 删除
router.post("/event/deleteEvent",function (req,res,next) {
    var name = req.body.name;
    console.log(name);
    Event.findOne({'name':name},function (err,doc) {
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            })
        }else{
            doc.remove(function (err, doc1) {
                if(err){
                    res.json({
                        status:'1001',
                        msg:err.message,
                        result:''
                    })
                }else{
                    res.json({
                        status:'0',
                        msg:'',
                        result:'删除成功！！'
                    })
                }
            })
        }
    })
});

//Event 更新
router.post("/event/updateEvent",function (req,res,next) {
    var name = req.body.name;
    var newName = req.body.newName;
    var des = req.body.newDes;
    var fulldes = req.body.newFulldes;
    var date = req.body.newDate;
    var time = req.body.newTime;
    var top = req.body.newTop;
    Event.update({'name':name},{
        $set:{'name':newName,'des':des,'fulldes':fulldes,'data':date,'time':time,'top':top}
    },function (err,doc) {
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            })
        }else{
            res.json({
                status:'0',
                msg:'',
                result:'修改成功！！！'
            })
        }
    })
});
module.exports = router;