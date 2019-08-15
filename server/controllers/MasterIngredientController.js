import MasterIngredientService from '../services/MasterIngredientService'
import express from 'express'
import { Authorize } from '../middlewear/authorize'

//import service and create an instance
let _service = new MasterIngredientService()
let _ingredientRepo = _service.repository


//PUBLIC
export default class MasterIngredientController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('', this.getAll)
      .get('/:category', this.getByCategory)
      // .post('', this.create)
      // .put('/:id', this.edit)
      // .delete('/:id', this.delete)
      .use(this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }

  async getAll(req, res, next) { //get YOUR Ingredient
    try {
      //only gets Ingredient by user who is logged in
      let data = await _ingredientRepo.find()
      return res.send(data)
    } catch (err) { next(err) }
  }

  async getByCategory(req, res, next) {
    try {
      let data = await _ingredientRepo.find({ category: req.params.category })
      return res.send(data)
    } catch (error) {
      next(error)

    }
  }
  // async create(req, res, next) {
  //   try {
  //     req.body.authorId = req.session.uid
  //     let data = await _ingredientRepo.create(req.body)
  //     return res.status(201).send(data)
  //   } catch (error) { next(error) }
  // }

  // async edit(req, res, next) {
  //   try {
  //     let data = await _ingredientRepo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
  //     if (data) {
  //       return res.send(data)
  //     }
  //     throw new Error("Invalid Id")
  //   } catch (error) { next(error) }
  // }

  // async delete(req, res, next) {
  //   try {
  //     await _ingredientRepo.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
  //     return res.send("Successfully Deleted")
  //   } catch (error) { next(error) }
  // }
}


