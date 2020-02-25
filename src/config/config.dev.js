import path from 'path'

const dotenv = require('dotenv')
dotenv.config()

let config = {}

config.logFileDir = path.join(__dirname, '../../log')
config.logFileName = 'app.log'

//config.dbHost = process.env.dbHost || '167.86.120.248'
config.dbHost = process.env.MONGODB_HOST || '0.0.0.0'
config.dbPort = process.env.MONGODB_PORT || '27017'
config.dbName = process.env.MONGODB_NAME || 'charity'
config.dbUserName = process.env.MONGODB_USERNAME || ''
config.dbPassword = process.env.MONGODB_PASSWORD || ''
config.serverPort = process.env.SERVER_PORT || 3000
config.secret = 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING'


export default config
