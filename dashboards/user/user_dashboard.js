
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

    html_source=__dirname + '/user_dashboard.html';
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
    reqdata.dlink=null;
    return reqdata;
}

function html_default_callback(_callback){
    _callback();
}

function verify_access(acc_level,view){
    if(view === "viewinfo"){
        return acc_level>0;
    }
     if(view === "viewludo"){
        return acc_level>0;
    }
    if(view === "viewgames"){
        return acc_level>10;
    }
    if(view === "editgames"){
        return acc_level>10;
    }
    if(view === "editloans"){
        return acc_level>10;
    }
    if(view === "editaccess"){
        return acc_level>20;
    }
    if(view === "editglobal"){
        return acc_level>20;
    }
    return false;
}



async function handle_usr_request (req,res){
    set_defaults();
    var reqdata=init_reqdata();
    resp_html=res;
    var sd=req.session;
    if(req.path === "/usr/login/"){
        if(! req.session.isLoggedIn){
            res.redirect('/?login=1');
        }
        else{
            res.redirect('/usr/mygames');
        }
        return;
    }
    if(! req.session.isLoggedIn){
        res.redirect('/?msg=Session Expired');
        return;
    }
    reqdata.path=req.path;
    reqdata.subpath=reqdata.path.substr(5);
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
    }

    // console.log(reqdata);

    if(reqdata.path === "/usr/event/"){
        reqdata.event_id=parseInt(req.query.id);
        reqdata.event_view=req.query.view;
        reqdata.event_name=req.query.name;
        //verify access
        result = await  global.process_sql_call("CALL user_get_privilege("+reqdata.user_id+","+reqdata.event_id+")",res);
        if(result==null) return;
        reqdata.event_access=parseInt(result.l_access);

        result = await  global.process_sql_call("CALL directlink_get_name("+reqdata.event_id+")",null);
        if(result!=null) reqdata.dlink=result.dlink;


        if(!verify_access(reqdata.event_access,reqdata.event_view)){
            resp_html.redirect('/?msg=Access Denied');
            return;
        }
        else{
            html_source=__dirname + '/user_dashboard.html';
            html_second_menu=create_event_menu(reqdata);
            reqdata.selected_view=reqdata.event_view;
            parse_user_request_auth_ok(req,res,reqdata);
        }
    }
    else if(reqdata.path === "/usr/assoc/"){
        reqdata.assoc_id=parseInt(req.query.id);
        reqdata.assoc_view=req.query.view;
        reqdata.assoc_name=req.query.name;
        //verify access
        result = await  global.process_sql_call("CALL user_get_privilege("+reqdata.user_id+","+reqdata.assoc_id+")",res);
        if(result==null) return;
        reqdata.assoc_access=parseInt(result.l_access);

        result = await  global.process_sql_call("CALL directlink_get_name("+reqdata.assoc_id+")",null);
        if(result!=null) reqdata.dlink=result.dlink;

        if(!verify_access(reqdata.assoc_access,reqdata.assoc_view)){
            resp_html.redirect('/?msg=Access Denied');
            return;
        }
        else{
            html_source=__dirname + '/user_dashboard.html';
            html_second_menu=create_assoc_menu(reqdata);
            reqdata.selected_view=reqdata.assoc_view;
            parse_user_request_auth_ok(req,res,reqdata);
        }
    }
    else{
        html_source=__dirname + '/user_dashboard.html';
        html_second_menu="";
        parse_user_request_auth_ok(req,res,reqdata);
    }
}


//CREAZIONE MENU SECONDARIO

function create_event_menu(reqdata){
    var result="";
    //recover access level
    result='<div class="navbar" style="background-color:#555">\n'
    result+='<a><b>'+reqdata.event_name+'</b></a>\n';
    result+='<a href="/usr/event/?id='+reqdata.event_id+'&view=viewinfo&name='+reqdata.event_name+'" id="menu_viewinfo">Informazioni</a>\n';
    result+='<a href="/usr/event/?id='+reqdata.event_id+'&view=viewludo&name='+reqdata.event_name+'" id="menu_viewludo">Ludoteca</a>\n';
    if(reqdata.event_access>10){
        result+='<a href="/usr/event/?id='+reqdata.event_id+'&view=editloans&name='+reqdata.event_name+'" id="menu_editloans">Gestisci Prestiti</a>\n';
    }
    if(reqdata.event_access>20){
        result+='<a href="/usr/event/?id='+reqdata.event_id+'&view=editgames&name='+reqdata.event_name+'" id="menu_editgames">Gestisci Giochi</a>\n';
        result+='<a href="/usr/event/?id='+reqdata.event_id+'&view=editaccess&name='+reqdata.event_name+'" id="menu_editaccess">Gestisci Accessi</a>\n';
        result+='<a href="/usr/event/?id='+reqdata.event_id+'&view=editglobal&name='+reqdata.event_name+'" id="menu_editglobal">Gestisci Evento</a>\n';
    }
    result+='</div>\n';
    return result;
}

