var express = require('express')
var session = require('express-session');
var app = express()
var server = require('http').createServer(app);

var sql_loader = require('./sql_loader.js');
global.io = require('socket.io')(server); //require socket.io module and pass the http object (server)

global.mysql=require('mysql2');
global.mysql_pro = require('mysql2/promise');
global.rootfolder=__dirname;

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


app.use(session({
  secret: 'ASdyafy80a08235b9guai',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000*60*60 }
}));

var fs = require('fs');

const port = 3000;

function handle_fileread(err,data,res){
    if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
        return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    datastr=data.toString();
    res.write(datastr);
    return res.end("",'utf8');
};

app.get('/', (req, res) => {
    fs.readFile(__dirname + '/tester.html', (err,data) =>{
      handle_fileread(err,data,res);
  });
});

async function do_query(data){
  var row=await global.sql_process_call(data);
    if(row!=null)  console.log(row);
  return;
}

global.io.sockets.on('connection', function (socket) {// WebSocket Connection
  console.log("creating socket");

//Assignation/Removal to EVENT
  socket.on("query",(data) =>{
    console.log('received query "'+data+'"');
    do_query(data);
  });
});




server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});



