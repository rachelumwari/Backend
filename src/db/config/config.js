require('dotenv').config();

const DB_USER="postgres", DB_PASSWORD="ZfxkwRrQF508XsRtZROT", DB_NAME_TEST="railway", DB_HOST="containers-us-west-197.railway.app", DB_PORT=7385 ;

// const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT, DATABASE_URL, DB_NAME_TEST } = process.env;
module.exports = {
	development: {
		username: DB_USER,
		password: DB_PASSWORD,
		database: DB_NAME_TEST,
		host: DB_HOST,
		dialect: 'postgres',
		port: DB_PORT,
		logging: false,
	},
	test: {
		username: DB_USER,
		password: DB_PASSWORD,
		database: DB_NAME_TEST,
		host: DB_HOST,
		dialect: 'postgres',
		port: DB_PORT,
		logging: false,
	},
	production: {
    	username: DB_USER,
		password: DB_PASSWORD,
		database: DB_NAME_TEST,
		host: DB_HOST,
		dialect: 'postgres',
		port: DB_PORT,
		logging: false,
  },
};