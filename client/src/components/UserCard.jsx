import {
  Avatar,
  Button,
  Divider,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useContext } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { API_BASE_URL as serverUrl } from '../config'
import { AuthContext } from '../context/authContext'

const UserCard = () => {
  const { currentUser, logout } = useContext(AuthContext)

  const handleLogout = async () => {
    try {
      await logout()
    } catch (e) {
      console.warn(e)
    }
  }

  return (
    <Popover>
      <PopoverTrigger>
        <HStack
          px="4"
          py="2"
          borderRadius="md"
          cursor="pointer"
          _hover={{
            background: 'blue.500',
          }}
          spacing="4"
        >
          <Avatar
            name={currentUser.user.name}
            src={`${serverUrl}/${currentUser.user.profilePic}`}
          />
          <Text
            color="white"
            fontSize={['sm', null, 'lg']}
            fontWeight="semibold"
            noOfLines={1}
          >
            {currentUser.user.name}
          </Text>
        </HStack>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>Account Settings</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <VStack divider={<Divider />}>
              <Button
                as={RouterLink}
                to={`/profile/${currentUser.user.id}`}
                colorScheme="facebook"
                variant="link"
              >
                View Profile
              </Button>
              <Button
                colorScheme="facebook"
                variant="link"
                onClick={handleLogout}
              >
                Log out
              </Button>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

export default UserCard
