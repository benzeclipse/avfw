// AVFW
// Term 1308
// Banchop Ben Kangdouangnhot


$('#button').click(function() {
	var name = $('#name').val();
	var string = $('#string').val();
	alert(string);

	//$.post('php/reverse.php', { input: string }, function(data) {
	$.post('php/reverse.php', { string: string, name: name }, function(data) {
		$('#feedback').html(data);
	
	}).error(function() {
		$('#messages').text("error occurred");
	}).complete(function() {
		$('#messages').text("Request complete");
	}).success(function() {
		$('#messages').text("Request successful");
	
	});
 });



$('#buttons').click(function() {
	$.ajax({
		url: 'page.html',
		success: function(datas) {
			$('#content').html(datas);
		
		}
	
	
	});


});


$('#buttons').click(function() {
	var names = $('#names').val();
	
	$.ajax({
		url: 'php/page.php',
		data: 'names=' +names,
		success: function(data) {
			$('#content').html(data);	
		}
	}).error(function() {
		alert("error occurred!");

	});


});



var xmlHttp= createXmlHttpRequestObject();
 
function createXmlHttpRequestObject(){
   var xmlHttp;
   
   if(window.ActiveXObject){
      try{
         xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
         }catch(e){
            xmlHttp =false;
            }
      }else{
         try{
            xmlHttp= new XMLHttpRequest();
            }catch(e){
               xmlHttp =false;
               }
         }
      if(!xmlHttp)
            alert("cant create that object hoss!");
      else
            return xmlHttp;
   }
   
function process(){   
    if(xmlHttp.readyState==0 || xmlHttp.readyState==4){
      food=encodeURIComponent(document.getElementById("userInput").value );
      xmlHttp.open("GET", "php/tickets.php?food="+food, true);
      xmlHttp.onreadystatechange = handleServerResponse;
      xmlHttp.send(null);
      }else{
         setTimeout('process()', 1000);
         }
   }
   
   
function handleServerResponse(){
   if(xmlHttp.readyState==4){
            if(xmlHttp.status==200){
               xmlResponse=xmlHttp.responseXML;
               xmlDocumentElement=xmlResponse.documentElement;
               message=xmlDocumentElement.firstChild.data;
               document.getElementById('underInput').innerHTML='<span style="color:blue">' +message + '</span>';
               setTimeout('process()', 1000);
         }else{
            alert('Something went wrong!');
            }
      }
   }








 
