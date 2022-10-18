import express, { Request, Response }from 'express'
import { createSessionHandler } from '../controllers/session.controller'

const sessionRouter = express.Router()

sessionRouter.post('/', createSessionHandler)

export default sessionRouter