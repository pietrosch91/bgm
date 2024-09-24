
var current_event=null;

var table_html="";

//Basic View Table

function create_line(data_in){
    // console.log("in create_basic_line");
    var p_data=data_in;
    // console.log(p_data);
    var shelved=p_data.Shelved;
    var inv=p_data.Inv;
    var id=p_data.ID;
    var owner=p_data.Owner;
    var specowner=p_data.SpecOwner;
    var is_event = (owner == null);
    var bggid=p_data.BGGID;
    var html_table_temp="";
    if(shelved){
        html_table_temp+='<tr id="row_'+id+'" style="background-color:#AFA">';
    }
    else{
        html_table_temp+='<tr id="row_'+id+'" style="background-color:#FAA">';
    }
    html_table_temp+='<td id="inv_'+id+'">'+inv+'</td>';
    html_table_temp+='<td id="title_'+id+'">'+p_data.Title+'</td>';
    if(!is_event){
        html_table_temp+='<td>'+owner+'</td>';
    }
    else{
        html_table_temp+='<td>'+specowner+'</td>';
    }
    if(shelved){
        html_table_temp+='<td><button onclick="shelf('+id+',0)">Rimuovi da Ludoteca</button></td>';
    }
    else{
        html_table_temp+='<td><button onclick="shelf('+id+',1)">Aggiungi a Ludoteca</button></td>';
    }
    if(bggid!=null){
        html_table_temp+='<td><button onclick="update_bggid('+id+')">BGGID : '+bggid+'</button></td>';
    }
    else{
        html_table_temp+='<td><button onclick="search_bggid('+id+')">Assegna BGGID</button></td>';
    }
    html_table_temp+='<td><button id="notebtn_'+id+'" onclick="note_add('+id+')">Vedi Note</button></td>';
    if(!is_event){
        html_table_temp+='<td><button id="rendibtn_'+id+'" onclick="evt_remove('+id+',1)">Rendi</button></td>';
    }
    else{
        html_table_temp+='<td><button id="rendibtn_'+id+'" onclick="game_delete('+id+')">Rendi</button></td>';
    }
    html_table_temp+="</tr>";
    return html_table_temp;
}

function create_tablecontent(sql_result,wrapname){
    // console.log("in create_basic_tablecontent");
    // console.log(sql_result);
    var html_table_out="";

    // console.log(result);
    html_table_out='<thead><tr>'
    html_table_out+='<th width=\"5%\">INV</th>';
    html_table_out+='<th width=\"30%\" \">Titolo</th>';
    html_table_out+='<th width=\"20%\" >Proprietario</th>';
    html_table_out+='<th width=\"10%\" >Scaffale</th>';
    html_table_out+='<th width=\"10%\" >BGGID</th>';
    html_table_out+='<th width=\"5%\" \">Note</th>';
    html_table_out+='<th width=\"10%\" \"></th>';
    html_table_out+='</tr></thead>';
    html_table_out+='<tbody>\n';

    if(sql_result!=null){
        for(let i=0;i<sql_result.length;i++){
            html_table_out+=create_line(sql_result[i])+"\n";
        }
    }

    html_table_out+='<tr>';
    html_table_out+='<td/>';
    html_table_out+='<td><button onclick="add_event_game()">Registra Gioco</button></td>';
    html_table_out+='<td/>';
    html_table_out+='<td/>';
    html_table_out+='<td/>';
    html_table_out+='<td/>';
    html_table_out+='<td/>';
    html_table_out+='</tr>';
    html_table_out+='</tbody>\n';


    if(wrapname != null) html_table_out='<table id="'+wrapname+'">\n'+html_table_out+'</table>\n';
    // console.log(html_table_out);
    return html_table_out;
}

var build_table= async function (wrapname,reqdata){
    current_event=reqdata.event_id;
    var result=await global.process_sql_call("CALL event_get_games_shelfing("+current_event+")",null,1);
    if(result == null) return "";
    return create_tablecontent(result,wrapname);
}


module.exports.build_table = build_table;




