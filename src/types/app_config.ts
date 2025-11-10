export interface AppConfig {
	server: {
		http: {
			ip: string,
			port: number
		}
	},
	syslog: {
		rootdir: string,
		subdir: string,
		logname: string
	},
	redpanda: {
		ip: string,
		port: string
		agent: {
			client1: {
				id: string
			}
		},
		topic: {
			atcmd_from_web: {
				name: string
			}
		}
		consumer: {
			group1: {
				id: string
			}
		}
	},
	db: {
		redis: {
			host: string,
			port: string,
			db: number,
			user: string,
			password: string
		},
		mysql: {
			host: string,
			port: number,
			user: string,
			password: string
			dbname: string,
			connect_limit: number,
			maxidle: number,
			idle_timeout: number
		}
	}
}