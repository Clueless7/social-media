import express from 'express'
import { getUser, updateUser, getUsers } from '../controllers/user.js'

const router = express.Router()

router.get('/', getUser)
router.put('/', updateUser)
router.post('/search', getUsers)

export default router
