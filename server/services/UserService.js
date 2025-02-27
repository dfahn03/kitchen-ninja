import mongoose from "mongoose"
import bcrypt from 'bcryptjs'
let Schema = mongoose.Schema
// let ObjectId = Schema.Types.ObjectId

//bcrypt uses hashing and salt to obfiscate your password 
const SALT = 10


let _schema = new Schema({
  name: { type: String, required: true },
  //every email must be unique on the database
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  // siteId: { type: ObjectId, ref: 'Site', required: true }
}, { timestamps: true })

//schema.methods are used to add a method to a Model instance
_schema.methods.validatePassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.hash, function (err, isMatch) {
      if (err || !isMatch) {
        return reject(err)
      }
      return resolve(isMatch)
    })
  })
}

export default class UserService {

  get repository() {
    return mongoose.model('User', _schema)
  }

  generateHash(password) {
    return bcrypt.hashSync(password, SALT)
  }

  async findUserById(id) {
    this.repository.findById(id)
  }

  async findUserByEmail(email) {
    return await this.repository.findOne({ email })
  }

}