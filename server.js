const http = require('http');


function requestHandler(req, res) {
	// regex to parse headers['user-agent'] for OS
	const re = /(\([^(\)]+)\)/g;
	let found = req.headers['user-agent'].match(re)[0];
	let software = found.substr(1, found.length - 2);

	// populate response object
	const responseObject = {
		ipAddress: req.connection.remoteAddress,
		language: req.headers['accept-language'].split(',')[0],
		software,
	}
	
	// send populated response object
	res.end(JSON.stringify(responseObject));
}



const server = http.createServer(requestHandler);

server.listen(3000, () => console.log('server listening on port 3000'));


