
var resp_html;
var username;


var html_body_out="";
var html_table_out="";


var fs = require('fs');


var build_generic = function (source){
    var result;
    try {
        const data = fs.readFileSync(source, 'utf8');
        // console.log(data);
        return data.toString();
    } catch (err) {
        // console.error(err);
        return "";
    }
}

var build_body = function(usr){
    username = usr;
    return build_generic(__dirname + '/viewbody.html');
}

var build_scripts = function(){
    return build_generic(__dirname + '/viewscripts.js');
}

var build_forms = function(){
    return build_generic(__dirname + '/viewforms.html');
}

module.exports.body = build_body;
module.exports.scripts = build_scripts;
module.exports.forms = build_forms;
