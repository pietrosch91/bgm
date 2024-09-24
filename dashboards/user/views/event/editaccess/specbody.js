



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

    var tbuilder=require(global.rootfolder+'/dashboards/tablebuilders/event_access.js');
    var table=await tbuilder.build_table("event_access",reqdata);
    // console.log("Table = "+table);
    htmlbody=htmlbody.replace("<!--EVENT_ACCESS-->",table);
    htmlbody=htmlbody.replaceAll("<!--EVENT-->",reqdata.event_name);
    return htmlbody;
}








module.exports.specbody = specbody;
