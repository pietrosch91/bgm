
var current_user="";

var table_html="";

//Generic
function parse_line(line_in){
    var line_out=line_in;
    line_out.mio = (line_in.owner === current_user);
    line_out.prestato_a = (line_in.foster != null ) & line_out.mio;
    line_out.prestato_da = (line_in.foster != null ) & !line_out.mio;
    line_out.prestato_ev =(line_in.event !=null);




    return line_out;
}

//Basic View Table


function create_line(data_in,use_bgg,viewonly){
    // console.log("in create_basic_line");
    var p_data=parse_line(data_in);
    // console.log(p_data);
    var inv=p_data.inv;
    var id=p_data.ID;
    var html_table_temp="";
    html_table_temp+='<tr id="row_'+id+'"><td id="inv_'+id+'">'+inv+'</td>';
    html_table_temp+='<td id="title_'+id+'">'+p_data.title+'</td>';
    var foster=p_data.foster;
    var owner=p_data.owner;
    var _event=p_data.event;
    var bggid=p_data.bggid;
    if(use_bgg){
        if(p_data.mio){
            if(bggid!=null){
                html_table_temp+='<td><button onclick="update_bggid('+id+')">BGGID : '+bggid+'</button></td>';
            }
            else{
                html_table_temp+='<td><button onclick="search_bggid('+id+')">Assegna BGGID</button></td>';
            }
        }
        else{
            html_table_temp+='<td/>';
        }
    }


    if(p_data.mio){
        if(viewonly){
            if(p_data.prestato_a){
                html_table_temp+='<td>'+foster+'</td>';
            }
            else{
                html_table_temp+='<td></td>';
            }
        }
        else{
            if(p_data.prestato_a){
                html_table_temp+='<td><button id="fosterbtn_'+id+'" onclick="foster_unassign('+id+')">'+foster+'</button></td>';
            }
            else{
                html_table_temp+='<td><button id="fosterbtn_'+id+'" onclick="foster_assign('+id+')">Avvia Prestito</button></td>';
            }
        }
    }
    else{
        if(p_data.prestato_da){
            html_table_temp+='<td>'+current_user+'</td>';
        }
        else{
            html_table_temp+='<td></td>';
        }
    }



    if(p_data.prestato_da){
        html_table_temp+='<td>'+owner+'</td>';
    }
    else{
        html_table_temp+='<td></td>';
    }
    if(viewonly){
        if(p_data.prestato_ev){
            html_table_temp+='<td>'+_event+'</td>';
        }
        else{
            html_table_temp+='<td></td>';
        }
    }else{
        if(p_data.prestato_ev){
            html_table_temp+='<td><button id="evtbtn_'+id+'" onclick="evt_remove('+id+',0)">'+_event+'</button></td>';
        }
        else{
            html_table_temp+='<td><button id="evtbtn_'+id+'" onclick="evt_assign('+id+')">Assegna ad Evento</button></td>';
        }
    }
    if(!viewonly){
        if(p_data.mio){
            html_table_temp+='<td><button id="notebtn_'+id+'" onclick="note_edit('+id+')">Vedi Note</button></td>';
        }
        else{
            html_table_temp+='<td><button id="notebtn_'+id+'" onclick="note_add('+id+')">Vedi Note</button></td>';
        }
    }
    html_table_temp+="</tr>";
    return html_table_temp;
}

function create_tablecontent(sql_result,wrapname,addlast,use_bgg,viewonly){
    // console.log("in create_basic_tablecontent");
    // console.log(sql_result);
    var html_table_out="";

    // console.log(result);
    html_table_out='<thead><tr>'
    html_table_out+='<th width=\"10%\">INV</th>';
    html_table_out+='<th width=\"30%\" \">Titolo</th>';
    if(use_bgg) html_table_out+='<th width=\"10%\" >BGGID</th>';
    html_table_out+='<th width=\"15%\" >Prestato A</th>';
    html_table_out+='<th width=\"15%\" >Prestato Da</th>';
    html_table_out+='<th width=\"20%\" >Evento</th>';
    if(!viewonly) html_table_out+='<th width=\"5%\" \">Note</th>';
    html_table_out+='</tr></thead>';
    html_table_out+='<tbody>\n';

    if(sql_result!=null){
        for(let i=0;i<sql_result.length;i++){
            html_table_out+=create_line(sql_result[i],use_bgg,viewonly)+"\n";
        }
    }

    //Last line
    if(addlast) html_table_out+='<tr><td/><td><button onclick="add_game()">Aggiungi Gioco</button></td><td/><td/><td/><td/></tr>';


    if(wrapname != null) html_table_out='<table id="'+wrapname+'">\n'+html_table_out+'</table>\n';
    // console.log(html_table_out);
    return html_table_out;
}

var build_table= async function (wrapname,reqdata,sql_func,addlast,use_bgg,viewonly){
    current_user=reqdata.user_name;
    var result = await global.process_sql_call("CALL "+sql_func+"("+reqdata.user_id+")",null,1);
    if(result == null) return "";
    return create_tablecontent(result,wrapname,addlast,use_bgg,viewonly);
}

module.exports.build_table = build_table;




