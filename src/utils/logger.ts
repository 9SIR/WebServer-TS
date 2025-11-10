import pino from 'pino';
import { config } from './toml_parser.js';


const logRootDir = config.syslog.rootdir;
const logSubDir = config.syslog.subdir;
const logFileName = config.syslog.logname;

var destStreams = pino.destination({
	sync: false,     /* 日誌異步寫入 */
	fsync: false,    /* 每次寫入日誌時不強制刷盤 */
	append: true,    /* 日誌追加模式寫入文件 */
	mkdir: true,     /* 自動創建日誌文件夾 */
	mode: '0644',    /* 創建日誌文件的權限 */
	minLength: 1024, /* 緩衝區達到多少字節後，才觸發寫入操作 */
	maxLength: 4096, /* 緩衝區超過多少字節，Pino 會強制寫入 */
	maxWrite: 8192,  /* 單次寫入最大字節數 */
	contentMode: 'utf8',
	periodicFlush: true, /* 緩存日誌定期刷盤 */
	dest: `${logRootDir}/${logSubDir}/${logFileName}`
});

const streams = [
	{ stream: destStreams }
];

export const logger = pino({
	base: null,
	level: 'info',
	timestamp: () => `,"time":"${new Date().toLocaleString()}"`,
	formatters: {
		bindings(bindings) {
			return {
				pid: bindings.pid
			}
		},
		level: (label) => ({
			level: label.toUpperCase()
		})
	},
	serializers: {
		err: pino.stdSerializers.err,
		error: pino.stdSerializers.err
	},
	redact: {
		paths: ['password', '*.token', '*.secret'],
		censor: '**REDACTED**'
	}
}, pino.multistream(streams));
