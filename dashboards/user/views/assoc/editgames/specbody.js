



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

    var tbuilder=require(global.rootfolder+'/dashboards/tablebuilders/assoc_games.js');
    var table=await tbuilder.build_table("my_games",reqdata,"association_get_view_mine",true,true,false);
    // console.log("Table = "+table);
    htmlbody=htmlbody.replace("<!--MY_GAMES-->",table);
    htmlbody=htmlbody.replaceAll("<!--ASSOC-->",reqdata.assoc_name);
    return htmlbody;
}








module.exports.specbody = specbody;
