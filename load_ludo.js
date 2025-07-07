
var fs = require ('fs');
let stdin = fs.openSync("/dev/stdin","rs");

const read = function(message) {
    fs.writeSync(process.stdout.fd, message + " ");
    let s = '';
    let buf = Buffer.alloc(1);
    fs.readSync(stdin,buf,0,1,null);
    while((buf[0] != 10) && (buf[0] != 13)) {
        s += buf;
        fs.readSync(stdin,buf,0,1,null);
    }
    return s;
}






global.mysql=require('mysql2');
global.mysql_pro = require('mysql2/promise');
global.rootfolder=__dirname;

global.ludotables = [];

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

// global.con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

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



function transform(str,index){
    let c=str.charCodeAt(index);
    let letter=(c >= 65 && c < 91) || (c >= 97 && c < 123);
    let lower=(c >= 97 && c < 123);
    let upper=!lower;
    if(!letter) return c;
    if(index==0 && lower){
        return c-32;        
    } 
    let cprev=str.charCodeAt(index-1);
    let initial=!((cprev >= 65 && cprev < 91) || (cprev >= 97 && cprev < 123));
    if(initial && lower){
        return c-32;        
    }
    if(!initial && upper){
        return c+32;
        
    }
    
    return c;
}

function cap_initials(_in){
    var _out="";
    for(let i =0;i< _in.length;i++){
        _out=_out.concat(String.fromCharCode(transform(_in,i)));
    }
    return _out
}

function load_data(file,filter){
    var filedata=fs.readFileSync(file)
    var lines=filedata.toString().split("\n")
    var nlines=lines.length;
    var entries=[];
    for(let i=1;i<nlines;i++){
        var data=lines[i].split(",");
        if(data[2]!=filter) continue;
        entries.push({
            title:cap_initials(data[0]),owner:data[1],ludo:data[2]
        })
    }
    console.log(entries);
    return entries;
}


var sql_loader = require('./sql_loader.js');

function get_bgg_options(title){
    var exec= require('child_process').execSync;
    var data;
    try{
        data=exec('searchbgg "'+game+'"');
    }catch(err){
        console.log(err);
        return [];
    }
    var lines=data.split('\n');
    var tokens = [];
    for(let i=0;i<lines.length-1;i++){
        tokens[i]=lines[i].split('###');
    }
    var count=tokens.length;
    if(count==0){
        return [];       
    }
    return tokens;
}

var reallyset_bggid=async function(id,bggid,query){
    console.log(query);
    try{
        await global.pool.query(query);
    }catch(err){
        console.log(err);        
        return;
    }
    await global.process_sql_call("CALL collection_assign_bggid("+id+" , "+bggid+" , 1,false)");
    return;
}

//Ok
var set_bggid =async function (id,bggid){
    var exec= require('child_process').execSync;
    var stdout=exec('bggextract '+bggid);
    await reallyset_bggid(id,bggid,stdout);        
}

function solve_conflict(game,options){
    var value=-1;
    while(true){
        console.log("/****************************************/");
        console.log("Select correct BGGID for game "+game.Title+" :");
        console.log("0 => Cancel Operation")
        for(let i=0;i<options.length;i++){
            console.log(""+(i+1)+" => ["+options[i][0]+"] "+options[i][1]+" ("+options[i][2]+")")
        }
        var selected=read("Select value")
        var selectednum=-1
        try{
            selectednum=parseInt(selected);
        }catch(err){
            continue;
        }
        if(selectednum<0) continue;
        if(selectednum>options.length) continue;
        if(selectednum==0) return null;
        return options[selectednum-1][0];
    }
}

async function process_file(file,event_name,filter){
    //recover the id
    var event_ids=await global.process_sql_call('SELECT ev_ID FROM BGM_Events WHERE  ev_Name="'+event_name+'"');
    console.log(event_ids);
    if(event_ids.length==0){
        //Create the event
        var result=await global.process_sql_call("CALL event_add('"+event_name+"',true)",null);
        if(result<0){
            console.log("Cannot create event "+event_name);        
            return;
        } 
        await global.process_sql_call("CALL event_add('"+event_name+"',false)",null);
        event_ids=await global.process_sql_call('SELECT ev_ID FROM BGM_Events WHERE  ev_Name="'+event_name+'"');
    }
    //recover the id
    var event_id=event_ids[0];
    console.log(event_id);
    //recover the data of the games
    var games=load_data(file,filter);
    //Add the games as part of the event
    for(let game of games){
       var result=await global.process_sql_call("CALL collection_add_event_game('"+game.title+"','"+game.owner+"',"+event_id+",true)",null);
       if(result<0){
         console.log("Cannot add game to event "+event_name);
         return;
       }
       await global.process_sql_call("CALL collection_add_event_game('"+game.title+"','"+game.owner+"',"+event_id+",false)",null,1);
    }
    var nfailed =0;
    var nsuccess=0;
    var nmanual=0;
    var nassigned=0;
    var conflicts=[];
    //recover list of IDs
    var ev_games=await global.process_sql_call("SELECT col_ID AS ID, col_ShowName AS Title, col_BGGID AS BGGID FROM BGM_Collection WHERE col_Enabled = 1 AND col_Event_ID="+event_id+" ORDER BY col_ShowName");
    //try to assign bgg ids to games
    for(let game of ev_games){
        if(game.BGGID!=null){
            nassigned++;
            console.log("Game "+game.Title+" has BGGID= "+game.BGGID)
            continue;
        }
        //recover possible bggids
        var bggids=get_bgg_options(game.Title);
        if(bggids.length==0){
            nfailed++;
            console.log("Game "+game.Title+" has no BGG match")
            continue;
        }
        else if(bggids.length==1){
            nsuccess++;
            console.log("Assigning BGGID "+bggids[0]+"to Game "+game.Title);
            await set_bggid(game.ID,bggids[0]);
            continue;
        }
        else{
            nmanual++;
            var bggid=solve_conflict(game,options);
            console.log("Assigning BGGID "+bggid+"to Game "+game.Title);
            await set_bggid(game.ID,bggid);
        }
    }
}

var event=read("Select Event name:");
var file=read("Set CSV source file:");
var filter=read("Set Third column filter:");
process_file(file,event,filter);


