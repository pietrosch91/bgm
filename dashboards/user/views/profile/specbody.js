



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
            <td style="width:20%;border:none"><b>Cambia Password</b></td>\n\
            <td style="width:20%;border:none"><button onclick="eupw_show()">Cambia</button></td>\n\
            <td style="width:20%;border:none"/>\n\
            <td style="width:20%;border:none"/>\n\
            <td style="width:20%;border:none"/>\n\
        </tr>\n\
    </table><br/>\n';




    htmlbody=htmlbody.replaceAll("<!--USR-->",reqdata.user_name);
    htmlbody=htmlbody.replace("<!--EDIT_BTNS-->",txt);

    return htmlbody;
}








module.exports.specbody = specbody;
