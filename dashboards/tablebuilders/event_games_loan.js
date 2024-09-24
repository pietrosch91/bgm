
var current_event=null;

var table_html="";

//Basic View Table

function create_line(data_in){
    // console.log("in create_basic_line");
    var p_data=data_in;
    // console.log(p_data);
    var available=p_data.Available;
    var inv=p_data.Inv;
    var id=p_data.ID;
    var owner=p_data.Owner;
    var specowner=p_data.SpecOwner;
    var html_table_temp="";
    if(available){
        html_table_temp+='<tr id="row_'+id+'" style="background-color:#AFA">';
    }
    else{
        html_table_temp+='<tr id="row_'+id+'" style="background-color:#FAA">';
    }
    html_table_temp+='<td id="inv_'+id+'">'+inv+'</td>';
    html_table_temp+='<td id="title_'+id+'">'+p_data.Title+'</td>';
    if(owner!=null){
        html_table_temp+='<td>'+owner+'</td>';
    }
    else{
        html_table_temp+='<td>'+specowner+'</td>';
    }
    if(available){
        html_table_temp+='<td style="border:none" width="10%"></td>';
        html_table_temp+='<td style="border:none" width="10%"></td>';
        html_table_temp+='<td style="border:none" width="10%"></td>';
        html_table_temp+='<td style="border:none" width="5%"><button onclick="start_loan('+id+')"> Presta</button></td>';
    }
    else{
        html_table_temp+='<td style="border:none" width="10%">[ '+p_data.RTime+' ]</td>';
        html_table_temp+='<td style="border:none" width="10%"><b>'+p_data.DName+'</b></td>';
        html_table_temp+='<td style="border:none" width="10%">[ Slot '+(p_data.DSlot-100*current_event)+' ]</td>';
        html_table_temp+='<td style="border:none" width="5%"><button onclick="stop_loan('+id+')"> Recupera</button></td>';
    }
    html_table_temp+='<td><button id="notebtn_'+id+'" onclick="note_add('+id+')">Vedi Note</button></td>';
    html_table_temp+="</tr>";
    return html_table_temp;
}

function create_tablecontent(sql_result,wrapname){
    // console.log("in create_basic_tablecontent");
    // console.log(sql_result);
    var html_table_out="";

    // console.log(result);
    html_table_out='<thead><tr>'
    html_table_out+='<th width=\"10%\">INV</th>';
    html_table_out+='<th width=\"30%\" \">Titolo</th>';
    html_table_out+='<th width=\"20%\" >Proprietario</th>';
    html_table_out+='<th colspan="4" width=\"35%\" >Prestito</th>';
    html_table_out+='<th width=\"5%\" \">Note</th>';
    html_table_out+='</tr></thead>';
    html_table_out+='<tbody>\n';

    if(sql_result!=null){
        for(let i=0;i<sql_result.length;i++){
            html_table_out+=create_line(sql_result[i])+"\n";
        }
    }

    if(wrapname != null) html_table_out='<table id="'+wrapname+'">\n'+html_table_out+'</table>\n';
    // console.log(html_table_out);
    return html_table_out;
}

var build_table= async function (wrapname,reqdata){
    current_event=reqdata.event_id;
    var result=await global.process_sql_call("CALL event_get_games_loan("+current_event+")",null,1);
    if(result == null) return "";
    return create_tablecontent(result,wrapname);
}

module.exports.build_table = build_table;




