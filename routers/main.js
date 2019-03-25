var express = require("express");
var router = express.Router();
var Event = require("../models/Event");
router.get('/',function (req,res,next) {
    res.render('main/firstPage')
});

// router.post('/queryFirst',function (req,res,next) {
//     var name =  req.body.;
//     Event.findOne({'name':name},function (err,doc) {
//         if(err){
//             res.json({
//                 status:"1",
//                 msg:err.message,
//                 result:''
//             })
//         }else{
//             if(doc){
//                 res.json({
//                     status:"0",
//                     msg:'',
//                     result:doc
//                 })
//             }
//         }
//     })
// });

module.exports=router;