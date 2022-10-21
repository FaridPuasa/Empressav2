let dotenv = require('dotenv').config()
const pass = process.env.DBPASS
const user = process.env.DBUSER
const collection = process.env.COLLECTION

module.exports = {
    MongoURI: `mongodb://${user}:${pass}@cluster0-shard-00-00.rikek.mongodb.net:27017,cluster0-shard-00-01.rikek.mongodb.net:27017,cluster0-shard-00-02.rikek.mongodb.net:27017/${collection}?ssl=true&replicaSet=atlas-tr9az4-shard-0&authSource=admin&retryWrites=true&w=majority`
}
