
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

var usr_ena =async function(uid,status,socket){
      var result=await global.process_sql_call("CALL user_set_enabled("+uid+","+status+",false)",null);
      standard_reply(result,socket);
      return;
}

var rst_pwd=async function(uid,socket){
     var result=await global.process_sql_call("CALL user_set_password("+uid+",'',false)",null);
     standard_reply(result,socket);
     return;
}

var del_user=async function(uid,socket){
     var result=await global.process_sql_call("CALL user_delete("+uid+",false)",null);
     standard_reply(result,socket);
     return;
}

//user create
var nup_request= async function(uname,ucode,socket){
    var result=await global.process_sql_call("CALL user_add('"+uname+"','"+ucode+"',false)",null);
    standard_reply(result,socket);
    return;
}

//ass_ena
var assoc_ena = async function(aid,status,socket){
     var result=await global.process_sql_call("CALL association_set_enabled("+aid+","+status+",false)",null);
      standard_reply(result,socket);
      return;
}

//ass delete
var del_assoc=async function(aid,socket){
     var result=await global.process_sql_call("CALL association_delete("+aid+",false)",null);
     standard_reply(result,socket);
     return;
}

//assoc create
var nap_request= async function(aname,acode,socket){
    var result=await global.process_sql_call("CALL association_add('"+aname+"','"+acode+"',false)",null);
    standard_reply(result,socket);
    return;
}

var remove_admin = async function(uid,aid,socket){
     var result=await global.process_sql_call("CALL access_remove_admin("+uid+","+aid+",false)",null);
    standard_reply(result,socket);
    return;
}

//<!--Adding User To Privilege-->
var recover_non_admin_users = async function(to_id,socket){
    var users=await global.process_sql_call("CALL access_get_abilitated_users('"+to_id+"')",null,1);
    var html_opts="";
    var count=users.length;
    for(let i=0;i<count;i++){
        if(users[i].usr_Access==30) continue;
        html_opts+="<option value=\""+users[i].usr_ID+"\">"+users[i].usr_Name+"</option>\n";
    }
    socket.emit("add_admin",html_opts);
    return;
}

var add_admin = async function(user_id,target_id,socket){
    var result = await global.process_sql_call('CALL user_set_privileges('+user_id+','+target_id+',30,false)');
    standard_reply(result,socket);
    return;
}


//event_ena
var event_ena = async function(eid,status,socket){
     var result=await global.process_sql_call("CALL event_set_enabled("+eid+","+status+",false)",null);
      standard_reply(result,socket);
      return;
}


//event delete
var del_event=async function(eid,socket){
     var result=await global.process_sql_call("CALL event_delete("+eid+",false)",null);
     standard_reply(result,socket);
     return;
}

//event create
var nep_request= async function(name,socket){
    var result=await global.process_sql_call("CALL event_add('"+name+"',false)",null);
    standard_reply(result,socket);
    return;
}




    global.io.sockets.on('connection', function (socket) {// WebSocket Connection
        console.log("creating socket");

//User enable/disable
        socket.on("usr_ena",(uid,status) =>{
            console.log('received usr_ena ('+uid+','+status+')');
            usr_ena(uid,status,socket);
        });

        socket.on("rst_pwd",(uid) =>{
            console.log('received rst_pwd ('+uid+')');
            rst_pwd(uid,socket);
        });

        socket.on("del_user",(uid) =>{
            console.log('received del_user ('+uid+')');
            del_user(uid,socket);
        });

        socket.on("nup_request",(uname,ucode) =>{
            console.log('received nup_request ('+uname+','+ucode+')');
            nup_request(uname,ucode,socket);
        });

//Association
        socket.on("assoc_ena",(aid,status)=>{
             console.log('received assoc_ena ('+aid+','+status+')');
            assoc_ena(aid,status,socket);
        });

          socket.on("del_assoc",(aid) =>{
            console.log('received del_assoc('+aid+')');
            del_assoc(aid,socket);
        });

           socket.on("nap_request",(aname,acode) =>{
            console.log('received nap_request ('+aname+','+acode+')');
            nap_request(aname,acode,socket);
        });

//admin management
        socket.on("remove_admin",(uid,aid)=>{
             console.log('received remove_admin ('+uid+','+aid+')');
             remove_admin(uid,aid,socket);
        });

        socket.on("add_admin",(aid)=>{
             console.log('received add_admin ('+aid+')');
             recover_non_admin_users(aid,socket);
        });

        socket.on("add_user_request",(user_id,target_id)=>{
             console.log('received add_user_request ('+user_id+')');
             add_admin(user_id,target_id,socket);
        });

    //event
        socket.on("event_ena",(eid,status)=>{
             console.log('received event_ena ('+eid+','+status+')');
            event_ena(eid,status,socket);
        });

        socket.on("del_event",(eid) =>{
            console.log('received del_event('+eid+')');
            del_event(eid,socket);
        });

        socket.on("nep_request",(name,) =>{
            console.log('received nep_request ('+name+')');
            nep_request(name,socket);
        });

     });






