import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  HStack,
  Heading,
  Input,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Login = () => {
  const [err, setErr] = useState(null)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      await login(data)
      navigate('/')
    } catch (e) {
      setErr(e.response?.data)
    }
  }

  return (
    <Grid w="100%" h="100vh" p="4" placeItems="center" bg="facebook.500">
      <Card p="8" w={['80%', null, '500px']} h="540px" shadow="xl">
        <CardHeader>
          <Heading textAlign="center" color="facebook.500">
            Login
          </Heading>
        </CardHeader>

        <CardBody>
          <Flex h="100%" alignItems="center" justifyContent="center">
            <VStack
              as="form"
              w="100%"
              spacing="4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl isInvalid={errors.username}>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  {...register('username', {
                    required: 'Please enter a username',
                  })}
                />
                {errors.username && (
                  <FormErrorMessage>{errors.username.message}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={errors.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  {...register('password', {
                    required: 'Please enter a password',
                  })}
                />
                {errors.password && (
                  <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                )}
              </FormControl>

              <ButtonGroup colorScheme="facebook">
                <Button type="submit" isLoading={isSubmitting}>
                  Submit
                </Button>
              </ButtonGroup>

              {/* TODO: Make a error message component */}
              <Box>{err && <Text color="red">{err}</Text>}</Box>

              <HStack>
                <Text>
                  Don't have an account?{' '}
                  <Link color="blue.500" as={RouterLink} to="/register">
                    Register
                  </Link>
                </Text>
              </HStack>
            </VStack>
          </Flex>
        </CardBody>
      </Card>
    </Grid>
  )
}

export default Login
