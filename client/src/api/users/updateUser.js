import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from '../axios'

const updateUser = async (inputs) => {
  const res = await axios.put('/api/users', inputs)
  return res.data
}

const useUpdateUser = (profileId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['users', profileId],
    mutationFn: (inputs) => updateUser(inputs),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['users', profileId] }),
  })
}

export default useUpdateUser
