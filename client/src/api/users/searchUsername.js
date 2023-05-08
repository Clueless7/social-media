import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from '../axios'

const searchUsername = async (inputs) => {
  const res = await axios.post('/api/users/search', inputs)
  return res.data
}

const useSearchUsername = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['users'],
    mutationFn: (inputs) => searchUsername(inputs),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  })
}

export default useSearchUsername
