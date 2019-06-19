//THIS FILE STAYS BASICALLY THE SAME
import mongoose from 'mongoose'

//THIS STRING WILL CHANGE SLIGHTLY
const connectionString = "mongodb://student:student123@cluster0-shard-00-00-hlah1.mongodb.net:27017,cluster0-shard-00-01-hlah1.mongodb.net:27017,cluster0-shard-00-02-hlah1.mongodb.net:27017/kitchen?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority" //input database link

let connection = mongoose.connection

mongoose.connect(connectionString)

//log any errors
connection.on('error', err => {
  console.error('[DATABASE ERROR]:', err)
})

//confirm connection
connection.once('open', () => {
  console.log('connected to the database')
})