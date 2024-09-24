
var resp_html;

var fs = require('fs');

var html_datastring="";

// var usr_event_list="";
// var usr_assoc_list="";

// var event_replier=require('./event/event.js');

var html_source="";


var html_second_menu="";
// var html_second_menu_callback;

// var html_special_callback;

var socket_manager=require('./serv_scripts.js');

function set_defaults(){
    html_datastring="";

    html_source=__dirname + '/admin_dashboard.html';
    html_second_menu="";
    html_second_menu_callback=html_default_callback;
}

function init_reqdata(){
    var reqdata={};
    reqdata.path=null;
    reqdata.subpath=null;
    reqdata.user_name=null;
    reqdata.user_id=null;
    reqdata.event_name=null;
    reqdata.event_id=null;
    reqdata.event_view=null;
    reqdata.event_access=null;
    reqdata.assoc_name=null;
    reqdata.assoc_id=null;
    reqdata.assoc_view=null;
    reqdata.assoc_access=null;
    reqdata.selected_view=null;
    return reqdata;
}

function html_default_callback(_callback){
    _callback();
}

function verify_access(acc_level,view){
    return reqdata.user_id<0;
}

async function handle_admin_request (req,res){
    set_defaults();
    var reqdata=init_reqdata();
    resp_html=res;
    var sd=req.session;
    if(! req.session.isLoggedIn){
        res.redirect('/?msg=Session Expired');
        return;
    }
    reqdata.path=req.path;
    reqdata.subpath=reqdata.path.substr(7);
    console.log(reqdata.subpath);
    reqdata.user_name =req.session.username;
    if(reqdata.user_name==null){
        res.redirect('/');
        return;
    }
    var result = await global.process_sql_call("CALL user_get_id('"+reqdata.user_name+"')",res);
    if(result==null) return;
    else if(result.Result!=0){
        res.redirect('/?msg='+result.Errmsg);
        return;
    }
    else{
        reqdata.user_id=result.usr_ID;
        if(reqdata.user_id>=0){
            res.redirect('/?msg=Utente non autorizzato');
            return;
        }
    }

    html_source=__dirname + '/admin_dashboard.html';
    html_second_menu="";
    parse_user_request_auth_ok(req,res,reqdata);
}


//CREAZIONE MENU SECONDARIO

function create_selection(reqdata){
    var selected='';
    if(reqdata.subpath.startsWith("users")){
        selected='"user"';
    }
    else if(reqdata.subpath.startsWith("events")){
        selected='"event"';
    }
    else if(reqdata.subpath.startsWith("assocs")){
        selected='"assoc"';
    }
    return selected;
}

var build_generic = function (source){
    var result;
    try {
        const data = fs.readFileSync(source, 'utf8');
        // console.log(data);
        return data.toString();
    } catch (err) {
        // console.error(err);
        return "";
    }
}

var build_body =async function(path,reqdata){
    try{
        var body_builder=require(path+'/specbody.js');
        var res=await body_builder.specbody(reqdata);
        return res;
    }catch(err){
        console.log(err);
        return "";
    }
}

var printdata = function(o){
    var str='';

    for(var p in o){
        if(typeof o[p] == 'string'){
            str+= p + ": '" + o[p]+"',\n";
        }else{
            str+= p + ': ' + o[p] + ',\n';
        }
    }

    return str;
}


var build_scripts = function(reqdata){
   var result= build_generic(__dirname+'/client_scripts.js');
   result=result.replace("<!--REQDATA-->",printdata(reqdata));
   return result
}

var build_forms = function(){
    return build_generic(__dirname+'/client_forms.html');
}


async function build_view(reqdata){
    console.log("in build_view");
    console.log(reqdata);
    var myviewpath=__dirname+"/"+reqdata.path.replace("admin","views")+"/";
    if(reqdata.selected_view!=null) myviewpath+= reqdata.selected_view;


    var _body=await build_body(myviewpath,reqdata);
    html_datastring= html_datastring.replace("<!--BODY-->",_body);
    html_datastring= html_datastring.replace("<!--SCRIPTS-->",build_scripts(reqdata));
    html_datastring= html_datastring.replace("<!--FORMS-->",build_forms());
    return true;
}


function prepare_html(reqdata){

    resp_html.writeHead(200, {'Content-Type': 'text/html'});
    html_datastring=html_datastring.replace("<!--SELECTED-->",create_selection(reqdata));
    html_datastring=html_datastring.replace("<!--SELECTED_USER-->",reqdata.user_name);
    html_datastring=html_datastring.replace("<!--ACCOUNT_NAME-->",reqdata.user_name);
    resp_html.write(html_datastring,'utf8'); //write data from index.html
    return resp_html.end("",'utf8');
}

async function parse_user_request_auth_ok(req,res,reqdata){
    try {
        const data = fs.readFileSync(html_source, 'utf8');
        // console.log(data);
        html_datastring=data.toString();
        var goon=await build_view(reqdata);
        if(!goon) return;
        prepare_html(reqdata);
    } catch (err) {
        console.log(err);
        resp_html.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
        return resp_html.end("404 Not Found");
    }
}

module.exports.handle_admin_request = handle_admin_request;
