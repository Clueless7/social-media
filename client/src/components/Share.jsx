import {
  Box,
  Button,
  Card,
  Flex,
  Image,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import axios from '../api/axios'
import useAddPost from '../api/posts/addPost'

const Share = () => {
  const [desc, setDesc] = useState('')
  const [file, setFile] = useState('')
  const [err, setErr] = useState(null)
  const addPost = useAddPost()

  const handleDescChange = (e) => {
    setDesc(e.target.value)
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const upload = async () => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await axios.post('/api/upload', formData)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  const handleAddPost = async (e) => {
    e.preventDefault()

    if (!desc && !file) return

    let imgUrl = ''

    if (file) {
      imgUrl = await upload()
    }

    try {
      const res = await addPost.mutateAsync({ desc, img: imgUrl })
    } catch (e) {
      setErr(e.response.data)
    }

    setDesc('')
    setFile('')
    setErr(null)
  }

  return (
    <Card w="100%" maxW="900px" p="8" mx="auto" bg="facebook.50">
      <VStack as="form" spacing="4" onSubmit={handleAddPost}>
        <Box w="100%">
          <Textarea
            name="desc"
            id="desc"
            placeholder="What's on your mind?"
            rows="7"
            resize="none"
            bg="white"
            value={desc}
            onChange={handleDescChange}
          ></Textarea>
        </Box>

        <Flex
          direction={['column', null, 'row']}
          w="100%"
          gap={file ? '4' : '0'}
          justifyContent="space-between"
          alignItems="center"
        >
          <Input
            type="file"
            name="img"
            id="img"
            bg="white"
            accept="image/*"
            onChange={handleFileChange}
          />
          <Box>
            {file && (
              <Image
                src={URL.createObjectURL(file)}
                alt=""
                boxSize="150px"
                borderRadius="2xl"
                objectFit="cover"
              />
            )}
          </Box>
        </Flex>

        <Box>
          <Button
            colorScheme="facebook"
            type="submit"
            leftIcon={<AiOutlineSend />}
            isLoading={addPost.isLoading}
          >
            Share
          </Button>
        </Box>

        <Box>{err && <Text>{err}</Text>}</Box>
      </VStack>
    </Card>
  )
}

export default Share
