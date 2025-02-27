import MenuService from '../../tmp/MenuService'
import express from 'express'
import { Authorize } from '../middlewear/authorize'

//import service and create an instance
let _service = new MenuService()
let _menuRepo = _service.repository


//PUBLIC
export default class MenuController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('', this.getAll)
      // .get('/shared', this.getSharedMenu)
      .get('/:id', this.getById)
      // .get('/:id/lists', this.getMenuLists)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
      .use(this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }

  async getAll(req, res, next) { //get YOUR Menu
    try {
      //only gets Menu by user who is logged in
      let data = await _menuRepo.find()
      return res.send(data)
    } catch (err) { next(err) }
  }

  // async getSharedMenu(req, res, next) { //get Menu SHARED with you
  //   try {
  //     //only gets Menu if user who is logged in matches a shared Id
  //     let data = await _menuRepo.find({ sharedIds: { $in: [req.session.uid] } })
  //     return res.send(data)
  //   }
  //   catch (err) { next(err) }
  // }

  async getById(req, res, next) {
    try {
      let data = await _menuRepo.findOne()
      return res.send(data)
    } catch (error) { next(error) }
  }
  // async getMenuLists(req, res, next) {
  //   try {
  //     if (await _menuRepo.find({ $or: [{ authorId: req.session.uid }, { sharedIds: { $in: [req.session.uid] } }] })) {
  //       //get Lists for Menu were 
  //       let data = await _listRepo.find({
  //         menuId: req.params.id,
  //         // $or: [{ authorId: req.session.uid }, { sharedIds: { $in: [req.session.uid] } }]
  //       })
  //       return res.send(data)
  //     }
  //   }
  //   catch (err) { next(err) }
  // }

  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _menuRepo.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await _menuRepo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      if (data) {
        return res.send(data)
      }
      throw new Error("Invalid Id")
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      await _menuRepo.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      return res.send("Successfully Deleted")
    } catch (error) { next(error) }
  }
}


