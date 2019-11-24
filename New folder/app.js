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



    app.get('/',function(req, res)	{
        res.sendFile(__dirname+'/client/login.html');
        console.log(__dirname);
    });
    app.use('/client',express.static(__dirname + '/client'));
 

    app.post('/auth',urlencodedParser,function(req,res)	{
	
        let username = req.body.username;  // change the code to get data from req.body
        let pwd = req.body.password;  //  change the code to get data from req.body
        let sql= "select * from accounts where username ='" + username + "' AND password='" + pwd + "';";
        connection.query(sql, function(error,results) {
         console.log(results.length);
         if (results.length>0)	{
            res.sendFile(__dirname+'/client/index.html') //-> game init screen
        }
        else	{
             res.sendFile(__dirname+'/client/wrong/wrongLogin.html');
         }
        });
    
    });

    

    app.post('/register',urlencodedParser,function(req,res)	{
	
        let username = req.body.username;  // change the code to get data from req.body
        let pwd = req.body.pass;  //  change the code to get data from req.body
        let rePwd = req.body.repass;
        let sql= "INSERT INTO accounts VALUES ('" + username + "' , '" + pwd + "' , 0);";
        let userCheck = "select * from accounts where username ='" + username + "';";
        if(pwd === rePwd && pwd !== "" && rePwd !== "")	{
                connection.query(sql);
                console.log("Signup successful!");//-> game init screen 
                res.sendFile(__dirname+'/client/index.html');
        }
        else	{
                res.sendFile(__dirname+'/client/wrong/wrongSignUp.html')
        }
    });

    
app.use('/client',express.static(__dirname+'/client'));
app.use(express.static(__dirname));
app.use('/client',express.static(__dirname+'/client'));
app.use(express.static(__dirname+'/client'));


serv.listen(2000);
console.log("Server started.");





var SOCKET_LIST = {};

var Entity = function() {
	var self = {
		x:250,
        	y:250,
		spdX:0,
		spdY:0,
        	id:"",
	}
	self.update = function() {
		self.updatePosition();
	}
	self.updatePosition = function() {
		self.x += self.spdX;
		self.y += self.spdY;
	}
	return self;
}
		




var Player = function(id){
    var self = Entity();
 /*   self.id : id;
        self.number:"" + Math.floor(10 * Math.random());
        self.pressingRight:false;
        self.pressingLeft:false;
        self.pressingUp:false;
        self.pressingDown:false;
        self.maxSpd:10;         */
    var super_update = self.update;
    self.update = function() {
	self.updateSpd();
	super_update();
    }
    
    self.updateSpd = function(){
        if(self.pressingRight)
            self.spdX += self.maxSpd;
        else if(self.pressingLeft)
            self.spdX -= self.maxSpd;
	else
    	    self.spdX = 0;
	    
        if(self.pressingUp)
            self.spdY -= self.maxSpd;
        else if(self.pressingDown)
            self.spdY += self.maxSpd;
	else
    	    self.spdY = 0;
    }
    Player.list[socket.id] = player;
    return self;
}   
Player.list = {};
Player.onConnect = function(socket){
	var player = Player(socket.id);
	socket.on('keyPress',function(data){
        if(data.inputId === 'left')
            player.pressingLeft = data.state;
        else if(data.inputId === 'right')
            player.pressingRight = data.state;
        else if(data.inputId === 'up')
            player.pressingUp = data.state;
        else if(data.inputId === 'down')
            player.pressingDown = data.state;
    });
}
Player.onDisconnect = function(socket){
	delete Player.list[socket.id];
}
Player.update = function(){
	var pack = [];
    	for(var i in Player.list){
        	var player = Player.list[i];
        	player.update();
        	pack.push({
            		x:player.x,
            		y:player.y,
            		number:player.number
        });    
    }
    return pack;
} 
 
var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;
    socket.on('disconnect',function(){
        delete SOCKET_LIST[socket.id];
	Player.onDisconnect(socket);
        
    });
   
    
   
   
});
 
setInterval(function(){
    var pack = Player.update();
    
    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i];
        socket.emit('newPositions',pack);
    }
   
   
   
   
},1000/25);