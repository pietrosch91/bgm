/*
//Support functions
var standard_reply= function (rv,socket){
    if(rv==null){
        socket.emit('c_err',"Unkonwn Error");
        return;
    }
    var result = rv.Result;
    var msg = rv.Errmsg;
    if(result<0){
        socket.emit('c_err',msg);
    }
    else{
        socket.emit('refresh');
    }
}



//Assignation/Removal to EVENT

var get_evlist =async function(socket){
    var events = await global.process_sql_call("CALL event_get_list(false)",null,1);
    var count=events.length;
    var html_opts="";
    for(let i=0;i<count;i++){
        html_opts+="<option value=\""+events[i].ev_ID+"\">"+events[i].ev_Name+"</option>\n";
    }
    socket.emit("evlist",html_opts);
    return;
}

var send_game_to_event = async function(g_id,ev_id,socket){
    var result= await global.process_sql_call('CALL collection_send_to_event('+g_id+','+ev_id+',0)');
    standard_reply(result,socket);
}

var recover_game_from_event = async function(g_id,forced,socket){
    var result= await global.process_sql_call('CALL collection_retake_from_event('+g_id+','+forced+',0)');
    standard_reply(result,socket);
}


//Opening/closing LOAN
var get_loanlist =async function(exclude_id,socket){
    var html_opts="";

    var loaners=await global.process_sql_call("CALL user_get_list("+exclude_id+",false)",null,1);
    if(loaners==null){
        socket.emit('c_err',"Unkonwn Error");
        return;
    }
    var count=loaners.length;
    for(let i=0;i<count;i++){
        html_opts+="<option value=\""+loaners[i].usr_ID+"\">"+loaners[i].usr_Name+"</option>\n";
    }

    loaners=await global.process_sql_call("CALL association_get_list("+exclude_id+",false)",null,1);
    if(loaners==null){
        socket.emit('c_err',"Unkonwn Error");
        return;
    }
    var count=loaners.length;
    for(let i=0;i<count;i++){
        html_opts+="<option value=\""+loaners[i].ass_ID+"\">"+loaners[i].ass_Name+"</option>\n";
    }
    socket.emit("loanlist",html_opts);
    return;
}





var send_game_to_foster= async function(g_id,foster_id,socket){
    var result = await global.process_sql_call('CALL collection_send_to_foster('+g_id+','+foster_id+',false)');
    standard_reply(result,socket);
    return;
}

var recover_game_from_foster = async function(g_id,socket){
    var result= await  global.process_sql_call('CALL collection_retake_from_foster('+g_id+',false)');
    standard_reply(result,socket);
    return;
}

//game addition
var add_game =async function(g_title,ow_id,socket){
    var result = await global.process_sql_call('CALL collection_add_game("'+g_title+'",'+ow_id+',false)');
    standard_reply(result,socket);
    return;
}

//<!--Adding User To Privilege-->
var recover_unauthorized_users = async function(to_id,socket){
    var users=await global.process_sql_call("CALL access_get_abilitated_users('"+to_id+"')",null,1);
    var html_opts="";
    var count=users.length;
    for(let i=0;i<count;i++){
        if(users[i].usr_Access>0) continue;
        html_opts+="<option value=\""+users[i].usr_ID+"\">"+users[i].usr_Name+"</option>\n";
    }
    socket.emit("add_user",html_opts);
    return;
}

var set_user_privileges= async function(user_id,target_id,level,socket){
    var result = await global.process_sql_call('CALL user_set_privileges('+user_id+','+target_id+','+level+',false)');
    standard_reply(result,socket);
    return;
}



//<!-- Editing Assoc Information-->
var recover_assoc_info=async function(a_id,socket){
    var result=await global.process_sql_call("CALL association_get_info("+a_id+")",null);
    if(result == null){
        socket.emit('c_err',"Unkonwn Error");
        return;
    }
    if(result.Result <0 ) {
        socket.emit('c_err',result.Errmsg);
        return;
    }
    socket.emit("eaif_show",result._Phone,result._Mail,result._Site);
    return;
}

var set_assoc_info=async function(a_id,a_phone,a_mail,a_site,socket){
    var result = await global.process_sql_call('CALL association_set_info('+a_id+',"'+a_phone+'","'+a_mail+'","'+a_site+'",false)');
    standard_reply(result,socket);
    return;
}



//Game Notes Editing
var get_game_notes = async function(id,socket){
    var result = await  global.process_sql_call('CALL collection_get_notes('+id+')');
    if(result==null){
         socket.emit('c_err',"Unkonwn Error");
        return;
    }
    if(result.Result <0 ) {
        socket.emit('c_err',result.Errmsg);
        return;
    }
    socket.emit("get_game_notes",result.Notes);
}

var set_game_notes = async function(id,notes,socket){
    var result = await global.process_sql_call('CALL collection_set_notes('+id+',"'+notes+'",false)');
    standard_reply(result,socket);
    return;
}

var append_game_notes = async function(id,notes,socket){
    var result = await global.process_sql_call('CALL collection_append_notes('+id+',"'+notes+'",false)');
    standard_reply(result,socket);
    return;
}


//Scaffolding
var edit_game_scaffolding = async function (id, state, socket){
    var result = await global.process_sql_call('CALL collection_edit_scaffold('+id+','+state+',false)');
    standard_reply(result,socket);
    return;
}


//################TESTATO FINO QUI#######################

//BGGID
//Ok
var reallyset_bggid=async function(id,socket,bggid,mode,query){
    console.log(query);
    var row;
    try{
        await global.pool.query(query);
    }catch(err){
        console.log(err);
        socket.emit('c_err',"Unkonwn Error");
        return;
    }
    var result = await global.process_sql_call("CALL collection_assign_bggid("+id+" , "+bggid+" , "+mode+",false)");
    standard_reply(result,socket);
    return;
}

//Ok
var set_bggid =function (id,socket,bggid,mode){
        var exec= require('child_process').exec;
        exec('bggextract '+bggid, (err, stdout, stderr) => {
            reallyset_bggid(id,socket,bggid,mode,stdout);
        });
}

//ok
var bgg_assign =async  function (id,game,socket){
    var result = await global.process_sql_call("CALL collection_assign_bggid("+id+" ,1,1,true)");
     if(result==null){
         socket.emit('c_err',"Unkonwn Error");
        return;
    }
    if(result.Result <0 ) {
        socket.emit('c_err',result.Errmsg);
        return;
    }
    var exec= require('child_process').exec;
    exec('searchbgg "'+game+'"', (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            socket.emit('c_err',"Unkonwn Error");
            return;
        }
        var lines=stdout.split('\n');
        var tokens = [];
        for(let i=0;i<lines.length-1;i++){
            tokens[i]=lines[i].split('###');
        }
        var count=tokens.length;
        if(count==0){
            socket.emit("bgglink_step3");
        }
        else if(count==1){
            set_bggid(id,socket,tokens[0][0],1);
        }
        else{
            var html_opts="";
            for(let i=0;i<count;i++){
                html_opts+="<option value=\""+tokens[i][0]+"\">["+tokens[i][0]+"] "+tokens[i][1]+" ("+tokens[i][2]+")</option>\n";
            }
            socket.emit("bgglink_step2",html_opts);
        }
    });
}

var bgglink_stp4_test = async function (id,game,socket){
    var result=await global.process_sql_call("CALL collection_test_nonbgg_data("+id+",'"+game+"')");
    if(result == null){
        socket.emit('c_err',"Unkonwn Error");
        return;
    }
    var rv = result.Result;
    var ok = result.id_Found;
    if(rv<0){
        socket.emit('c_err',result.Errmsg);
    }
    else if(ok==0){
        socket.emit('bgglink_step4');
    }
    else{
        socket.emit('refresh');
    }
}

var bgglink_stp4_ok = async function (id,game,pl,age,dur,year,pic,link,socket){
    var result = await global.process_sql_call("CALL collection_set_nonbgg_data("+id+" , '"+game+"' , '"+pl+"' , '"+age+"' , '"+dur+"' , "+year+" , '"+pic+"' , '"+link+"')");
    standard_reply(result,socket);
    return;
}




//document slot set
var sdaf_request = async function (eid,count,socket){
    var result = await global.process_sql_call("CALL event_set_document_slots("+eid+","+count+",false)");
    standard_reply(result,socket);
    return;
}

//################CORRETTO FINO QUI#######################

//Event loan manage
var test_loanable = async function (g_id,target_status,socket){
    var row;
    try{
        [row] = await global.pool.query("SELECT col_AVAILABILITY,col_DocumentName FROM BGM_Collection WHERE col_ID="+g_id);
    }catch(err){
        console.log(err);
        socket.emit('c_err',"Unkonwn Error");
        return;
    }
    console.log(row);
    var av=row[0].col_AVAILABILITY;
    if(av==null){
        socket.emit('c_err',"Operazione non disponibile");
        return;
    }
    if(av==target_status){
        socket.emit('c_ref',"Operazione non disponibile");
        return;
    }
    if(target_status==1){
        socket.emit('stop_loan',row[0].col_DocumentName);
    }
    else{
        socket.emit('start_loan');
    }
}

var start_loan_request =async function (g_id,g_docname,socket){
    var result = await global.process_sql_call("CALL collection_start_loan("+g_id+",'"+g_docname+"',false)");
    if(result == null){
        socket.emit('c_err',"Unkonwn Error");
        return;
    }
    if(result.Result <0){
        socket.emit('c_err',result.Errmsg);
        return;
    }
    socket.emit('doc_put',result.slotin);
}

var stop_loan_request =async function (g_id,socket){
    var result = await global.process_sql_call("CALL collection_stop_loan("+g_id+",false)");
    if(result == null){
        socket.emit('c_err',"Unkonwn Error");
        return;
    }
    if(result.Result <0){
        socket.emit('c_err',result.Errmsg);
        return;
    }
    socket.emit('doc_get',result.slotout,result.docname);
}

//Association visibility
var assoc_visib_req = async function (aid,vis,socket){
    var result = await global.process_sql_call("CALL association_set_visible ("+aid+","+vis+",false)");
    if(result == null){
        socket.emit('c_ref',"Unkonwn Error");
        return;
    }
    if(result.Result <0){
        socket.emit('c_ref',result.Errmsg);
        return;
    }
}

var event_visib_req = async function (eid,vis,socket){
    var result = await global.process_sql_call("CALL event_set_visible ("+eid+","+vis+",false)");
    if(result == null){
        socket.emit('c_ref',"Unkonwn Error");
        return;
    }
    if(result.Result <0){
        socket.emit('c_ref',result.Errmsg);
        return;
    }
}


    global.io.sockets.on('connection', function (socket) {// WebSocket Connection
        console.log("creating socket");

//Assignation/Removal to EVENT
        socket.on("evlist",() =>{
            console.log('received evlist');
            get_evlist(socket);
        });

        socket.on("event_to",(g_id,ev_id) =>{
            console.log('received event_to('+g_id+','+ev_id+')');
            send_game_to_event(g_id,ev_id,socket);
        });

        socket.on("unevent",(g_id,forced) =>{
            console.log('received unevent('+g_id+','+forced+')');
            recover_game_from_event(g_id,forced,socket);
        });

//Opening/closing LOAN
        socket.on("loanlist",(_id)=>{
            console.log('received loanlist('+_id+')');
            get_loanlist(_id,socket);
        });

        socket.on("foster_to",(g_id,f_id)=> {
            console.log('received foster_to('+g_id+','+f_id+')');
            send_game_to_foster(g_id,f_id,socket);
        });

        socket.on("unfoster",(g_id) =>{
            console.log('received unfoster('+g_id+')');
            recover_game_from_foster(g_id,socket);
        });

//Game addition
        socket.on("add_game",(g_title,ow_id) => {
            console.log('received add_game('+g_title+','+ow_id+')');
            add_game(g_title,ow_id,socket);
        });

//<!--Adding User To Privilege-->
        socket.on("add_user",(to_id) =>{
            console.log('received add_user('+to_id+')');
            recover_unauthorized_users(to_id,socket);
        });

        socket.on("add_user_request",(user_id,target_id,level) =>{
            console.log('received add_user_request('+user_id+','+target_id+','+level+')');
            set_user_privileges(user_id,target_id,level,socket);
        });

//<!-- Editing Assoc Information-->
        socket.on("eaif_show",(aid)=>{
            console.log('received eaif_show('+aid+')');
            recover_assoc_info(aid,socket);
        });

        socket.on("eaif_request",(aid,phone,mail,site)=>{
            console.log('received eaif_show('+aid+','+phone+','+mail+','+site+')');
            set_assoc_info(aid,phone,mail,site,socket);
        });

//<!--Notes Editing-->
        socket.on("get_game_notes",(id)=>{
            console.log('received get_game_notes('+id+')');
            get_game_notes(id,socket);
        });

        socket.on("set_game_notes",(id,notes)=>{
            console.log('received set_game_notes('+id+')');
            set_game_notes(id,notes,socket);
        });

        socket.on("add_game_notes",(id,notes)=>{
            console.log('received add_game_notes('+id+')');
            append_game_notes(id,notes,socket);
        });

//Scaffolding
        socket.on("edit_game_scaffolding",(id,state) =>{
            console.log('received edit_game_scaffolding('+id+','+state+')');
            edit_game_scaffolding(id,state,socket);
        });

//BGGID
        socket.on("bgg_assign", (id,game) =>{
            console.log('received bgg_assign('+id+','+game+')');
            bgg_assign(id,game,socket);
        });

        socket.on("bgglink_stp2_ok",(id,bggid) =>{
             console.log('received bgglink_stp2_ok('+id+','+bggid+')');
             set_bggid(id,socket,bggid,2);
        });

        socket.on("bgglink_stp3_ok",(id,bggid) =>{
            console.log('received bgglink_stp3_ok('+id+','+bggid+')');
            set_bggid(id,socket,bggid,3);
        });

        socket.on("bgglink_stp4_test",(id,game) =>{
             console.log('received bgglink_stp4_test('+id+',"'+game+'")');
             bgglink_stp4_test(id,game,socket);
        });

        socket.on("bgglink_stp4_ok", (id,game,pl,age,dur,year,pic,link) =>{
            console.log("received bgglink_stp4_ok ("+id+" , '"+game+"' , '"+pl+"' , '"+age+"' , '"+dur+"' , "+year+" , '"+pic+"' , '"+link+"')");
            bgglink_stp4_ok(id,game,pl,age,dur,year,pic,link,socket);
        });

//DocumentSlot SET
        socket.on("sdaf_request",(eid,count) =>{
             console.log('received sdaf_request('+eid+','+count+')');
             sdaf_request(eid,count,socket);
        });

//Event loan manage
        socket.on("start_loan",(gid)=>{
             console.log('received start_loan('+gid+')');
             test_loanable(gid,0,socket);
        });

        socket.on("start_loan_request",(gid,gdoc)=>{
             console.log('received start_loan_request('+gid+','+gdoc+')');
             start_loan_request(gid,gdoc,socket);
        });

        socket.on("stop_loan",(gid)=>{
             console.log('received stop_loan('+gid+')');
             test_loanable(gid,1,socket);
        });

        socket.on("stop_loan_request",(gid)=>{
             console.log('received stop_loan_request('+gid+')');
             stop_loan_request(gid,socket);
        });

        //Association visibility
        socket.on("assoc_visib_req",(aid,vis) =>{
             console.log('received assoc_visib_req('+aid+')');
             assoc_visib_req(aid,vis,socket);
        });

        //Event visibility
        socket.on("event_visib_req",(eid,vis) =>{
             console.log('received event_visib_req('+eid+')');
             event_visib_req(eid,vis,socket);
        });


     });


*/
