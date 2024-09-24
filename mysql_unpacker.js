var fs = require('fs');

var get_sql_path = function (proc_name){
   return get_sql_folder(proc_name)+proc_name+".sql";
}

var get_sql_folder = function (proc_name){
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
    return path;
}


var read_source = function(filename){
    var result;
    try {
        console.log("File : "+filename);
        const data = fs.readFileSync(filename);
        // console.log(data);
        result=data.toString().split("\n");
        return result;
    } catch (err) {
        console.error(err);
        return null;
    }
}

var linestartswith= function (line,init){
    var tok=line.split(" ")[0];
    console.log("Line starts with "+tok);
    if(tok===init) return true;
    return false;
}

var getname = function (line){
    console.log(line);
    console.log(line.split(" "));
    var tok=line.split(" ")[2];
    console.log(tok.split("`"));
    var name=tok.split("`")[1];
    console.log("PROC/FUNC name is"+name);
    return name;
}

var process_source = function(filename){
    var funcopen=false;
    var lines=read_source(filename);
    var funcname;
    var proclines=[];
    for(let i=0;i<lines.length;i++){
        if(linestartswith(lines[i],"CREATE")){
            funcopen=true;
            proclines=[];
            funcname=getname(lines[i]);
        }
        else if(linestartswith(lines[i],"END$$")){
            if(funcopen){
                funcopen=false;
                proclines.push("END;");
                process_procedure(funcname,proclines);
            }
        }
        if(funcopen){
            proclines.push(lines[i]);
        }
    }
}

function process_procedure(f_name,f_body){
    console.log("Creating function "+f_name);
    console.log("Saving into "+get_sql_path(f_name));
    console.log("Function body = ");
    console.log(f_body);

    fs.mkdirSync(get_sql_folder(f_name), { recursive: true });

    var data = "";
    for(let i=0;i<f_body.length;i++) data+=f_body[i]+"\n";
    // Write data in 'Output.txt' .
    fs.writeFile(get_sql_path(f_name), data, (err) => {
        // In case of a error throw err.
        if (err) console.log(err);
    });

}

process_source("./mysql_scripts/BGM_Access.sql");
process_source("./mysql_scripts/BGM_Assoc.sql");
process_source("./mysql_scripts/BGM_Collection.sql");
process_source("./mysql_scripts/BGM_Events.sql");
process_source("./mysql_scripts/BGM_Ludo.sql");
process_source("./mysql_scripts/BGM_Owners.sql");
process_source("./mysql_scripts/BGM_Slots.sql");
process_source("./mysql_scripts/BGM_Users.sql");
