



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

    var tbuilder=require(global.rootfolder+'/dashboards/tablebuilders/assoc_public_games.js');
    var table=await tbuilder.build_table("all_games",reqdata,false);
    // console.log("Table = "+table);
    htmlbody=htmlbody.replace("<!--ALL_GAMES-->",table);
    htmlbody=htmlbody.replaceAll("<!--ASSOC-->",reqdata.assoc_name);
    return htmlbody;
}








module.exports.specbody = specbody;
