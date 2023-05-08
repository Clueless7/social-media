import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Grid,
  HStack,
  Heading,
  Image,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { AiOutlineCheck, AiOutlineEdit, AiTwotoneMail } from 'react-icons/ai'
import { HiGlobeAlt } from 'react-icons/hi'
import {
  MdAccountCircle,
  MdLocationOn,
  MdOutlineHourglassFull,
} from 'react-icons/md'
import { useParams } from 'react-router-dom'
import useFollowUser from '../api/relationships/followUser'
import useGetFollowers from '../api/relationships/getProfileFollowers'
import useUnfollowUser from '../api/relationships/unfollowUser'
import useGetUser from '../api/users/getUser'
import EditProfile from '../components/EditProfile'
import { API_BASE_URL as serverUrl } from '../config/index'
import { AuthContext } from '../context/authContext'
import formatForHuman from '../utils/formatForHuman'
import timeFromNow from '../utils/fromNow'

const Profile = () => {
  const [imgError, setImgError] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { profileId } = useParams()
  const { currentUser } = useContext(AuthContext)
  const { error, isLoading, data: profileDetails } = useGetUser(profileId)
  const getFollowers = useGetFollowers(profileId)
  const followUserMutation = useFollowUser(profileId)
  const unfollowUserMutation = useUnfollowUser(profileId)

  const handleFollow = () => {
    followUserMutation.mutate({
      profileId,
      inputs: {
        followerUserId: currentUser.user.id,
      },
    })
  }

  const handleUnfollow = () => {
    unfollowUserMutation.mutate({
      profileId,
    })
  }

  if (error) {
    return error.response.data
  }

  if (isLoading) {
    return <Spinner color="blue.400" />
  }

  return (
    <>
      <EditProfile
        isOpen={isOpen}
        onClose={onClose}
        profileDetails={profileDetails}
      />
      <Flex w="100%" direction="column" gap="8">
        <VStack spacing="4">
          {currentUser.user.coverPic && (
            <Image
              w="100%"
              maxH="300px"
              objectFit="cover"
              src={`${serverUrl}/${profileDetails?.coverPic}`}
              onError={(e) => {
                e.target.src = '/logo.png'
              }}
            />
          )}

          <Flex
            p="4"
            direction="column"
            alignItems="center"
            gap={['3', null, '8']}
          >
            {(!currentUser.user.profilePic || imgError) && (
              <Avatar
                size="2xl"
                name={profileDetails?.name}
                src={`${serverUrl}/${profileDetails?.profilePic}`}
                aspectRatio="1/1"
                borderRadius="full"
                objectFit="cover"
                shadow="xl"
              />
            )}
            {!imgError && (
              <Image
                src={`${serverUrl}/${profileDetails?.profilePic}`}
                w="100%"
                maxW="250px"
                borderRadius="full"
                objectFit="cover"
                shadow="xl"
                aspectRatio="1/1"
                alt={`${profileDetails?.name}'s profile picture`}
                onError={() => setImgError(true)}
              />
            )}
            <Heading size="2xl" textAlign="center">
              {profileDetails?.name}
            </Heading>
            <Text fontSize={['lg', null, 'xl']} color="gray.600">
              {profileDetails?.username}
            </Text>
          </Flex>
        </VStack>

        <Grid placeItems="center">
          {currentUser.user.id !== +profileId ? (
            getFollowers.data?.includes(currentUser.user.id) ? (
              <Button
                colorScheme="facebook"
                variant="outline"
                leftIcon={<AiOutlineCheck />}
                isLoading={unfollowUserMutation.isLoading}
                size={['sm', null, 'md']}
                onClick={handleUnfollow}
              >
                Following
              </Button>
            ) : (
              <Button
                colorScheme="facebook"
                size={['sm', null, 'md']}
                isLoading={followUserMutation.isLoading}
                onClick={handleFollow}
              >
                Follow
              </Button>
            )
          ) : (
            <Button
              colorScheme="facebook"
              size={['sm', null, 'md']}
              leftIcon={<AiOutlineEdit />}
              onClick={onOpen}
            >
              Edit
            </Button>
          )}
        </Grid>

        <Flex justifyContent="center" alignItems="center">
          <Card w="80%" p="4" fontSize={['sm', null, 'md']}>
            <CardHeader>
              <Heading textAlign="center" size="md">
                User Details
              </Heading>
            </CardHeader>

            <CardBody>
              <Grid
                gridTemplateColumns="repeat(auto-fit, minmax(175px, 1fr))"
                gap="8"
              >
                <HStack>
                  <MdAccountCircle />
                  <Text noOfLines={1}>{profileDetails?.username}</Text>
                </HStack>

                <HStack>
                  <AiTwotoneMail />
                  <Text noOfLines={1}>{profileDetails?.email}</Text>
                </HStack>

                {profileDetails?.city && (
                  <HStack>
                    <MdLocationOn />
                    <Text noOfLines={1}>{profileDetails?.city}</Text>
                  </HStack>
                )}

                {profileDetails?.website && (
                  <HStack>
                    <HiGlobeAlt />
                    <Text noOfLines={1}>{profileDetails?.website}</Text>
                  </HStack>
                )}

                <HStack>
                  <MdOutlineHourglassFull />
                  <Text
                    noOfLines={1}
                    title={formatForHuman(profileDetails?.createdAt)}
                  >
                    Became member for{' '}
                    {timeFromNow(profileDetails?.createdAt, true)}
                  </Text>
                </HStack>
              </Grid>
            </CardBody>
          </Card>
        </Flex>
      </Flex>
    </>
  )
}

export default Profile
