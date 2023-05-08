import dotenv from 'dotenv'
dotenv.config()

import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

import authRoutes from './routes/auth.js'
import commentRoutes from './routes/comments.js'
import likeRoutes from './routes/likes.js'
import postRoutes from './routes/posts.js'
import relationshipRoutes from './routes/relationships.js'
import uploadRoutes from './routes/upload.js'
import userRoutes from './routes/users.js'

const PORT = process.env.PORT || 8282

const app = express()
app.use(morgan('dev'))
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
)
app.use(express.static('tmp/uploads'))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/likes', likeRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)
app.use('/api/relationships', relationshipRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/', (req, res) => res.send('Hello from express'))

app.listen(PORT, () => console.log(`Server running at port ${PORT}`))
