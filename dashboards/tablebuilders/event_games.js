
var current_event="";

var table_html="";



//Basic View Table

function create_line(data_in){
    // console.log("in create_basic_line");
    var p_data=data_in
    // console.log(p_data);
    var _av=p_data._availability;
    var html_table_temp="";

    if(_av != 0){
        html_table_temp+='<tr style="background-color:#AFA">'
    }
    else{
        html_table_temp+='<tr style="background-color:#FAA">'
    }
    var _pic=p_data._pic;
    var _link=p_data._link;
    var _bggid=p_data._bggid;
    if(_link==null && _bggid>0){
        _link="https://boardgamegeek.com/boardgame/"+_bggid;
    }
    var _title=p_data._title;
    if(_link==null){
       html_table_temp+='<td><b>'+_title+'</b></td>';
    }
    else{
       html_table_temp+='<td><a href="'+_link+'" target="_blank"><b>'+_title+'</b></a></td>';
    }
    if(_pic ==null){
        html_table_temp+='<td/>';
    }
    else{
        html_table_temp+='<td><img src="'+_pic+'" alt="Missing" height="128" width="256" style="object-fit:contain"></td>';
    }

    html_table_temp+='<td>'+_av+'</td>';
    if(p_data._pl != null){
        html_table_temp+='<td>'+p_data._pl+'</td>';
        html_table_temp+='<td>'+p_data._age+'</td>';
        html_table_temp+='<td>'+p_data._dur+'</td>';
   }
    else{
        html_table_temp+='<td/>';
        html_table_temp+='<td/>';
        html_table_temp+='<td/>';
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
    html_table_out+='<th width=\"35%\">Titolo</th>';
    html_table_out+='<th width=\"15%\">Copertina</th>';
    html_table_out+='<th width=\"10%\">Disponibilità</th>';
    html_table_out+='<th width=\"10%\">Giocatori</th>';
    html_table_out+='<th width=\"10%\" >Età</th>';
    html_table_out+='<th width=\"10%\" >Durata</th>';
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
    var result=await global.process_sql_call("CALL event_get_games_view("+current_event+")",null,1);
    if(result == null) return "";
    return create_tablecontent(result,wrapname);
}

module.exports.build_table = build_table;