function create_assoc_menu(reqdata){
    var result="";
    //recover access level
    result='<div class="navbar" style="background-color:#555">\n'
    result+='<a><b>'+reqdata.assoc_name+'</b></a>\n';
    result+='<a href="/usr/assoc/?id='+reqdata.assoc_id+'&view=viewinfo&name='+reqdata.assoc_name+'" id="menu_viewinfo">Informazioni</a>\n';
    result+='<a href="/usr/assoc/?id='+reqdata.assoc_id+'&view=viewludo&name='+reqdata.assoc_name+'" id="menu_viewludo">Collezione</a>\n';
    if(reqdata.assoc_access>10){
        result+='<a href="/usr/assoc/?id='+reqdata.assoc_id+'&view=viewgames&name='+reqdata.assoc_name+'" id="menu_viewgames">Tutti i Giochi</a>\n';
        result+='<a href="/usr/assoc/?id='+reqdata.assoc_id+'&view=editgames&name='+reqdata.assoc_name+'" id="menu_editgames">Gestisci Giochi</a>\n';
        result+='<a href="/usr/assoc/?id='+reqdata.assoc_id+'&view=editloans&name='+reqdata.assoc_name+'" id="menu_editloans">Gestisci Prestiti</a>\n';
    }
    if(reqdata.assoc_access>20){
        result+='<a href="/usr/assoc/?id='+reqdata.assoc_id+'&view=editaccess&name='+reqdata.assoc_name+'" id="menu_editaccess">Gestisci Accessi</a>\n';
        result+='<a href="/usr/assoc/?id='+reqdata.assoc_id+'&view=editglobal&name='+reqdata.assoc_name+'" id="menu_editglobal">Gestisci Associazione</a>\n';
    }
    result+='</div>\n';
    return result;
}

function create_selection(reqdata){
    var selected='';
    if(reqdata.subpath.startsWith("mygames")){
        selected='"mygames","user"';
    }
    else if(reqdata.subpath.startsWith("collection")){
        selected='"collection","user"';
    }
    else if(reqdata.subpath.startsWith("fostergames")){
        selected='"fostergames","user"';
    }
    else if(reqdata.subpath.startsWith("assoc")){
        selected='"assoc","'+reqdata.assoc_name+'","'+reqdata.selected_view+'"';
    }
    else if(reqdata.subpath.startsWith("event")){
        selected='"event","'+reqdata.event_name+'","'+reqdata.selected_view+'"';
    }
    else if(reqdata.subpath.startsWith("profile")){
        selected='"user","profile"';
    }
    else if(reqdata.subpath.startsWith("webmaster")){
        selected='"WebMaster"';
    }
    return selected;
}


//Creazione dashboard generale
async function recover_event_list(reqdata,res){
    var result="";

    var evlist = await global.process_sql_call("CALL user_get_event_list("+reqdata.user_id+")",res,1);
    if(evlist==null) return;
    var nevents=evlist.length;
    if(nevents==0){
        return "";
    }
    for(let i=0;i<nevents;i++){
        var _name=evlist[i].ev_Name;
        result+='<a href="/usr/event/?id='+evlist[i].ev_ID+'&view=editloans&name='+_name+'" id="menu_'+_name+'">'+_name+'</a>\n';
    }
    return result;
}

async function recover_assoc_list(reqdata,res){
    var result="";
    var row;
    var asslist = await global.process_sql_call("CALL user_get_association_list("+reqdata.user_id+")",res,1);
    if(asslist==null) return;
    var nevents=asslist.length;
    if(nevents==0){
        return "";
    }
    for(let i=0;i<nevents;i++){
        var _name=asslist[i].ass_Name;
        result+='<a href="/usr/assoc/?id='+asslist[i].ass_ID+'&view=viewinfo&name='+_name+'" id="menu_'+_name+'">'+_name+'</a>\n';
    }
    return result;
}

async function build_main_menu(reqdata,res){
    console.log("in build_main_menu");
    var str;

    str=await recover_event_list(reqdata,res);
    if(str==null){
        resp_html.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
        resp_html.end("404 Not Found");
        return false;
    }
    html_datastring= html_datastring.replace("<!--EVENT_MENU-->",str);

    str=await recover_assoc_list(reqdata,res);
    if(str==null){
        resp_html.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
        resp_html.end("404 Not Found");
        return false;
    }
    html_datastring= html_datastring.replace("<!--ASSOC_MENU-->",str);

    html_datastring= html_datastring.replace("<!--SECONDARY_NAVBAR-->",html_second_menu);
    html_datastring= html_datastring.replace("<!--SELECTED-->",create_selection(reqdata));
    return true;

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
    var myviewpath=__dirname+"/"+reqdata.path.replace("usr","views")+"/";
    if(reqdata.selected_view!=null) myviewpath+= reqdata.selected_view;


    var _body=await build_body(myviewpath,reqdata);
    html_datastring= html_datastring.replace("<!--BODY-->",_body);
    html_datastring= html_datastring.replace("<!--SCRIPTS-->",build_scripts(reqdata));
    html_datastring= html_datastring.replace("<!--FORMS-->",build_forms());
    return true;
}


function prepare_html(reqdata){

    resp_html.writeHead(200, {'Content-Type': 'text/html'});
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
        var goon=await build_main_menu(reqdata);
        if(!goon) return;
        var goon=await build_view(reqdata);
        if(!goon) return;
        prepare_html(reqdata);
    } catch (err) {
        console.log(err);
        resp_html.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
        return resp_html.end("404 Not Found");
    }
}

module.exports.handle_usr_request = handle_usr_request;
