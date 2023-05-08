import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const getPosts = (req, res) => {
  const token = req.cookies.access_token
  if (!token) {
    return res.status(401).json("You're not logged in")
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
    if (err) {
      return res.status(403).json('Token is invalid')
    }

    // Get all the current user's followed user ids
    const followedUsers = await prisma.relationship.findMany({
      where: {
        followerUserId: userInfo.id,
      },
    })

    // Add the user's id to followed user ids
    const followedUsersAndSelf = [
      ...followedUsers.map((relationship) => relationship.followedUserId),
      userInfo.id,
    ]

    // Get all current user posts and followed users posts
    const userPosts = await prisma.post.findMany({
      where: {
        userId: {
          in: followedUsersAndSelf,
        },
      },
      select: {
        id: true,
        desc: true,
        img: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            profilePic: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (!userPosts) {
      return res.status(404).json('Post does not exist')
    }

    res.status(200).json(userPosts)
  })
}

export const addPost = (req, res) => {
  const { desc, img } = req.body
  if (!desc && !img) {
    return res.status(400).json('Please include a description or an image')
  }

  const token = req.cookies.access_token
  if (!token) {
    return res.status(401).json("You're not logged in")
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
    if (err) {
      return res.status(403).json('Token is invalid')
    }

    // Create a post with the current user's id as the userId
    const newPost = await prisma.post.create({
      data: {
        desc,
        img,
        userId: userInfo.id,
      },
    })

    res.status(201).json(newPost)
  })
}
