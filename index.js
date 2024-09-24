var express = require('express')
var session = require('express-session');
var app = express()
var server = require('http').createServer(app);
global.io = require('socket.io')(server); //require socket.io module and pass the http object (server)

global.mysql=require('mysql2');
global.mysql_pro = require('mysql2/promise');
global.rootfolder=__dirname;

var sql_loader = require('./sql_loader.js');

// global.user_handler = require('./user/user_dashboard.js');

global.pool = global.mysql_pro.createPool({
  host: "localhost",
  user: "fi-gioca-admin",
  password: "fi-gioca-admin",
  database: "bgm2",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

global.con = global.mysql.createConnection({
  host: "localhost",
  user: "fi-gioca-admin",
  password: "fi-gioca-admin",
  database: "bgm2"
});

global.con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

global.process_sql_call =async function(query,responder=null,depth=2){
    console.log("Sending SQL Query : "+query);
    var row;
    try{
      [row] = await global.sql_loader_call(query);
      console.log(row);
    }catch(err){
        console.log(err);
        if(responder != null) responder.redirect('/?msg=Unknown Error');
        return null;
    }

    if(depth==1){
      console.log(row);
      return row;
    }
    else if (depth==2){
      console.log(row[0]);
      return row[0];
    }
    console.log(row[0][0]);
    return row[0][0];
}

app.use(session({
  secret: 'ASdyafy80a08235b9guai',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000*60*60 }
}));

var fs = require('fs');

const port = 3000;

function handle_fileread(err,data,res,login,msg){
    if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
        return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    datastr=data.toString();
    if(login!=null){
        datastr=datastr.replace("<!--LOGIN-->",login);
    }
    else{
        datastr=datastr.replace("<!--LOGIN-->","0");
    }
    if(msg!=null){
        datastr=datastr.replace("<!--MSG-->","\""+msg+"\"");
    }
    else{
        datastr=datastr.replace("<!--MSG-->","null");
    }
    res.write(datastr);
    return res.end("",'utf8');
};

app.get('/', (req, res) => {
    res.redirect('/viewer/');
});

//     var login=req.query.login;
//     var msg=req.query.msg;
//     fs.readFile(__dirname + '/root.html', (err,data) =>{
//       handle_fileread(err,data,res,login,msg);
//   });
// });

// global.app.get('/usr',global.user_handler.handle.handle_usr_request);
app.get('/usr/*',(req,res) =>{
  console.log("requested page "+req.path);
  var user_handler=require('./dashboards/user/user_dashboard.js');
  user_handler.handle_usr_request(req,res);
});

// global.app.get('/usr',global.user_handler.handle.handle_usr_request);
app.get('/viewer/*',(req,res) =>{
  console.log("requested page "+req.path);
  var viewer_handler=require('./dashboards/viewer/viewer_dashboard.js');
  viewer_handler.handle_request(req,res);
});

app.get('/admin/*',(req,res) =>{
  console.log("requested page "+req.path);
  var admin_handler=require('./dashboards/admin/admin_dashboard.js');
  admin_handler.handle_admin_request(req,res);
});



app.post('/login/', (req,res) =>{
  console.log("requested login");
  var usr_log=require('./user_log.js');
  usr_log.login(req,res);
});


app.get('/logout/', (req,res) =>{
  console.log("requested logout");
  var usr_log=require('./user_log.js');
  usr_log.logout(req,res);
});


/*
global.app.get('/', (req, res) => {
    var login=req.query.login;
    var msg=req.query.msg;
    fs.readFile(__dirname + '/index.html', (err,data) =>{
      handle_fileread(err,data,res,login,msg);
  });
})


global.app.get('/admin/', (req,res) => {
    var replier=require('./admin/admin.js');
    replier.handler(req,res);
});

global.app.post('/admin/login/', (req,res) => {
    var usr_log=require('./user_log.js');
    usr_log.login(req,res);
});

global.app.post('/admin/logout/', (req,res) => {
    var usr_log=require('./user_log.js');
    usr_log.logout(req,res);
});




/*
global.app.post('/admin/user/login', (req,res) => {
    console.log("inside post");
    var replier=require('./admin/user/login.js');
    replier.handler(req,res);
});*/

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});



