import InventoryService from '../services/InventoryService'
import express from 'express'
import { Authorize } from '../middlewear/authorize'

//import service and create an instance
let _service = new InventoryService()
let _inventoryRepo = _service.repository


//PUBLIC
export default class InventoryController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('', this.getAll)
      // .get('/shared', this.getSharedInventory)
      .get('/:id', this.getById)
      // .get('/:id/lists', this.getInventoryLists)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
      .use(this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }

  async getAll(req, res, next) { //get YOUR Inventory
    try {
      //only gets Inventory by user who is logged in
      let data = await _inventoryRepo.find()
      return res.send(data)
    } catch (err) { next(err) }
  }

  // async getSharedInventory(req, res, next) { //get Inventory SHARED with you
  //   try {
  //     //only gets Inventory if user who is logged in matches a shared Id
  //     let data = await _inventoryRepo.find({ sharedIds: { $in: [req.session.uid] } })
  //     return res.send(data)
  //   }
  //   catch (err) { next(err) }
  // }

  async getById(req, res, next) {
    try {
      let data = await _inventoryRepo.findOne()
      return res.send(data)
    } catch (error) { next(error) }
  }
  // async getInventoryLists(req, res, next) {
  //   try {
  //     if (await _inventoryRepo.find({ $or: [{ authorId: req.session.uid }, { sharedIds: { $in: [req.session.uid] } }] })) {
  //       //get Lists for Inventory were 
  //       let data = await _listRepo.find({
  //         inventoryId: req.params.id,
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
      let data = await _inventoryRepo.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await _inventoryRepo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      if (data) {
        return res.send(data)
      }
      throw new Error("Invalid Id")
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      await _inventoryRepo.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      return res.send("Successfully Deleted")
    } catch (error) { next(error) }
  }
}


