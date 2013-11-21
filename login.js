function init() {
	// Connect to the SocketIO server to retrieve ongoing games.
	socket = io.connect();
	socket.on('gamesList', function(data) {
								 var ul = document.getElementById('lesParties');
								 ul.innerHTML='';
								 for(p in data.gamesList) {
									 var li = document.createElement('li'); 
									 ul.appendChild( li );
									 li.appendChild( document.createTextNode( data.gamesList[p] ) );
									}
								}
			 );
	socket.emit('loginPage');
}


var XHR = function(method, ad, params) {
	var xhr = new XMLHttpRequest();
	xhr.onload = params.onload || null;
	xhr.open(method, ad);
	if(method == 'POST') {xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');}
	var variables   = params.variables || null
	  , str			= '';
	for(var i in variables) {
		 str += i + '=' + encodeURIComponent( variables[i] ) + '&';
		}
	xhr.send( str );
}

function testAjax(){
	//var XHR;
	alert("ok");
	/*XHR(‘GEET’, ‘/j1’, {onload: function() {
		console.log(“Le serveur me renvoie :\n” + this.responseText); 
		} 
	});*/
	
	
}