import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { prisma } from '../index.js'

export const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json('Please enter a valid username and password')
  }

  // Check if user exists
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(404).json('Invalid username or password')
  }

  // Check if password is correct
  const passwordIsMatching = bcrypt.compareSync(password, user.password)

  if (!passwordIsMatching) {
    return res.status(400).json('Wrong username or password')
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
  const { password: userPassword, ...returnedUser } = user

  res
    .cookie('access_token', token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production' ? true : false,
    })
    .status(200)
    .json({
      user: returnedUser,
    })
}

export const register = async (req, res) => {
  const { username, email, name, password } = req.body
  if (!username || !email || !name || !password) {
    return res.status(400).json('Please enter valid inputs')
  }

  // Check if user exists
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  })

  if (user) {
    return res.status(409).json('User already exists')
  }

  // Create a new user
  const hashedPassword = bcrypt.hashSync(password)
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      name,
      password: hashedPassword,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  })

  return res.status(200).json({
    message: 'User has been created',
    data: newUser,
  })
}

export const logout = async (req, res) => {
  res
    .clearCookie('access_token', {
      secure: true,
      sameSite: 'none',
    })
    .status(200)
    .json('User has been logged out')
}
