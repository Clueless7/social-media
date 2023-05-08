import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const SearchProfile = () => {
  const [searchInput, setSearchInput] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchInput) return
    navigate(`/search/${searchInput}`)
    setSearchInput('')
  }

  return (
    <Box as="form" onSubmit={handleSearch}>
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<AiOutlineSearch />} />
        <Input
          bg="white"
          placeholder="Search username"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </InputGroup>
    </Box>
  )
}

export default SearchProfile
