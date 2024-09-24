
var current_assoc="";
var current_assoc_ID=0;

var table_html="";

var access_2_text = function (level){
    if(level==0) return "Non Abilitato";
    if(level==10) return "Visualizzatore";
    if(level==20) return "Membro";
    if(level==30) return "Amministratore";
    return "??";
}

var access_2_text_pl = function (level){
    if(level==0) return "Non Abilitati";
    if(level==10) return "Visualizzatori";
    if(level==20) return "Membri";
    if(level==30) return "Amministratori";
    return "??";
}


var create_leveltable= function(sql_qres,level,add){
    if(sql_qres.length==0) return "";
    var result="";
    if(!add) result+='<tr><td colspan="2" width="95%" style="border:none;background-color:#BBB"><b>'+access_2_text_pl(level)+'</b></td><td style="border:none;background-color:#BBB" width="5%"></td></tr>\n';
    else result+='<tr><td colspan="2" width="95%" style="border:none;background-color:#BBB"><b>'+access_2_text_pl(level)+'</b></td><td style="border:none;background-color:#BBB" width="5%"><button onclick="add_user('+level+',\''+access_2_text(level)+'\')">+</button></td></tr>\n';
    for(let i=0;i<sql_qres.length;i++){
        var acc=sql_qres[i].usr_Access;
        if(acc!=level) continue;
        var name=sql_qres[i].usr_Name;
        var id=sql_qres[i].usr_ID;
        if(add){
            result+='<tr><td style="border:none" width="50%">'+name+'</td><td style="border:none" colspan="2" width="50%"><button onclick="edit_access('+id+','+level+',\''+name+'\')">Cambia Permessi</button></td></tr>\n';
        }
        else{
            result+='<tr><td style="border:none" width="50%">'+name+'</td><td style="border:none" colspan="2" width="50%"></td></tr>\n';
        }
    }
    return result;
}

function create_tablecontent(sql_result,wrapname){
    // console.log("in create_basic_tablecontent");
    // console.log(sql_result);
    var html_table_out="";

    // console.log(result);
    // html_table_out='<thead><tr>'
    // html_table_out+='<th width=\"10%\">INV</th>';
    // html_table_out+='<th width=\"30%\" \">Titolo</th>';
    // html_table_out+='<th width=\"15%\" >Prestato A</th>';
    // html_table_out+='<th width=\"15%\" >Prestato Da</th>';
    // html_table_out+='<th width=\"20%\" >Evento</th>';
    // if(!viewonly) html_table_out+='<th width=\"5%\" \">Note</th>';
    // html_table_out+='</tr></thead>';
    html_table_out+='<tbody>\n';

    if(sql_result!=null){
        html_table_out+=create_leveltable(sql_result,30,false);
        html_table_out+=create_leveltable(sql_result,20,true);
        html_table_out+=create_leveltable(sql_result,10,true);
    }

    if(wrapname != null) html_table_out='<table id="'+wrapname+'">\n'+html_table_out+'</table>\n';
    // console.log(html_table_out);
    return html_table_out;
}

var build_table= async function (wrapname,reqdata){
    current_assoc=reqdata.assoc_name;
    current_assoc_ID=reqdata.assoc_id;
    var result = await global.process_sql_call("CALL access_get_abilitated_users('"+current_assoc_ID+"')",null,1);
    if(result == null) return "";
    return create_tablecontent(result,wrapname);
}

module.exports.build_table = build_table;
