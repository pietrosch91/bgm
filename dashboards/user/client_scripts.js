
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
var pending_op=null;
var pending_id=0;

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
		popup_shown.style.display="none";popup_shown=null;
	}
}

function recover_game_info(id){
	curr_id=id;
	console.log("curr_id ="+curr_id);
	curr_inv=document.getElementById("inv_"+curr_id).innerHTML;
	curr_game=document.getElementById("title_"+curr_id).innerHTML;
}

function get_game_str(){
	return "["+curr_inv+"] - "+curr_game;
}

function request_confirmation(op){
	pending_op=op;
	show_popup("confirm_pop");
}


function request_confirmation(op,id){
	pending_op=op;
	pending_id=id;
	show_popup("confirm_pop");
}


function confirm_operation(){
	hide_popup();
	if(pending_op==="reset_loans"){
		reset_loans();
		return;
	}
	if(pending_op==="reset_ludo"){
		reset_ludo();
		return;
	}
	if(pending_op==="empty_ludo"){
		empty_ludo();
		return;
	}
	if(pending_op==="game_del"){
		socket.emit("game_del",pending_id);
	}
	if(pending_op==="unfoster"){
		socket.emit("unfoster",pending_id);
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

//Assignation/Removal to EVENT

function evt_assign(game_id){
	if(lock_recurr())  return;
	recover_game_info(game_id);
	socket.emit("evlist"); //OK SERVER SIDE
}

socket.on('evlist', (data) =>{
	console.log("received evlist");
	console.log(data);
	document.getElementById("event_title").innerHTML=get_game_str();
	document.getElementById("event_select").innerHTML=data;
	show_popup("event_on");
});

function event_request(){
	hide_popup();
	var SelectElement=document.getElementById("event_select");
	var curr_event=SelectElement.options[SelectElement.selectedIndex].value;
	socket.emit("event_to",curr_id,curr_event); //OK SERVER SIDE
};

function evt_remove(id,forced){
	if(lock_recurr())  return;
	socket.emit("unevent",id,forced);
};

//Opening/closing LOAN
var foster_id=-1;

function foster_assign(game_id){
	if(lock_recurr())  return;
	// owner_name=document.getElementById("owner_"+game_id).innerHTML;
	recover_game_info(game_id);
	var exclude_id=reqdata.assoc_id;
	if(exclude_id==null) exclude_id=reqdata.user_id;
	socket.emit("loanlist",exclude_id);
}

socket.on('loanlist', (data) =>{
	console.log("received loanlist");
	console.log(data);
	document.getElementById("foster_title").innerHTML=get_game_str();
	document.getElementById("foster_select").innerHTML=data;
	show_popup("foster_on");
});

function foster_request(){
	hide_popup();
	var SelectElement=document.getElementById("foster_select");
	var curr_foster=SelectElement.options[SelectElement.selectedIndex].value;
	socket.emit("foster_to",curr_id,curr_foster);
};

function foster_unassign(id){
	if(lock_recurr())  return;
	request_confirmation("unfoster",id);
};

//Game addition
function add_game(){
	if(lock_recurr())  return;
	document.getElementById("add_title").value="";
	show_popup("add_form");
}

function add_request(){
	var add_id=reqdata.assoc_id;
	if(add_id==null) add_id=reqdata.user_id;
	socket.emit("add_game",document.getElementById("add_title").value,add_id);
}

//game editing
function edit_title(id){
	recover_game_info(id);
	document.getElementById("cet_title").value=curr_game;
	show_popup("cet_form");
}

function cet_request(){
	socket.emit("cet_request",curr_id,document.getElementById("cet_title").value);
}

//<!--Adding User To Privilege-->

function add_user(level,role){
	document.getElementById("aupf_text").innerHTML = "Aggiungi "+role;
	document.getElementById("aupf_level").value=level;
	var target_id=reqdata.assoc_id;
	if(target_id==null) target_id=reqdata.event_id;
	socket.emit("add_user",target_id);
}

socket.on("add_user",(data) =>{
	document.getElementById("aupf_select").innerHTML=data;
	show_popup("aupf");
});

function add_user_request(){
	var target_id=reqdata.assoc_id;
	if(target_id==null) target_id=reqdata.event_id;
	var SelectElement=document.getElementById("aupf_select");
	var user_id=SelectElement.options[SelectElement.selectedIndex].value;
	var level=document.getElementById("aupf_level").value;
	console.log("setting level to "+level);
	socket.emit("add_user_request",user_id,target_id,level);
}


//<!--Editing User Privilege-->

function edit_access(usr,level,name){

	document.getElementById("eupf_text").innerHTML = "Autorizza "+name;
	document.getElementById("eupf_user").value=usr;
	document.getElementById("eupf_select").value=level;
	show_popup("eupf");
}

function edit_user_request(){
	var target_id=reqdata.assoc_id;
	if(target_id==null) target_id=reqdata.event_id;
	var SelectElement=document.getElementById("eupf_select");
	var level=SelectElement.options[SelectElement.selectedIndex].value;
	var user_id=document.getElementById("eupf_user").value;
	console.log("setting level to "+level);
	socket.emit("add_user_request",user_id,target_id,level);
}

//<!-- Editing Assoc Information-->

function eaif_show(){
	document.getElementById("eaif_assoc_id").value=reqdata.assoc_id;
	socket.emit("eaif_show",reqdata.assoc_id);
}

socket.on("eaif_show",(phone,mail,link) =>{
	document.getElementById("eaif_text").innerHTML="Gestisci Informazioni di "+reqdata.assoc_name;
	document.getElementById("eaif_phone").value=phone;
	document.getElementById("eaif_mail").value=mail;
	document.getElementById("eaif_link").value=link;
	show_popup("eaif");
});

function eaif_request(){
	socket.emit("eaif_request",reqdata.assoc_id,document.getElementById("eaif_phone").value,document.getElementById("eaif_mail").value,document.getElementById("eaif_link").value);
}


//<!--Notes Editing-->
var note_op;

function note_edit(id){
	recover_game_info(id);
	note_op=0; //edit
	document.getElementById("nef_id").value=id;
	document.getElementById("nef_title").innerHTML="Note di "+get_game_str();
	socket.emit("get_game_notes",id);
}

function note_add(id){
	recover_game_info(id);
	note_op=1; //add
	document.getElementById("naf_id").value=id;
	document.getElementById("naf_title").innerHTML="Note di "+get_game_str();
	document.getElementById("naf_add").value="";
	socket.emit("get_game_notes",id);
}

socket.on("get_game_notes",(data)=>{
	if(note_op==0){
		document.getElementById("nef_notes").value=data;
		show_popup("nef");
	}
	else{
		document.getElementById("naf_notes").innerHTML="<b>Note:</b><br/>"+data.replaceAll('\n','<br/>');
		show_popup("naf");
	}
});

function nef_request(){
	socket.emit("set_game_notes",document.getElementById("nef_id").value,document.getElementById("nef_notes").value);
}

function naf_request(){
	socket.emit("add_game_notes",document.getElementById("naf_id").value,document.getElementById("naf_add").value);
}

//Scaffolding
function shelf(id,status){
	socket.emit("edit_game_scaffolding",id,status);
}

//BGGLINKING



function update_bggid(id){
	if(lock_recurr())  return;
	recover_game_info(id);
	document.getElementById("bgg_check_title").innerHTML=curr_game;
	show_popup("bgg_check");
}

function bgg_check_ok(){
	hide_popup();
	search_bggid(curr_id);
}

function search_bggid(id){
	if(lock_recurr())  return;
	recover_game_info(id);
	socket.emit("bgg_assign",id,curr_game);
}

function bgglink_abort(){
	// hide_popup();
	document.getElementById("msg_body").innerHTML="\
		<br/>\
		<b>"+curr_game+"</b><br/>\
		Collegamento BGG interrotto!";
	show_popup("msg_pop");
}

socket.on('bgglink_step2', (opts) =>{
	// console.log("Received bgglink_step2");
	// console.log(opts);
	document.getElementById("bgg_stp2_title").innerHTML=curr_game;
	document.getElementById("bgg_stp2_select").innerHTML=opts;
	show_popup("bgg_stp2");
});

function bgglink_stp2_ok(){
	var SelectElement=document.getElementById("bgg_stp2_select");
	var curr_bggid=SelectElement.options[SelectElement.selectedIndex].value;
	hide_popup();
	socket.emit("bgglink_stp2_ok",curr_id,curr_bggid);
}

function bgglink_skip_to_stp3(){
	// hide_popup();
	bgglink_open_stp3();
}

socket.on('bgglink_step3', () =>{
	console.log("Received bgglink_step3");
	bgglink_open_stp3();
});

function bgglink_open_stp3(){
	document.getElementById("bgg_stp3_title").innerHTML=curr_game;
	document.getElementById("bgg_stp3_number").value=0;
	show_popup("bgg_stp3");
}

function bgglink_stp3_ok(){
	var curr_bggid=document.getElementById("bgg_stp3_number").value;
	hide_popup();
	socket.emit("bgglink_stp3_ok",curr_id,curr_bggid);
}

function bgglink_skip_to_stp4(){
	socket.emit("bgglink_stp4_test",curr_id,curr_game);
}

socket.on('bgglink_step4', () =>{
	// console.log("Received bgglink_step2");
	// console.log(opts);
	bgglink_open_stp4();
	// document.getElementById("bgg_stp2_title").innerHTML=bggid_game;
	// document.getElementById("bgg_stp2_select").innerHTML=opts;
	// show_popup("bgg_stp2");
});

function bgglink_open_stp4(){
	document.getElementById("bgg_stp4_title").innerHTML=curr_game;
	document.getElementById("bgglink_stp4_pl").value="";
	document.getElementById("bgglink_stp4_age").value="";
	document.getElementById("bgglink_stp4_dur").value="";
	document.getElementById("bgglink_stp4_year").value=null;
	document.getElementById("bgglink_stp4_pic").value="";
	document.getElementById("bgglink_stp4_link").value="";
	show_popup("bgg_stp4");
}

function bgglink_stp4_ok(){
	var pl=document.getElementById("bgglink_stp4_pl").value;
	var age=document.getElementById("bgglink_stp4_age").value;
	var dur=document.getElementById("bgglink_stp4_dur").value;
	var year=document.getElementById("bgglink_stp4_year").value;
	var pic=document.getElementById("bgglink_stp4_pic").value;
	var link=document.getElementById("bgglink_stp4_link").value;

	hide_popup();
	socket.emit("bgglink_stp4_ok",curr_id,curr_game,pl,age,dur,year,pic,link);
}

//Set event document slots
function set_doc_slots(){
	document.getElementById("sdaf_count").value=10;
	document.getElementById("sdaf_title").innerHTML=reqdata.event_name;
	show_popup("sdaf");
}

function sdaf_request(){
	var count=document.getElementById("sdaf_count").value;
	var eid=reqdata.event_id;
	socket.emit("sdaf_request",eid,count);
}

//event Loan manage
function start_loan(id){
	if(!lock_recurr()){
		recover_game_info(id);
		socket.emit("start_loan",id);
	}
}

socket.on('start_loan', () => {
	document.getElementById("rls_game").innerHTML=get_game_str();
	document.getElementById("rls_name").value="";
	show_popup("loan_start_pop");
});

function start_loan_request(){
	hide_popup();
	curr_name=document.getElementById("rls_name").value;
	socket.emit("start_loan_request",curr_id,curr_name);
}

socket.on('doc_put',(num) =>{
	console.log("Received doc_put "+num);
	document.getElementById("msg_body").innerHTML="\
		 Inserisci il Documento di\
		 <h2>"+curr_name+"</h2>\
		 nel contenitore\
		<h2>"+num+"</h2>";
	show_popup("msg_pop");
	refresh_on_close=true;
});

function stop_loan(id){
	if(!lock_recurr()){
		recover_game_info(id);
		socket.emit("stop_loan",id);
	}
}

socket.on('stop_loan', (name) => {
	document.getElementById("rcv_game").innerHTML=get_game_str();
	document.getElementById("rcv_name").innerHTML=name;
	show_popup("loan_stop_pop");
});

function stop_loan_request(){
	socket.emit("stop_loan_request",curr_id);
}

socket.on('doc_get',(num,name) =>{
	console.log("Received doc_get "+num+","+name);
	document.getElementById("msg_body").innerHTML="\
			Recupera il Documento di\
            <h2>"+ name+"</h2>\
            dal contenitore\
            <h2>"+num+"</h2>";
	show_popup("msg_pop");
	refresh_on_close=true;
});


//Association visibility
function assoc_change_visibility(){
	var state=document.getElementById("ass_visib").checked;
	socket.emit("assoc_visib_req",reqdata.assoc_id,state);
}


//Event visibility
function event_change_visibility(){
	var state=document.getElementById("ev_visib").checked;
	socket.emit("event_visib_req",reqdata.event_id,state);
}

//Event lock
function event_change_lock(){
	var state=document.getElementById("ev_lock").checked;
	socket.emit("event_lock_req",reqdata.event_id,state);
}

//Event reset loans
function reset_loans(){
	var eid=reqdata.event_id;
	socket.emit("reset_loans",eid);
}

//Event  reset_ludo
function reset_ludo(){
	var eid=reqdata.event_id;
	socket.emit("reset_ludo",eid);
}

//Event  empty_ludo
function empty_ludo(){
	var eid=reqdata.event_id;
	socket.emit("empty_ludo",eid);
}


//<!-- Editing EVENT Information-->

function eeif_show(){
	document.getElementById("eeif_event_id").value=reqdata.event_id;
	socket.emit("eeif_show",reqdata.event_id);
}

socket.on("eeif_show",(link) =>{
	document.getElementById("eeif_text").innerHTML="Gestisci Informazioni di "+reqdata.event_name;
	document.getElementById("eeif_link").value=link;
	show_popup("eeif");
});

function eeif_request(){
	socket.emit("eeif_request",reqdata.event_id,document.getElementById("eeif_link").value);
}



//<!-- Editing USER Information-->

function eupw_show(){
	document.getElementById("eupw_usr_id").value=reqdata.usr_id;
	document.getElementById("usr_pwd").value="";
	document.getElementById("usr_pwd2").value="";
	document.getElementById("eupw_err").innerHTML="";
	show_popup("eupw");
}

function eupw_request(){
	var pwd1=document.getElementById("usr_pwd").value;
	var pwd2=document.getElementById("usr_pwd2").value;
	if(pwd1===pwd2){
		document.getElementById("eupw_err").innerHTML="Le password non corrispondono.";
		socket.emit("eupw_request",reqdata.user_id,pwd1);
	}
	else{
		document.getElementById("eupw_err").innerHTML="Le password non corrispondono.";
	}
};

//GAME DELETE
function game_delete(id){
	request_confirmation("game_del",id);
}


//Add Game to Event directly
function add_event_game(){
	document.getElementById("eadd_title").value="";
	document.getElementById("eadd_owner").value="";
	show_popup("eadd_form");
}

function eadd_request(){
	var title=document.getElementById("eadd_title").value;
	var owner=document.getElementById("eadd_owner").value;
	var eid=reqdata.event_id;
	socket.emit("eadd_game",title,owner,eid);
}


function set_dlink(id){
	document.getElementById("dl_link").value="";
	curr_id=id;
	show_popup("dl_form");
}

function dl_request(){
	socket.emit("dl_req",curr_id,document.getElementById("dl_link").value);
}










