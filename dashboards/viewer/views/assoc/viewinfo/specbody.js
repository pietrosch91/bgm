



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

    var row;
    try{
        row = await global.process_sql_call("CALL association_get_info("+reqdata.assoc_id+")");
    }catch(err){
        console.log(err);
        return "";
    }
    var txt="";
    txt+="<h3>Contatti </h3><br/>";
    txt+="<b>Telefono :</b> "+row._Phone+"<br/>";
    txt+="<b>Mail :</b> "+row._Mail+"<br/>";
    txt+="<b>Homepage :</b> <a target=\"blank\" href=\""+row._Site+"\"> Vai alla Homepage</a><br/>";

    htmlbody=htmlbody.replace("<!--MY_INFO-->",txt);
    htmlbody=htmlbody.replaceAll("<!--ASSOC-->",reqdata.assoc_name);
    return htmlbody;
}








module.exports.specbody = specbody;
