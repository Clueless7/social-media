import { Grid, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const NotFound = () => {
  return (
    <Grid w="100vw" h="100vh" p="4" placeItems="center">
      <VStack textAlign="center">
        <Heading color="facebook.500" size="4xl">
          404
        </Heading>
        <Text fontSize="3xl">Page Not Found</Text>
      </VStack>
    </Grid>
  )
}

export default NotFound
