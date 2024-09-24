



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
            <td style="width:20%;border:none"><button onclick="eaif_show()">Aggiorna Informazioni</button></td>\n\
            <td style="width:20%;border:none"/>\n\
            <td style="width:20%;border:none"/>\n\
            <td style="width:20%;border:none"/>\n\
        </tr>\n\
    </table><br/>\n';

    var result=await global.process_sql_call("CALL association_get_visible("+reqdata.assoc_id+")");
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
            <td style="width:20%;border:none"><input id="ass_visib" '+visible+' type="checkbox" onchange="assoc_change_visibility()"/></td>\n\
            <td style="width:20%;border:none"/>\n\
             <td style="width:20%;border:none">Percorso sito:</td>\n\
            <td style="width:20%;border:none"><button onclick="set_dlink('+reqdata.assoc_id+')">Imposta</button></td>\n\
        </tr>\n\
    </table>\n';


    htmlbody=htmlbody.replaceAll("<!--ASSOC-->",reqdata.assoc_name);
    htmlbody=htmlbody.replace("<!--EDIT_BTNS-->",txt);

    return htmlbody;
}








module.exports.specbody = specbody;
