import mongoose from 'mongoose'
import UserService from './UserService';
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const _userService = new UserService()

let _kitchenSchema = new Schema({
  menuId: { type: ObjectId, ref: 'Menu' },
  inventoryId: { type: ObjectId, ref: 'Inventory' },
  name: { type: String, required: true }
})


let _schema = new Schema({
  kitchens: [_kitchenSchema],
  userId: { type: ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  passcode: { type: String, required: true },
})

let _siteUserSchema = new Schema({
  userId: { type: ObjectId, ref: 'User', required: true },
  siteId: { type: ObjectId, ref: 'User', required: true },
  role: { type: String, enum: ["chef", "admin"], default: "chef" }
})

let _siteUserRepo = mongoose.model('SiteUser', _siteUserSchema)
//you need access to the siteuser repository in your controller
export default class SiteService {
  get repository() {
    return mongoose.model('Site', _schema)
  }

  async getSite(siteId, userId) {
    return await this._findUserSite(siteId, userId)
  }


  async findUserSites(userId) {
    //Finds all sites that contains a specific usersID
    let mySites = await this.repository.find({ userId })
    let sitesThatIBelongTo = await _siteUserRepo.find({ userId })
    let memberSites = await Promise.all(sitesThatIBelongTo.map(s => this.repository.findById(s.siteId)))
    return { mySites, memberSites }
  }


  async addSiteUser(siteId, userId, siteUser) {

    let req = await this._findUserSite(siteId, userId)

    if (req.siteUser['role'] != "admin") {
      throw new Error("Invalid Permission")
    }

    siteUser.siteId = siteId

    if (!siteUser.userId && siteUser.email) {
      let otherUser = await _userService.findUserByEmail(siteUser.email)
      siteUser.userId = otherUser._id
    }

    return await _siteUserRepo.create(siteUser)
  }

  async _findUserSite(siteId, userId) {
    let site = await this.repository.find({ _id: siteId, userId })
    if (site) { return { site, siteUser: { userId, siteId, role: "admin" } } }

    let siteUser = await this._findSiteUser(siteId, userId)
    return { site: await this.repository.findById(siteId), siteUser }
  }

  async _findSiteUser(siteId, userId) {
    let siteUser = await _siteUserRepo.findOne({ siteId, userId });
    if (!siteUser) {
      let e = new Error("Invalid Request");
      e['status'] = 401;
      throw e;
    }
    return siteUser
  }


  async findAllSiteUsers(siteId) {
    return await _siteUserRepo.find({ siteId }).populate('userId', 'name email')
  }


}