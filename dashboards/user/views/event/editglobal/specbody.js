



var fs = require('fs');


async function specbody(reqdata){
    var htmlbody="";
    try {
        const data = fs.readFileSync(__dirname+'/viewbody.html', 'utf8');
        // console.log(data);
        htmlbody=data.toString();
    } catch (err) {
        console.error(err);
        return "";
    }

     var txt='\
    <table>\n\
        <tr>\n\
            <td style="width:20%;border:none"><b>Gestione Informazioni</b></td>\n\
            <td style="width:20%;border:none"><button onclick="eeif_show()">Aggiorna Informazioni</button></td>\n\
            <td style="width:20%;border:none"/>\n\
            <td style="width:20%;border:none"/>\n\
            <td style="width:20%;border:none"/>\n\
        </tr>\n\
    </table><br/>\n';

    txt+='\
<table>\n\
    <tr>\n\
        <td style="width:20%;border:none"><b>Gestione Cassetti Documenti</b></td>\n\
        <td style="width:20%;border:none"><button onclick="set_doc_slots()">Imposta numero cassetti</button></td>\n\
        <td style="width:20%;border:none"/>\n\
        <td style="width:20%;border:none"/>\n\
        <td style="width:20%;border:none"/>\n\
    </tr>\n\
</table><br/>\n';

    var result=await global.process_sql_call("CALL event_get_visible("+reqdata.event_id+")");
    var visible="checked";
    if(result == null){
        visible = "";
    }
    else if(result.Result==null){
        visible = "";
    }
    else if(result.Result==0){
        visible = "";
    }

    txt+='<table>\n\
        <tr>\n\
            <td style="width:20%;border:none"><b>Visibilità Pubblica</b></td>\n\
            <td style="width:20%;border:none"><input id="ev_visib" '+visible+' type="checkbox" onchange="event_change_visibility()"/></td>\n\
            <td style="width:20%;border:none"/>\n\
            <td style="width:20%;border:none">Percorso sito:</td>\n\
            <td style="width:20%;border:none"><button onclick="set_dlink('+reqdata.event_id+')">Imposta</button></td>\n\
        </tr>\n\
    </table><br/>\n';

    result=await global.process_sql_call("CALL event_get_lock("+reqdata.event_id+")");
    var lock="checked";
    if(result == null){
        lock = "";
    }
    else if(result.Result==null){
        lock = "";
    }
    else if(result.Result==0){
        lock = "";
    }

    txt+='<table>\n\
        <tr>\n\
            <td style="width:20%;border:none"><b>Blocca Trasferimento Giochi</b></td>\n\
            <td style="width:20%;border:none"><input id="ev_lock" '+lock+' type="checkbox" onchange="event_change_lock()"/></td>\n\
            <td style="width:20%;border:none"/>\n\
            <td style="width:20%;border:none"/>\n\
            <td style="width:20%;border:none"/>\n\
        </tr>\n\
    </table><br/>\n';


     txt+='<table>\n\
        <tr>\n\
            <td style="width:20%;border:none"><b>Gestione Ludoteca</b></td>\n\
            <td style="width:20%;border:none"><button onclick="request_confirmation(\'reset_loans\')">Resetta tutti i prestiti</button></td>\n\
            <td style="width:20%;border:none"><button onclick="request_confirmation(\'reset_ludo\')">Rigenera Ludoteca</button></td>\n\
            <td style="width:20%;border:none"><button onclick="request_confirmation(\'empty_ludo\')">Svuota Ludoteca</button></td>\n\
            <td style="width:20%;border:none"/>\n\
        </tr>\n\
    </table><br/>\n';


    htmlbody=htmlbody.replaceAll("<!--EVENT-->",reqdata.event_name);
    htmlbody=htmlbody.replace("<!--EDIT_BTNS-->",txt);

    return htmlbody;
}








module.exports.specbody = specbody;
