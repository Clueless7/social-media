import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export const getUser = async (req, res) => {
  const { profileId } = req.query
  if (!profileId) {
    return res.status(400).json('Please include profileId in url query')
  }

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(profileId),
    },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      profilePic: true,
      coverPic: true,
      city: true,
      website: true,
      createdAt: true,
    },
  })

  if (!user) {
    return res.status(404).json('User not found')
  }

  res.status(200).json(user)
}

export const updateUser = async (req, res) => {
  const { coverPic, profilePic, name, email, password, website, city } = {
    ...req.body,
  }

  const token = req.cookies.access_token
  if (!token) {
    return res.status(401).json("You're not logged in")
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
    if (err) {
      return res.status(403).json('Token is invalid')
    }

    let hashedPassword
    if (password) {
      hashedPassword = bcrypt.hashSync(password)
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userInfo.id,
      },
      data: {
        coverPic: coverPic || undefined,
        profilePic: profilePic || undefined,
        name: name || undefined,
        password: hashedPassword || undefined,
        email: email || undefined,
        website: website || undefined,
        city: city || undefined,
      },
      select: {
        id: true,
        coverPic: true,
        profilePic: true,
        name: true,
        username: true,
        email: true,
        city: true,
        website: true,
      },
    })

    res.status(200).json(updatedUser)
  })
}

export const getUsers = async (req, res) => {
  const { username } = req.body
  if (!username) {
    return res.status(400).json('Please include username in request body')
  }

  const users = await prisma.user.findMany({
    where: {
      username: {
        contains: username,
      },
    },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      profilePic: true,
      city: true,
      website: true,
    },
  })

  if (!users) {
    return res.status(404).json('No users found')
  }

  res.status(200).json(users)
}
