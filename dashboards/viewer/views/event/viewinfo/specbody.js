



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
        row = await global.process_sql_call("CALL event_get_info("+reqdata.event_id+")");
    }catch(err){
        console.log(err);
        return "";
    }
    var txt="";
    txt+="<b>Homepage :</b> <a target=\"blank\" href=\""+row._Link+"\"> Vai alla Homepage</a><br/>";

    htmlbody=htmlbody.replace("<!--MY_INFO-->",txt);
    htmlbody=htmlbody.replaceAll("<!--EVENT-->",reqdata.event_name);
    return htmlbody;
}








module.exports.specbody = specbody;
