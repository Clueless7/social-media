import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import useSearchUsername from '../api/users/searchUsername'
import { API_BASE_URL as serverUrl } from '../config'

const SearchedProfiles = () => {
  const { username } = useParams()
  const {
    isLoading,
    error,
    mutateAsync: searchUsername,
    data: users,
  } = useSearchUsername()

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await searchUsername({ username })
    }
    fetchUsers()
  }, [username])
  return (
    <VStack p="4" spacing="16">
      <Heading>Searches</Heading>
      <VStack spacing="8">
        {error ? (
          <p>Something went wrong</p>
        ) : isLoading ? (
          <Spinner color="blue.400" />
        ) : users?.length === 0 ? (
          <p>No result</p>
        ) : (
          users?.map((user) => (
            <LinkBox key={user.id} w={['100%', null, '80ch']}>
              <Card
                direction={['column', null, 'row']}
                alignItems="center"
                _hover={{
                  background: 'facebook.50',
                }}
              >
                <CardHeader>
                  <LinkOverlay as={RouterLink} to={`/profile/${user.id}`}>
                    <Avatar
                      size="2xl"
                      name={user.name}
                      src={`${serverUrl}/${user.profilePic}`}
                      aspectRatio="1/1"
                      borderRadius="full"
                      objectFit="cover"
                      shadow="md"
                    />
                  </LinkOverlay>
                </CardHeader>

                <CardBody>
                  <Flex direction="column" gap="4">
                    <Heading size="md">{user.name}</Heading>

                    <Flex direction="column" gap="1">
                      <Text maxW="100%" noOfLines={1}>
                        {user.username}
                      </Text>
                      <Text noOfLines={1}>{user.email}</Text>
                      <Text noOfLines={1}>{user.city}</Text>
                      <Text noOfLines={1}>{user.website}</Text>
                    </Flex>
                  </Flex>
                </CardBody>
              </Card>
            </LinkBox>
          ))
        )}
      </VStack>
    </VStack>
  )
}

export default SearchedProfiles
