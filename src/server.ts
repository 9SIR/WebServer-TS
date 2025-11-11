import uWS from 'uWebSockets.js';
import { logger } from './utils/logger.js';
import { config } from './utils/toml_parser.js';

/* New uWebSocket Object */
const app = uWS.App();

app.get('/testing/ping', (res, req) => {
	res.end('Hello World!');
	logger.info({'module':'server', 'function':'uWS.App.get',
				 'request path':'/testing/ping', 'msg':`someone request testing api`});
});


app.listen(config.server.http.port, (token) => {
	if (token) {
		logger.info({'module':'server', 'function':'uWS.App.listen', 'msg':`server startup completed and listening to port ${config.server.http.port}`});
	} else {
		logger.error({'module':'server', 'function':'uWS.App.listen', 'msg':`server startup failed`});
		return;
	}
});
