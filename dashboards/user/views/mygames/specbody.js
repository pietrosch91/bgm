



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
    var table=await tbuilder.build_table("my",reqdata,"user_get_view_mine",true,true,false);
    // console.log("Table = "+table);
    htmlbody=htmlbody.replace("<!--MY_GAMES-->",table);
    htmlbody=htmlbody.replace("<!--USR-->",reqdata.user_name);
    return htmlbody;
}








module.exports.specbody = specbody;
