import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const getComments = async (req, res) => {
  const { postId } = req.query
  if (!postId) {
    return res.status(400).json('Please include a post id in the url query')
  }

  const postComments = await prisma.comment.findMany({
    where: {
      postId: parseInt(postId),
    },
    select: {
      id: true,
      desc: true,
      user: {
        select: {
          name: true,
          profilePic: true,
        },
      },
      createdAt: true,
    },
  })

  res.status(200).json(postComments)
}

export const addComment = async (req, res) => {
  const { postId } = req.query
  const { desc } = req.body
  if (!desc || !postId) {
    return res
      .status(400)
      .json(
        'Please include a description in the req body and a post id in the url query'
      )
  }

  const token = req.cookies.access_token
  if (!token) {
    return res.status(401).json("You're not logged in")
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
    if (err) {
      return res.status(403).json('Token is invalid')
    }

    const newComment = await prisma.comment.create({
      data: {
        desc,
        postId: parseInt(postId),
        userId: userInfo.id,
      },
    })

    res.status(200).json(newComment)
  })
}
