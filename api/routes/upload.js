import express from 'express'
import { upload, uploadFile } from '../controllers/upload.js'

const router = express.Router()

router.post('/', upload.single('file'), uploadFile)

export default router
