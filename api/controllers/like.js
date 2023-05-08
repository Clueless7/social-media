import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const getLikes = async (req, res) => {
  const { postId } = req.query
  if (!postId) {
    return res.status(400).json('Please include a post id in the url query')
  }

  const likes = await prisma.like.findMany({
    where: {
      postId: parseInt(postId),
    },
    select: {
      userId: true,
    },
  })

  const likesUserIdArray = likes.map((like) => like.userId)

  res.status(200).json(likesUserIdArray)
}

export const addLikes = (req, res) => {
  const { postId } = req.query
  if (!postId) {
    return res.status(400).json('Please include a post id in the url query')
  }

  const token = req.cookies.access_token
  if (!token) {
    return res.status(401).json("You're not logged in")
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
    if (err) {
      return res.status(403).json('Token is invalid')
    }

    const newLike = await prisma.like.create({
      data: {
        postId: parseInt(postId),
        userId: userInfo.id,
      },
    })

    res.status(200).json(newLike)
  })
}

export const deleteLikes = (req, res) => {
  const { postId } = req.query
  if (!postId) {
    return res.status(400).json('Please include a post id in the url query')
  }

  const token = req.cookies.access_token
  if (!token) {
    return res.status(401).json("You're not logged in")
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
    if (err) {
      return res.status(403).json('Token is invalid')
    }

    const unlikedPost = await prisma.like.deleteMany({
      where: {
        postId: {
          equals: parseInt(postId),
        },
        userId: {
          equals: userInfo.id,
        },
      },
    })

    res.status(200).json(unlikedPost)
  })
}
