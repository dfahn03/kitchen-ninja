import express from 'express'
import cors from 'cors'
import bp from 'body-parser'
import DbContext from './db/dbconfig'

//CREATES SERVER
let server = express()
//FIRES UP DB CONNECTION
DbContext.connect()

//Sets the port to Heroku's, and the files to the built project 
var port = process.env.PORT || 3000
server.use(express.static(__dirname + '/../client/dist'))


var whitelist = ['http://localhost:8080'];
var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};
server.use(cors(corsOptions))

//Fire up database connection
require('./db/dbconfig')


//REGISTER MIDDLEWEAR
server.use(bp.json())
server.use(bp.urlencoded({
  extended: true
}))

//REGISTERING SESSION, OTHERWISE NO ONE WILL EVER GET LOGGED IN
import Session from "./middlewear/session"
import AuthController from './controllers/AuthController'

server.use(new Session().express)
server.use('/auth', new AuthController().router)



//YOUR ROUTES HERE!!!!!!
import MasterIngredientController from './controllers/MasterIngredientController'
import RecipeController from "./controllers/RecipeController"
import SiteController from "./controllers/SiteController"
import DashboardController from './controllers/DashboardController'

server.use('/api/ingredients', new MasterIngredientController().router)
server.use('/api/recipes', new RecipeController().router)
server.use('/api/sites', new SiteController().router)
server.use('/api/blogs', new DashboardController().router)


//Default Error Handler
server.use((error, req, res, next) => {
  res.status(error.status || 400).send({ error: { message: error.message } })
})

//Catch all
server.use('*', (req, res, next) => {
  res.status(404).send({
    error: 'No matching routes'
  })
})


server.listen(port, () => {
  console.log('server running on port', port)
})