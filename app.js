/**
 * 应用程序的启动（入口）文件
 */

//加载express模块
var express = require("express");
//加载数据库模块
var mongoose = require("mongoose");
//加载模板处理模块
var swig = require("swig");

//加载body-parser，用来处理post提交过来的数据
var bodyParser = require("body-parser");
//创建app应用 =》 NodeJs Http.createServer();
var app = express();

//设置静态文件托管
//当用户访问的url以 /public开始，那么直接返回对应的 __dirname + '/public' 下的文件
//静态文件处理
app.use( '/public', express.static( __dirname + '/public') );


//配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数：模板引擎的名称，同时也是模板文件的后缀，第二个参数表示用于解析处理模板内容的方法
app.engine('html',swig.renderFile);
//设置模板文件存放的目录，第一个参数必须是'views'，第二个参数是目录
app.set('views','./views');
//注册所使用的的模板引擎，第一个参数必须是 'view engine'，第二个参数和app.engine这个方法中定义的模板引擎的名称（第一个参数）是一致的。
app.set('view engine','html');


// app.get('/',function(req,res){
//     res.render('main/firstPage',{
//         title:'firstPage'
//     })
// });
// app.get('/search',function(req,res){
//     res.render('main/Search',{
//         title:'Search'
//     })
// });
// app.get('/create',function(req,res){
//     res.render('main/Create',{
//         title:'Create'
//     })
// });
// app.get('/admin',function(req,res){
//     res.render('main/Admin',{
//         title:'Admin'
//     })
// });

//在开发过程中，需要取消模板缓存
swig.setDefaults({cache:false});

/*
* 首页
* req request对象
* res response对象
* next 函数
* */
//动态文件处理
// app.get('/',function (req,res,next) {
//     // res.send('<h1>你好</h1>')
//     /*
//     *读取views目录下指定的文件，解析并返回给客户端
//     * 第一个参数：表示模板的文件，相对于views目录  views/index.html
//     **/
//     res.render('main/index')
// });

app.use(bodyParser.urlencoded({extended: true}));

app.use('/',require("./routers/main"));
app.use('/api',require("./routers/api"));
// app.use('/admin',require("./routers/admin"));


mongoose.connect('mongodb://localhost:27017/blog',function (err) {
    if(err){
        console.log("数据库链接失败！");
    }else {
        console.log("数据库连接成功");
        //监听http请求
        app.listen("8082");
    }
});

