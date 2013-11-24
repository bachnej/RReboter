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


function init() {
	// Connect to the SocketIO server to retrieve ongoing games.
	socket = io.connect();
	socket.on('participants', function(data) {
		 var ul = document.getElementById('lesParticipants');
		 ul.innerHTML='';
		 for(p in data.participants) {
			 var li = document.createElement('li'); 
			 ul.appendChild( li );
			 li.appendChild( document.createTextNode( data.participants[p] ) );
			}
		});
	socket.on('FinalCountDown'	, function(data) {
		 var ms   = data.FinalCountDown;
		 console.log("FinalCountDown : " + ms);
		});
	socket.on('TerminateGame'	, function(data) {
		 h1 = document.querySelector('body > header > h1');
		 h1.innerHTML += ' est terminée !';
		});
	socket.on('solutions'		, function(data) {
		 console.log("Solutions are :\n"+JSON.stringify(data.solutions));
		});
	socket.emit ('identification', 	{ login	: document.getElementById('login').value
									, idGame: document.getElementById('idGame').value}
				);
}


//soh
function testAjax(){
	XHR('GET', '/Game1', {onload: function() {
		var Board = JSON.parse(this.responseText);
		drawBoard(Board);
		} 
	});
	
}


function drawBoard(Board){

    var body=document.getElementById('myBoard');
	var tbl=document.createElement('table');
	//tbl.style.width='100%';
	//tbl.setAttribute('border','1px');
	var tbdy=document.createElement('tbody');
	for(var i=0;i<16;i++){
	    var tr=document.createElement('tr');
	    for(var j=0;j<16;j++){
	        var td=document.createElement('td');
	        td.setAttribute("id", i+"_"+j);
			td.style.background="white";
			td.style.height="25px";
			//td.style.height=window.innerHeight/20;
			//td.style.width=window.innerHeight/20;
			td.style.width="25px";
			td.style.borderStyle="ridge";
	       // td.style.borderLeft= "solide #20ff00";
	        if(Board.board[i][j].g)
	        	td.style.borderLeft="thick solid black";
	        if(Board.board[i][j].d)
	        	td.style.borderRight="thick solid black";
	        if(Board.board[i][j].h)
	        	td.style.borderTop="thick solid black";
	        if(Board.board[i][j].b)
	        	td.style.borderBottom="thick solid black";
	        
	        td.appendChild(document.createTextNode(""));
	        tr.appendChild(td);
	    }
	    tbdy.appendChild(tr);
	}

	tbl.appendChild(tbdy);
	body.appendChild(tbl);
	 
	putRobots(Board);
	putTarget(Board);
}

function putRobots(Board){
	for (var i = 0; i < Board.robots.length; i++) {
    	document.getElementById(Board.robots[i].line+"_"+Board.robots[i].column).innerHTML= "<img src='icon/"+Board.robots[i].color+".png' alt='hello' height='25px' width='25px'/>";
		
		
		//document.getElementById(Board.robots[i].line+"_"+Board.robots[i].column).setAttribute("style", "color: "+Board.robots[i].color+";");
	}
}

function putTarget(Board){
	   alert(Board.target.t);
	   document.getElementById(Board.target.l+"_"+Board.target.c).innerHTML= "<img src='icon/target_"+Board.target.t+".png' alt='hello' height='25px' width='25px'/>";
	   document.getElementById(Board.target.l+"_"+Board.target.c).setAttribute("style", "color: "+Board.target.t+";");
		
}
function sendProposition()
{
    
    var proposition=[{command:'select',robot:'blue'},{command:'move',line:1,column:0}];
    var propXHR=XHR('POST', '/proposition',
     {variables:{login: "player",idGame: "Game1",proposition: JSON.stringify(proposition)},
         onload:function ()
         {
             var answer=null;
             answer=(JSON.parse(this.responseText).state);
             alert(answer);
         }
     }
      );
}
