import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  HStack,
  Image,
  Link,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { Link as RouterLink } from 'react-router-dom'
import useGetLikes from '../api/likes/getLikes'
import useHandleLike from '../api/likes/handleLike'
import { API_BASE_URL as serverUrl } from '../config/index'
import { AuthContext } from '../context/authContext'
import formatForHuman from '../utils/formatForHuman'
import timeFromNow from '../utils/fromNow'
import Comments from './Comments'

const Post = ({ post }) => {
  const [showComment, setShowComment] = useState(false)
  const { currentUser } = useContext(AuthContext)

  const { error, isLoading, data: likes } = useGetLikes(post.id)
  const likeMutation = useHandleLike(post.id)

  const toggleShowComments = () => {
    setShowComment((prev) => !prev)
  }

  const handleLike = () => {
    likeMutation.mutate(likes.includes(currentUser.user.id))
  }

  return (
    <Card w={['100%', null, '80ch']} p="4" mx="auto">
      <CardHeader>
        <HStack spacing="3">
          <Avatar
            name={post.user.name}
            src={`${serverUrl}/${post.user.profilePic}`}
          />
          <Box>
            <Link as={RouterLink} to={`/profile/${post.user.id}`}>
              <Text as="b">{post.user.name}</Text>
            </Link>
            <Text
              color="gray.500"
              fontSize="sm"
              title={formatForHuman(post.createdAt)}
            >
              {timeFromNow(post.createdAt)}
            </Text>
          </Box>
        </HStack>
      </CardHeader>

      <CardBody>
        <Flex direction="column" gap="2">
          {post.desc && <Text>{post.desc}</Text>}
          {post.img && (
            <Image
              w="100%"
              maxW="300px"
              src={`${serverUrl}/${post.img}`}
              alt=""
              loading="lazy"
              objectFit="contain"
              alignSelf="center"
              onError={(e) => {
                e.target.src = '/logo.png'
              }}
            />
          )}
        </Flex>
      </CardBody>

      <CardFooter>
        <Flex w="100%" alignItems="center" justifyContent="space-between">
          <HStack>
            {likeMutation.isLoading ? (
              <Spinner color="blue.400" size="lg" />
            ) : likes?.includes(currentUser.user.id) ? (
              <AiFillLike
                fontSize="2rem"
                color="#3182CE"
                cursor="pointer"
                onClick={handleLike}
              />
            ) : (
              <AiOutlineLike
                fontSize="2rem"
                cursor="pointer"
                onClick={handleLike}
              />
            )}
            <Text>
              {likes?.length}{' '}
              {likes?.length > 1 || likes?.length <= 0 ? 'Likes' : 'Like'}
            </Text>
          </HStack>
          <Text
            as="u"
            textUnderlineOffset="2px"
            cursor="pointer"
            onClick={toggleShowComments}
          >
            {showComment ? 'Hide comments' : 'Show comments'}
          </Text>
        </Flex>
      </CardFooter>

      {showComment && <Comments postId={post.id} />}
    </Card>
  )
}

export default Post
