import { Box, Flex, HStack, Image } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import SearchProfile from './SearchProfile'
import UserCard from './UserCard'

const NavBar = () => {
  return (
    <Box
      as="nav"
      h="64px"
      background="facebook.400"
      shadow="sm"
      position="sticky"
      top="0"
      zIndex="10"
    >
      <Flex h="100%" alignItems="center" justifyContent="space-between">
        <HStack px="4">
          <Link to="/">
            <Image w="64px" src="/logo.png" alt="Logo" />
          </Link>

          <Box w={['100%', '100%', '500px']}>
            <SearchProfile />
          </Box>
        </HStack>

        <Box maxW={['200px', null, '300px']}>
          <UserCard />
        </Box>
      </Flex>
    </Box>
  )
}

export default NavBar
