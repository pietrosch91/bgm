
function login_user (req, res) { //create table
    const chunks = [];
    req.on("data", (chunk) => {
      // console.log("Received Chunk "+chunk);
      chunks.push(chunk);
    });
    resp_html=res;
    req.on("end", async function(){
        // console.log("all parts/chunks have arrived");
        const data = Buffer.concat(chunks);
        // console.log("Data: ", data);
        const stringData=data.toString();
        const parsedData = new URLSearchParams(stringData);
        const dataObj = {};
        for (var pair of parsedData.entries()) {
            dataObj[pair[0]] = pair[1];
        }
        // console.log("DataObj: ", dataObj);
        var myusr=dataObj.usr;
        var mypwd=dataObj.pwd;

        // var row;
        // try{
        //     [row] = await global.pool.query("CALL user_test_login('"+myusr+"','"+mypwd+"')");
        // }catch(err){
        //     console.log(err);
        //     res.redirect('/?msg=Unknown Error');
        //     return;
        // }
        var result=await global.process_sql_call("CALL user_test_login('"+myusr+"','"+mypwd+"')",res);
        if(result == null) return;
        var sql_Result=result.Result;
        var sql_uid=result.uid;
        if(sql_Result!=0){
            res.redirect('/viewer/');
        }
        else{
            req.session.isLoggedIn = true;
            req.session.username = myusr;
            if(sql_uid>0){
                res.redirect('/usr/mygames/');
            }
            else{
                res.redirect('/admin/users');
            }
        }
    });
}

function logout_user (req,res){
    req.session.destroy((err) => {
        res.redirect('/viewer/');
    });
};

module.exports.login = login_user;
module.exports.logout = logout_user;



