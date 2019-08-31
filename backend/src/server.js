const express        = require('../node_modules/express'),
      mongoose       = require('../node_modules/mongoose'),
      cors           = require('../node_modules/cors'),
      routes         = require('./routes'),
      app            = express(),
      server         = require('http').Server(app),
      io             = require('../node_modules/socket.io')(server),
	  Connection     = require('./models/Connection'),
	  port           = 3001;



mongoose.connect(
    "mongodb+srv://db-manager:db-manager@cluster0-3di0n.mongodb.net/raniere-omnistack8?retryWrites=true&w=majority",
    {
    	useNewUrlParser:  true,
    	useFindAndModify: false,
    	useCreateIndex:   true,
    }
);



io.on('connection', socket => {

	console.log('new socket connection: ', socket.id);

	socket.on('disconnect', async reason => {

		console.log(`socket ${socket.id} disconnected! reason: ${reason}`);

		const conn = await Connection.findOne({socketId: socket.id});

		if (conn && conn.userId && conn.socketId) {
			console.log(`unbind user ${conn.userId} from socket ${conn.socketId}`);
			conn.socketId = '';
			await conn.save();
		}
	});

	socket.on('bind_user', async user => {
		console.log(`bind user ${user} to socket ${socket.id}`);
		await Connection.findOneAndUpdate(
			{userId:   user},       //query
			{socketId: socket.id},  //operation ($set)
			{upsert:   true}        //options
		);
	});
});



app.use('/devs/:devId/likes', (req, res, next) => {
	req.io         = io;
	req.Connection = Connection;
	return next();
});

app.use(express.json());
app.use(cors());
app.use(routes);

server.listen(port, () => console.log(`listening on port ${port}...`));