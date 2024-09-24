
var socket = io(); //load socket.io-client and connect to the host that serves the page
// var selected_user_id = <!--SELECTED_USER-->;
// var selected_assoc_id = <!--SELECTED_ASSOC-->;
// var selected_event_id = <!--SELECTED_ASSOC-->;
var reqdata={
	<!--REQDATA-->
};

var refresh_on_close=false;

var next_op="";
var next_id=0;

//POPUP MANAGEMENT
var popup_shown=null;
function lock_recurr(){
	return popup_shown!=null;
}

function show_popup(name){
	hide_popup();
	var pp=document.getElementById(name);
	if(pp){
		popup_shown=pp;
		popup_shown.style.display="flex";
	}
}

function hide_popup(){
	if(refresh_on_close){
		refresh_on_close=false;
		location.reload();
		return;
	}
	if(popup_shown!=null){
		popup_shown.style.display="none";
		popup_shown=null;
	}
}


function request_confirmation(op,id){
	next_id=id;
	next_op=op;
	show_popup("confirm_pop");
}

function confirm_operation(){
	hide_popup();
	if(next_op==="rst_pwd"){
		socket.emit("rst_pwd",next_id);
		return;
	}
	if(next_op==="delete_user"){
		socket.emit("del_user",next_id);
		return;
	}
	if(next_op==="delete_assoc"){
		socket.emit("del_assoc",next_id);
		return;
	}
	if(next_op==="delete_event"){
		socket.emit("del_event",next_id);
		return;
	}
}

//GENERIC
socket.on('c_err', (data) => {
	console.log("Received loan_c_err "+data);
	document.getElementById("msg_body").innerHTML="\
		<br/>\
		<b>ERRORE! </b><br/>\
		<br/><a>"+data+"</a></br>";
	show_popup("msg_pop");
});

socket.on('c_ref', (data) => {
	console.log("Received loan_c_err "+data);
	document.getElementById("msg_body").innerHTML="\
		<br/>\
		<b>ERRORE! </b><br/>\
		<br/><a>"+data+"</a></br>";
	show_popup("msg_pop");
	refresh_on_close=true;
});

socket.on('c_msg', (data) => {
	console.log("Received c_msg "+data);
	document.getElementById("msg_body").innerHTML="\
		<br/>\
		<a>"+data+"</a></br>";
	show_popup("msg_pop");
	refresh_on_close=false;
});

socket.on('refresh', () =>{
     console.log("Received refresh");
	location.reload();
});



//User Enable/disable
function set_user_enabled(uid,status){
	socket.emit("usr_ena",uid,status);
}

//user pwd reset
function reset_user_pwd(id){
	request_confirmation("rst_pwd",id);
}

//user delete
function delete_user(id){
	request_confirmation("delete_user",id);
}


//user create
function create_user(){
	document.getElementById("nup_name").value="";
	document.getElementById("nup_code").value="AAA";
	show_popup("nup");
}

function nup_request(){
	var nname=document.getElementById("nup_name").value;
	var ncode=document.getElementById("nup_code").value.toUpperCase();
	socket.emit("nup_request",nname,ncode);
}


//Assoc Enable/disable
function set_assoc_enabled(aid,status){
	socket.emit("assoc_ena",aid,status);
}

//associtaion delete
function delete_assoc(id){
	request_confirmation("delete_assoc",id);
}


//assoc create
function create_assoc(){
	document.getElementById("nap_name").value="";
	document.getElementById("nap_code").value="AAA";
	show_popup("nap");
}

function nap_request(){
	var nname=document.getElementById("nap_name").value;
	var ncode=document.getElementById("nap_code").value.toUpperCase();
	socket.emit("nap_request",nname,ncode);
}

//assoc remove admin
function remove_admin(uid,aid){
	socket.emit("remove_admin",uid,aid);
}



function add_admin(aid){
	document.getElementById("addadmin_to").value=aid;
	socket.emit("add_admin",aid);
}

socket.on("add_admin",(data) =>{
	document.getElementById("addadmin_select").innerHTML=data;
	show_popup("addadmin");
});

function add_adminrequest(){
	var target_id=document.getElementById("addadmin_to").value;
	var SelectElement=document.getElementById("addadmin_select");
	var user_id=SelectElement.options[SelectElement.selectedIndex].value;
	socket.emit("add_user_request",user_id,target_id,30);
}


//Event Enable/disable
function set_event_enabled(eid,status){
	socket.emit("event_ena",eid,status);
}

function delete_event(eid){
	request_confirmation("delete_event",eid);
}


//event create
function create_event(){
	document.getElementById("nep_name").value="";
	show_popup("nep");
}

function nep_request(){
	var nname=document.getElementById("nep_name").value;
	socket.emit("nep_request",nname);
}





