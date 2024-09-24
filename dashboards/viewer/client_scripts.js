
var socket = io(); //load socket.io-client and connect to the host that serves the page
// var selected_user_id = <!--SELECTED_USER-->;
// var selected_assoc_id = <!--SELECTED_ASSOC-->;
// var selected_event_id = <!--SELECTED_ASSOC-->;
var reqdata={
	<!--REQDATA-->
};

var refresh_on_close=false;
var curr_id=-1;
var curr_inv="";
var curr_name="";
var curr_game="";


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

socket.on('refresh', () =>{
     console.log("Received refresh");
	location.reload();
});

function login(){
	document.getElementById("usr_name").value="";
	document.getElementById("usr_pwd").value="";
	show_popup("usr_login");
};
