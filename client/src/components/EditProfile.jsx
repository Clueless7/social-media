import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from '../api/axios'
import useUpdateUser from '../api/users/updateUser'
import { AuthContext } from '../context/authContext'

const EditProfile = ({ isOpen, onClose, profileDetails }) => {
  const [coverPic, setCoverPic] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const { updateUser } = useContext(AuthContext)
  const updateUserMutation = useUpdateUser(`${profileDetails?.id}`)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const upload = async (file) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await axios.post('/api/upload', formData)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  const onSubmit = async (data) => {
    let coverPicURL = profileDetails.coverPic
    let profilePicURL = profileDetails.profilePic

    try {
      coverPicURL = coverPic ? await upload(coverPic) : coverPicURL
      profilePicURL = profilePic ? await upload(profilePic) : profilePicURL
    } catch (e) {
      console.log(e)
    }

    try {
      const res = await updateUserMutation.mutateAsync({
        coverPic: coverPicURL,
        profilePic: profilePicURL,
        ...data,
      })

      updateUser(res)
    } catch (e) {
      console.log(e)
    }

    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <VStack>
              <FormControl>
                <Input
                  type="file"
                  name="coverPic"
                  id="coverPic"
                  accept="image/*"
                  onChange={(e) => setCoverPic(e.target.files[0])}
                />
              </FormControl>

              <FormControl>
                <Input
                  type="file"
                  name="profilePic"
                  id="profilePic"
                  accept="image/*"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input type="text" id="name" {...register('name')} />
                <FormErrorMessage></FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input type="email" id="email" {...register('email')} />
                <FormErrorMessage></FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  type="password"
                  id="password"
                  {...register('password')}
                />
                <FormErrorMessage></FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="website">Website</FormLabel>
                <Input type="text" id="website" {...register('website')} />
                <FormErrorMessage></FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="city">City</FormLabel>
                <Input type="text" id="city" {...register('city')} />
                <FormErrorMessage></FormErrorMessage>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              colorScheme="facebook"
              mr={3}
              isLoading={isSubmitting}
            >
              Save
            </Button>
            <Button colorScheme="facebook" variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default EditProfile
