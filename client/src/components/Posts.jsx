import { Box, Flex, Spinner } from '@chakra-ui/react'
import useGetPosts from '../api/posts/getPosts'
import Post from './Post'

const Posts = () => {
  const { isLoading, error, data: posts } = useGetPosts()

  return (
    <Box>
      {error ? (
        'Something went wrong'
      ) : isLoading ? (
        <Spinner color="blue.400" />
      ) : (
        <Flex direction="column" gap="4">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </Flex>
      )}
    </Box>
  )
}

export default Posts
