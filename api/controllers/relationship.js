import jwt from 'jsonwebtoken'

import { prisma } from '../index.js'

export const getRelationships = async (req, res) => {
  const { profileId } = req.query
  if (!profileId) {
    return res.status(400).json('Please include profileId in the url query')
  }

  const followers = await prisma.relationship.findMany({
    where: {
      followedUserId: parseInt(profileId),
    },
  })

  const followersUserIdArray = followers.map(
    (follower) => follower.followerUserId
  )

  res.status(200).json(followersUserIdArray)
}

export const addRelationships = (req, res) => {
  const { profileId } = req.query
  if (!profileId) {
    return res.status(400).json('Please include a profileId in the url query')
  }

  const token = req.cookies.access_token
  if (!token) {
    return res.status(401).json("You're not logged in")
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
    if (err) {
      return res.status(403).json('Token is invalid')
    }

    try {
      const newFollow = await prisma.relationship.create({
        data: {
          followerUserId: userInfo.id,
          followedUserId: parseInt(profileId),
        },
      })

      res.status(200).json(newFollow)
    } catch (e) {
      res
        .status(500)
        .json('You might have tried to follow an already followed user')
    }
  })
}

export const deleteRelationships = (req, res) => {
  const { profileId } = req.query
  if (!profileId) {
    return res.status(400).json('Please include a profileId in the url query')
  }

  const token = req.cookies.access_token
  if (!token) {
    return res.status(401).json("You're not logged in")
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
    if (err) {
      return res.status(403).json('Token is invalid')
    }

    try {
      const deletedFollow = await prisma.relationship.delete({
        where: {
          followerUserId_followedUserId: {
            followerUserId: userInfo.id,
            followedUserId: parseInt(profileId),
          },
        },
      })

      res.status(200).json(deletedFollow)
    } catch (e) {
      res
        .status(500)
        .json('You might have tried to unfollow an already unfollowed user')
    }
  })
}
