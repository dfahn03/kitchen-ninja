import SiteService from '../services/SiteService'
import express from 'express'
import { Authorize } from '../middlewear/authorize'

//import service and create an instance
let _service = new SiteService()
let _serviceRepo = _service.repository


//PUBLIC
export default class SiteController {
  constructor() {
    this.router = express.Router()
      .get('', this.getAll)
      .post('', this.create)
      .use(Authorize.authenticated) //move back to top after admin
      .put('/:id', this.edit)
      // .delete('/:id', this.delete)
      .use(this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }

  async getAll(req, res, next) {
    try {
      let data = await _serviceRepo.find()
      return res.send(data)
    } catch (err) { next(err) }
  }


  async create(req, res, next) {
    try {
      req.body.userId = req.session.uid
      let data = await _serviceRepo.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await _serviceRepo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      if (data) {
        return res.send(data)
      }
      throw new Error("Invalid Id")
    } catch (error) { next(error) }
  }

  // async delete(req, res, next) {
  //   try {
  //     await _ingredientRepo.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
  //     return res.send("Successfully Deleted")
  //   } catch (error) { next(error) }
  // }
}

