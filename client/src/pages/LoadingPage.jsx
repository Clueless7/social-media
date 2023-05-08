import { Grid, Spinner } from '@chakra-ui/react'
import React from 'react'

const LoadingPage = () => {
  return (
    <Grid w="100vw" h="100vh" p="4" placeItems="center">
      <Spinner color="blue.400" boxSize="200px" thickness="8px" />
    </Grid>
  )
}

export default LoadingPage
