import express from 'express'
import client from '../configs/db'
import ContentController from '../controllers/Content'
import { authProtect } from '../middlewares'
import ContentRepository from '../repositories/Content'
import ContentService from '../services/Content'

const contentRepo = new ContentRepository(client)
const contentService = new ContentService(contentRepo)
const contentController = new ContentController(contentService)

const contentRouter = express.Router()

contentRouter.post('/', authProtect.hasCredential)
contentRouter.patch('/:id', authProtect.hasCredential)
contentRouter.delete('/:id', authProtect.hasCredential)

contentRouter.get('/', contentController.getAll)
contentRouter.post('/', contentController.create)
contentRouter.get('/:id', contentController.getOne)
contentRouter.patch('/:id', contentController.update)
contentRouter.delete('/:id', contentController.delete)

export default contentRouter
