//THIS FILE STAYS BASICALLY THE SAME
var mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connection.on('error', err => {
  console.error('[DATABASE ERROR]:', err)
})

//THIS STRING WILL CHANGE SLIGHTLY
const connectionString = process.env.ConnectionString || "mongodb://student:student123@cluster0-shard-00-00-hlah1.mongodb.net:27017,cluster0-shard-00-01-hlah1.mongodb.net:27017,cluster0-shard-00-02-hlah1.mongodb.net:27017/kitchen?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"


export default class DbContext {
  static async connect() {
    try {
      let status = await mongoose.connect(connectionString)
      console.log("Connected")
      return status
    } catch (e) {
      console.error(e)
    }
  }
}

// let connection = mongoose.connection

// mongoose.connect(connectionString, { useNewUrlParser: true })

//log any errors
// connection.on('error', err => {
//   console.error('[DATABASE ERROR]:', err)
// })

//confirm connection
// connection.once('open', () => {
//   console.log('connected to the database')
// })

// module.exports = connection
