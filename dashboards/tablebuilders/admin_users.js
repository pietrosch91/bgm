
var current_user="";

var table_html="";
//Basic View Table

function create_line(data_in){
    // console.log("in create_basic_line");
    var id=data_in.usr_ID;
    var name=data_in.usr_Name;
    var code=data_in.usr_Code;
    var ena=data_in.usr_Enabled;

    var html_table_temp="";

    if(ena != 0){
        html_table_temp+='<tr style="background-color:#AFA">'
    }
    else{
        html_table_temp+='<tr style="background-color:#FAA">'
    }
    html_table_temp+='<td>'+id+'</td><td>'+code+'</td><td>'+name+'</td>';

    if(ena){
        html_table_temp+='<td><button onclick="set_user_enabled('+id+',0)">Disattiva</button></td>';
    }
    else{
        html_table_temp+='<td><button onclick="set_user_enabled('+id+',1)">Attiva</button></td>';
    }
    html_table_temp+='<td><button onclick="reset_user_pwd('+id+')">Resetta Password</button></td>';
    html_table_temp+='<td><button onclick="delete_user('+id+')">Rimuovi Utente</button></td>';
    html_table_temp+="</tr>";
    return html_table_temp;
}



function create_tablecontent(sql_result,wrapname){
    // console.log("in create_basic_tablecontent");
    // console.log(sql_result);
    var html_table_out="";

    // console.log(result);
    html_table_out='<thead><tr>'
    html_table_out+='<th width=\"6%\">ID</th>';
    html_table_out+='<th width=\"7%\">Cod.</th>';
    html_table_out+='<th width=\"30%\" \">Nome</th>';
    html_table_out+='<th width=\"19%\" >Stato</th>';
    html_table_out+='<th width=\"19%\" ></th>';
    html_table_out+='<th width=\"19%\" ></th>';
    html_table_out+='</tr></thead>';
    html_table_out+='<tbody>\n';

    if(sql_result!=null){
        for(let i=0;i<sql_result.length;i++){
            html_table_out+=create_line(sql_result[i])+"\n";
        }
    }

    //Last line
    html_table_out+='<tr><td/><td><button onclick="create_user()">Aggiungi Utente</button></td><td/><td/><td/></tr>';

    if(wrapname != null) html_table_out='<table id="'+wrapname+'">\n'+html_table_out+'</table>\n';
    // console.log(html_table_out);
    return html_table_out;
}

var build_table= async function (wrapname){
    var result = await global.process_sql_call("CALL user_get_view_admin()",null,1);
    if(result == null) return "";
    return create_tablecontent(result,wrapname);
}

module.exports.build_table = build_table;




