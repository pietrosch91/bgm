var fs = require('fs');

var read_sql_procedure = function (proc_name){

    var pname=proc_name.split("_");
    var pgroup=pname[0];
    var isf=pname[pname.length-1];
    var path=__dirname+"/sql_procedures/"+pgroup+"/";
    if(isf==="f"){
        path+="functions/";
    }
    else{
        path+="procedures/";
    }
    path+=proc_name+".sql";
    var result=[];
    try {
        console.log("File : "+path);
        const data = fs.readFileSync(path);
        // console.log(data);
        result.push(data.toString());
        return result;
    } catch (err) {
        console.error(err);
        return null;
    }
}


var read_sql_table= function (tab_name){
    if(tab_name.endsWith("'")){
        tab_name=tab_name.substr(0,tab_name.length-1);
    }
    var path=__dirname+"/sql_procedures/createtables/"+tab_name+".sql";
    var result="";
    try {
        console.log("File : "+path);
        const data = fs.readFileSync(path);
        // console.log(data);
        result=data.toString();
        return result.split(';');
    } catch (err) {
        console.error(err);
        return null;
    }
}

function sql_prepare_query (sql_proc,...args){
    var query="CALL "+sql_proc+"(";
    var nargs=args.length;
    for(let i=0;i<nargs;i++){
        if(typeof args[i] == 'string'){
            query+="'"+args[i]+"'";
        }else{
            query+=args[i];
        }
        if(i<nargs-1){
            query+=", ";
        }
    }
    query+=")";
    return query;
}

async function sql_load_lines(lines){
    console.log("Lines ="+lines.length);
    try{
        for(let i = 0; i < lines.length; i++) {
            // console.log(lines[i]);
            var result=await global.pool.query(lines[i]);
            console.log(result);
        }
    }catch(err){
        console.log('Error while Adding procedure.'); //any queries that create stored procedures fail
        console.log(err);
        return false;
    }
    console.log('success');
    return true;
}

async function sql_process_error (err){
    console.log("\tinvoking sql_process_error("+err+")");
    var code=err.errno;
    var msg=err.sqlMessage;
    if(code==1305){ //ER_SP_DOES_NOT_EXIST
        var procname=msg.split(" ")[1];
        procname=procname.split(".")[1];
        var procbuilder=read_sql_procedure(procname);
        if(procbuilder==null){ //file non trovato
            console.log("\tFILE Not Found");
            return err;
        }
        //proco a caricare la funzione nel database
        // console.log(procbuilder);
        var build_ok=await sql_load_lines(procbuilder);
        console.log("after sql_load_lines");
        if(!build_ok){
            console.log("\tERROR CREATING Procedure");
            return err;
        }
        return null;
    }
    else if(code==1146){ //ER_NO_SUCH_TABLE
        var tabname=msg.split(" ")[1];
        tabname=tabname.split(".")[1]
        var tabbuilder=read_sql_table(tabname);
        if(tabbuilder==null){ //file non trovato
            console.log("\tFILE Not Found");
            return err;
        }
         //proco a caricare la funzione nel database
        // console.log(procbuilder);
        var build_ok=await sql_load_lines(tabbuilder);
        console.log("after sql_load_lines");
        if(!build_ok){
            console.log("\tERROR CREATING Table");
            return err;
        }
        return null;
    }
    return err;
}



global.sql_process_build =async function(sql_proc,...args){
    console.log("invoking sql_process_build");
    var query=sql_prepare_query(sql_proc,...args);
    var result=await sql_process_call(query);
    return result;
}

global.sql_loader_call = async function(query){
    console.log("invoking sql_process_call("+query+")");
    var error=null;
    var result=[];
    while(true){
        console.log("Trying query again");
        try{
            [result] = await global.pool.query(query);
            console.log(result);
            return result;
        }catch(err){
            console.log(err);
            //verifico se risolvibile
            error=await sql_process_error(err);
            console.log(error);
            if(error!=null){
                return null;
            }
            continue;
        }
    }
}
