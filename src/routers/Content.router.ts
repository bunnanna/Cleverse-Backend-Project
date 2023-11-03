import express from 'express'
import client from '../configs/db'
import ContentController from '../controllers/Content/Content.controller'
import authProtectMiddleware from '../middlewares/protectedMiddleware'
import ContentRepository from '../repositories/Content'
import ContentService from '../services/Content'

const contentRepo = new ContentRepository(client)
const contentService = new ContentService(contentRepo)
const contentController = new ContentController(contentService)

const contentRouter = express.Router()

contentRouter.get('/', contentController.getAll)
contentRouter.post('/', authProtectMiddleware, contentController.create)
contentRouter.get('/:id', contentController.getOne)
contentRouter.patch('/:id', authProtectMiddleware, contentController.update)
contentRouter.delete('/:id', authProtectMiddleware, contentController.delete)

export default contentRouter
