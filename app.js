var express = require('express');
var app = express();
var serv = require('http').Server(app);
var parser = require('body-parser');
var urlencodedParser = parser.urlencoded({extended: false});
var mysql = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'login'
});



 connection.connect(function(err){
	if(err) {
		console.log("Error while connecting with database");		
	} else {
		console.log("Database is connected");
		connection.query("select username, password from accounts")
	}
	});


//connection.connect();


app.get('/',function(req, res)	{
	res.sendFile(__dirname+'/client/login.html');
	console.log(__dirname);
});


app.post('/auth',urlencodedParser,function(req,res)	{
	
	let username = req.body.username;  // change the code to get data from req.body
    let pwd = req.body.password;  //  change the code to get data from req.body
    let sql= "select * from accounts where username ='" + username + "' AND password='" + pwd + "';";
    connection.query(sql, function(error,results) {
     console.log(results.length);
     if (results.length>0)	{
		res.sendFile(__dirname+'/car-movement-2.html') //-> game init screen
	}

	 else	{
		 res.send("Wrong username/password.");
	 }
	});

});


app.post('/register',urlencodedParser,function(req,res)	{
	
	let username = req.body.username;  // change the code to get data from req.body
	let pwd = req.body.pass;  //  change the code to get data from req.body
	let rePwd = req.body.repass;
	let sql= "INSERT INTO accounts VALUES ('" + username + "' , '" + pwd + "' , 0);";
	if(pwd === rePwd)	{
			connection.query(sql);	
			console.log("Signup successful!");//-> game init screen 
			res.sendFile(__dirname+'/car-movement-2.html');
	}
	else	{
			res.send("Passwords don't match.")
	}
});

/*	console.log(req.body.username);
	 let username=req.body.username;
	 let pwd=req.body.password;
	 let sql= "select * from accounts where username ='" +username + "' AND password='" + pwd + "';";
	 console.log(sql);
	  console.log(connection.query(sql));
	 	if(connection.query(sql))	{
			 console.log("heloooo");
			res.sendFile(__dirname+'/car-movement.html');
		}
		else (res.send( "Wrong username/password!" ));
			})		*/

app.use('/client',express.static(__dirname+'/client'));
app.use(express.static(__dirname));
app.use('/client',express.static(__dirname+'/client'));
app.use(express.static(__dirname+'/client'));


serv.listen(2000);
console.log("Server started.");



/*var io = require('socket.io') (serv, {});
io.sockets.on('connection', function(socket) {
	console.log('socket connection');

	socket.on('happy', function(data)	{
		console.log('happy because ' + data.reason);
	});

	socket.emit('serverMsg', {
		msg: 'hello',
	});
});	*/ 
