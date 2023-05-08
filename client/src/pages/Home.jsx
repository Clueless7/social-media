import { Flex } from '@chakra-ui/react'
import Posts from '../components/Posts'
import Share from '../components/Share'

const Home = () => {
  return (
    <Flex p="4" direction="column" gap="8">
      <Share />
      <Posts />
    </Flex>
  )
}

export default Home
