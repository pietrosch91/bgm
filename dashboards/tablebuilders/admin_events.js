
var current_user="";

var table_html="";
//Basic View Table

async function create_admin_subtable(eid){
    var html_temp='<table style="borders:none">';
    var result=await global.process_sql_call("CALL access_get_admins("+eid+")",null,1);
    var nadmins=result.length;
    if(nadmins>3) return "ERROR";
    for(let i=0;i<nadmins;i++){
        html_temp+='<tr style="borders:none"><td style="borders:none">'+result[i]._name+'</td><td style="borders:none"><button onclick="remove_admin('+result[i]._id+','+eid+')">Rimuovi</button></td></tr>';
    }
    if(nadmins<3){
        html_temp+='<tr style="borders:none"><td style="borders:none" colspan="2"><button onclick="add_admin('+eid+')">Aggiungi</button></td></tr>';
    }
    html_temp+="</table>";
    return html_temp;
}

async function create_line(data_in){
    // console.log("in create_basic_line");
    var id=data_in.ev_ID;
    var name=data_in.ev_Name;
    var ena=data_in.ev_Enabled;

    var html_table_temp="";

    if(ena != 0){
        html_table_temp+='<tr style="background-color:#AFA">'
    }
    else{
        html_table_temp+='<tr style="background-color:#FAA">'
    }
    html_table_temp+='<td>'+id+'</td><td>'+name+'</td>';

    if(ena){
        html_table_temp+='<td><button onclick="set_event_enabled('+id+',0)">Disattiva</button></td>';
    }
    else{
        html_table_temp+='<td><button onclick="set_event_enabled('+id+',1)">Attiva</button></td>';
    }
    var adm_table=await create_admin_subtable (id);

    html_table_temp+='<td>'+adm_table+'</td>';
        // <button onclick="ass_view_admins('+id+')">Lista</button>\
        // <button onclick="ass_add_admins('+id+')">Aggiungi</button>\
        // <button onclick="ass_del_admins('+id+')">Rimuovi</button>\
        // </td>';
    html_table_temp+='<td><button onclick="delete_event('+id+')">Elimina Evento</button></td>';
    html_table_temp+="</tr>";
    return html_table_temp;
}


async function create_tablecontent(sql_result,wrapname){
    // console.log("in create_basic_tablecontent");
    // console.log(sql_result);
    var html_table_out="";
//
    // console.log(result);
    html_table_out='<thead><tr>'
    html_table_out+='<th width=\"5%\">ID</th>';
    // html_table_out+='<th width=\"5%\">Cod.</th>';
    html_table_out+='<th width=\"20%\" \">Nome</th>';
    html_table_out+='<th width=\"20%\" >Stato</th>';
    html_table_out+='<th width=\"30%\" >Amministratori</th>';
    html_table_out+='<th width=\"20%\" ></th>';
    html_table_out+='</tr></thead>';
    html_table_out+='<tbody>\n';

    if(sql_result!=null){
        for(let i=0;i<sql_result.length;i++){
            var line=await create_line(sql_result[i]);
            html_table_out+=line+"\n";
        }
    }

    //Last line
    html_table_out+='<tr><td/><td><button onclick="create_event()">Aggiungi Evento</button></td><td/><td/><td/></tr>';

    if(wrapname != null) html_table_out='<table id="'+wrapname+'">\n'+html_table_out+'</table>\n';
    // console.log(html_table_out);
    return html_table_out;
}

var build_table= async function (wrapname){
    var result = await global.process_sql_call("CALL event_get_view_admin()",null,1);
    if(result == null) return "";
    var table=await(create_tablecontent(result,wrapname));
    return table;
}

module.exports.build_table = build_table;




