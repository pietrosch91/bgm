



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

    var tbuilder=require(global.rootfolder+'/dashboards/tablebuilders/owner_games.js');
    var table=await tbuilder.build_table("event_games",reqdata,"user_get_view_to_events",false,false,false);
    // console.log("Table = "+table);
    htmlbody=htmlbody.replace("<!--EVENT_GAMES-->",table);

    table=await tbuilder.build_table("event_games",reqdata,"user_get_view_foster_from",false,false,false);
    // console.log("Table = "+table);
    htmlbody=htmlbody.replace("<!--FOSTER_FROM_GAMES-->",table);

    table=await tbuilder.build_table("event_games",reqdata,"user_get_view_foster_to",false,false,false);
    // console.log("Table = "+table);
    htmlbody=htmlbody.replace("<!--FOSTER_TO_GAMES-->",table);

    htmlbody=htmlbody.replaceAll("<!--USR-->",reqdata.user_name);
    return htmlbody;
}








module.exports.specbody = specbody;