//VFW codes
window.addEventListener( "DOMContentLoaded", function() {

// getElementById function
function main ( clear ) {
	var teams = document.getElementById( clear );
	return teams;
}
  
function toggle( togg ) {
	 switch(togg) {
	 	case "on" :
	 		main("saveValues").style.display = "none";
	 		main("form").style.display = "none";
	 		main('Info').style.display ="none";
	 		main('clearData').style.display ="none";
	 		main('back').style.display = "block";	

	 	break;

	 	case "off" :
	 		main("form").style.display = "block";
	 		main('Info').style.display ="none";
	 		main('clearData').style.display ="none";
	 		main('saveValues').style.display = "block";
	 		main('items').style.display="none";
	 		
	 	break;
	 		default:
	 			return false;
	 }

}

// get random number
function storeLocalData( key ) {  // passing in "edit" item from tutorial 3.6
	// if there is no key, this means this is a brand new item and need a new key.
	if(!key){
		var getId = Math.floor(Math.random()*100000001);
	}else{

	getId = key;
			
}

	var it 	= {};
		it.sport	= ["Sports ",			 main("sport").value];
		it.tname	= ["Team Name ",		 main("tname").value];

    
	// save data to local storage! use Stringify to convert our object to a string
	localStorage.setItem( getId, JSON.stringify(it) );
	alert("Data has been saved!");
}

// write data from local storage to browser
function getData () {
	
	toggle("on");
		
	if( localStorage.length === 0 ) {
		alert("Nothing to show")
		
		} 
		
		var make = document.createElement("div");
		make.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		make.appendChild(makeList);		
		document.body.appendChild(make);
		main('items').style.display="block";	

		// looking in local storage
		for(var i=0, j=localStorage.length; i<j; i++) {
		var makeli = document.createElement("ul");
			
		var linksLi = document.createElement("ul");  //creating another list item for week 3
			
		makeList.appendChild(makeli);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var object = JSON.parse(value); // convert local storage string back to object
		var makeSubList = document.createElement("li");
		makeli.appendChild(makeSubList);
		for ( var m in object ) {
			var makeSubLi = document.createElement("li");
			makeSubList.appendChild(makeSubLi);
			var optSub = object[m][0]+": "+object[m][1];
			makeSubLi.innerHTML = optSub;
			makeSubList.appendChild(linksLi); //append dynamically week 3

			}
		// Create our edit and delete button/link for each item in local storage week3	
		 makeItemLinks(localStorage.key(i), linksLi); 
	}// the makeItemLinks(localStorage.key[i],linksLi); threw me for a curve!!!! had [i], instead of (i)!!!
	
}
	
// make item links functions for local data
// Create the edit and delete links for each stored data item when display.
function makeItemLinks( key, linksLi ){
//add edit single item link
	var editLink = document.createElement('a');
	editLink.href = "#";
	editLink.key = key;   // this is the same thing, in editItem function
	var editText = "Edit Here";
	editLink.addEventListener("click", editItem);
	editLink.innerHTML = editText;
	linksLi.appendChild(editLink);

	// add line break via JS
	var breakTag = document.createElement("br");
	linksLi.appendChild(breakTag);

	var deleteLink = document.createElement("a");
	deleteLink.href = "#";
	deleteLink.key = key;
	var deleteText = "Delete Info";
	deleteLink.addEventListener("click", deleteItem);
	deleteLink.innerHTML = deleteText;
	linksLi.appendChild(deleteLink);

}

function deleteItem () {
	var askConfirm = confirm("are you sure want to delete info?");
	if(askConfirm){
		localStorage.removeItem(this.key);
		window.location.reload();
	}else{
		alert("Nothing has been change");
	}
}

function editItem() {
// get item from local storage.
	var value = localStorage.getItem(this.key);
	var it = JSON.parse(value);
	
	// show form
	toggle("off");
	
	//populate the form fields with current local storage values.
    main('sport').value = it.sport[1];
	main('tname').value = it.tname[1];
	
	// Remove the initial listener from the input save button.
	saveButton.removeEventListener("click", storeLocalData);
	//change submit button value to edit button
    main("saveValues").value = "Edit Info";
	// key value used in this function as a property of the editSubmit even
	var editSubmit = main("saveValues");  
	editSubmit.addEventListener("click", validateForm);
	editSubmit.key = this.key; // enabling submit key
	
}

function clearLocalData () {
	var youSure = confirm("You sure you want to delete?");
		 if(youSure) {  
		 	if( localStorage.length === 0){
				alert("Local storage is empty")
			}else{   
				localStorage.clear();
				alert("All data has been deleted!");
				window.location.reload();
				//return false;
			}
	} 

}

function validateForm( eventData ) {
// Define the elements we want to check
	
	errorMsg.style.border = "";	
	var getSport 	   = main("sport");
	var getTname  	   = main("tname");	
	var getName	       = main("name");
	var getRange	   = main("range");
			
	// reset error messages from reprinting in form edit
	errorMsg.innerHTML = " ";	
	getSport.style.border = "1px solid black";
	getTname.style.border = "1px solid black";
	getName.style.border = "1px solid black";
		
	// Get error message
	var messageArray = [ ];
	// validation
	if (getSport.value === ""){
	var sportError = "Please choose a sport...";
	errorMsg.style.color = "red";
	errorMsg.style.fontSize = "14px";
	getSport.style.border = "1px solid red";
	messageArray.push(sportError);
	}
		
	if (getTname.value === "") {
		var tNameError = "Please enter a team name...";
		errorMsg.style.color = "red";
		getTname.style.border = "1px solid red";
		messageArray.push(tNameError);
	}

	if(messageArray.length >= 1){
		for(var i=0, j=messageArray.length; i<j; i++){
			var text = document.createElement("div");
			text.innerHTML = messageArray[i];
			errorMsg.appendChild(text);
		}
		eventData.preventDefault();
     	return false;
 	}else{
 	   // if good, data is finally save // this key was passed through "save" as a property
	    storeLocalData(this.key);  //adding key to edit a certain file
	
  	}
}  


	var seasonValue,
	errorMsg = main("errors");
	
	var displayData = main("Info");
	displayData.addEventListener("click", getData );

	var clearLink = main("clearData");
	clearLink.addEventListener("click", clearLocalData);
	
	
	var saveButton = main("saveValues");
	saveButton.addEventListener("click",  validateForm);

});
