import DashboardService from '../services/DashboardService'
import express from 'express'
import { Authorize } from '../middlewear/authorize'

let _service = new DashboardService()
let _dashboardRepo = _service.repository

export default class DashboardController {

  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated) //move back to top after functioning
      .get('', this.getAll)
      .get('/:id', this.getById)
      .delete('/:id', this.delete)
      .post('', this.create)
      .put('/:id', this.edit)
      .use(this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'no such route' })
  }

  async getAll(req, res, next) {
    try {
      let siteId = req.query.siteId
      let data = await _dashboardRepo.find({ siteId, authorId: req.session.uid })
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async getById(req, res, next) {
    try {
      let siteId = req.query.siteId
      let data = await _dashboardRepo.findOne({ siteId, _id: req.params.id, authorId: req.session.uid })
      return res.send(data)
    } catch (error) { next(error) }
  }

  async create(req, res, next) {
    try {
      let siteId = req.query.siteId
      req.body.authorId = req.session.uid
      let data = await _dashboardRepo.create({ siteId }, req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let siteId = req.query.siteId
      let data = await _dashboardRepo.findOneAndUpdate({ siteId, _id: req.params.id, authorId: req.session.uid }, req.body, { new: true })
      if (data) {
        return res.send(data)
      }
      throw new Error("invalid id")
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      let siteId = req.query.siteId
      await _dashboardRepo.findOneAndRemove({ siteId, _id: req.params.id, authorId: req.session.uid })
      return res.send("successfully deleted")
    } catch (error) { next(error) }
  }
}