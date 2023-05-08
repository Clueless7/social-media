import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Flex,
  FormControl,
  HStack,
  Input,
  Link,
  Spinner,
  Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { Link as RouterLink } from 'react-router-dom'
import useAddComment from '../api/comments/addComment'
import useGetComments from '../api/comments/getComments'
import { API_BASE_URL as serverUrl } from '../config/index'

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState('')
  const { error, isLoading, data } = useGetComments(postId)
  const addComment = useAddComment(postId)

  const handleChange = (e) => {
    setDesc(e.target.value)
  }

  const handleAddComment = async (e) => {
    e.preventDefault()

    try {
      const res = await addComment.mutateAsync({
        postId: postId,
        inputs: {
          desc,
        },
      })
    } catch (e) {
      console.log(e)
    }

    setDesc('')
  }

  return (
    <Box p="4">
      {error ? (
        <p>Something went wrong</p>
      ) : isLoading ? (
        <Spinner color="blue.400" />
      ) : (
        <Flex direction="column" gap="4">
          <HStack
            as="form"
            justifyContent="space-between"
            spacing="4"
            onSubmit={handleAddComment}
          >
            <FormControl>
              <Input
                type="text"
                placeholder="Comment"
                value={desc}
                onChange={handleChange}
              />
            </FormControl>

            <ButtonGroup>
              <Button
                size="xs"
                colorScheme="facebook"
                variant="ghost"
                leftIcon={<AiOutlineSend />}
                isDisabled={!desc}
                isLoading={addComment.isLoading}
                onClick={handleAddComment}
              >
                Comment
              </Button>
            </ButtonGroup>
          </HStack>

          {!data.length ? (
            'No comments'
          ) : (
            <Flex direction="column" gap="2">
              {data.map((comment) => (
                <Card key={comment.id} px="8" direction="row" fontSize="sm">
                  <Avatar
                    mt="6"
                    size="sm"
                    name={comment.user.name}
                    src={`${serverUrl}/${comment.user.profilePic}`}
                  />
                  <CardBody>
                    <Flex direction="column" gap="1">
                      <Link as={RouterLink} to={`/profile/${comment.user.id}`}>
                        <Text as="b">{comment.user.name}</Text>
                      </Link>
                      {/* <Text
                      color="gray.500"
                      fontSize="xs"
                      title={formatForHuman(comment.createdAt)}
                    >
                      {timeFromNow(comment.createdAt)}
                    </Text> */}
                      <Text>{comment.desc}</Text>
                    </Flex>
                  </CardBody>
                </Card>
              ))}
            </Flex>
          )}
        </Flex>
      )}
    </Box>
  )
}

export default Comments
