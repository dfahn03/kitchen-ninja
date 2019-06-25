import RecipeService from '../services/RecipeService'
import express from 'express'
import { Authorize } from '../middlewear/authorize'

//import service and create an instance
let _service = new RecipeService()
let _recipeRepo = _service.repository


//PUBLIC
export default class RecipeController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('', this.getAll)
      // .get('/shared', this.getSharedRecipe)
      .get('/:id', this.getById)
      // .get('/:id/lists', this.getRecipeLists)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
      .use(this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }

  async getAll(req, res, next) { //get YOUR Recipe
    try {
      //only gets Recipe by user who is logged in
      let siteId = req.query.siteId
      let data = await _recipeRepo.find()
      return res.send(data)
    } catch (err) { next(err) }
  }

  // async getSharedRecipe(req, res, next) { //get Recipe SHARED with you
  //   try {
  //     //only gets Recipe if user who is logged in matches a shared Id
  //     let data = await _recipeRepo.find({ sharedIds: { $in: [req.session.uid] } })
  //     return res.send(data)
  //   }
  //   catch (err) { next(err) }
  // }

  async getById(req, res, next) {
    try {
      let data = await _recipeRepo.findOne()
      return res.send(data)
    } catch (error) { next(error) }
  }
  // async getRecipeLists(req, res, next) {
  //   try {
  //     if (await _recipeRepo.find({ $or: [{ authorId: req.session.uid }, { sharedIds: { $in: [req.session.uid] } }] })) {
  //       //get Lists for Recipe were 
  //       let data = await _listRepo.find({
  //         recipeId: req.params.id,
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
      let data = await _recipeRepo.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await _recipeRepo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      if (data) {
        return res.send(data)
      }
      throw new Error("Invalid Id")
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      await _recipeRepo.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      return res.send("Successfully Deleted")
    } catch (error) { next(error) }
  }
}


