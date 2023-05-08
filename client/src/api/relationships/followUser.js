import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from '../axios'

const followUser = async (profileId, inputs) => {
  const res = await axios.post(
    `/api/relationships?profileId=${profileId}`,
    inputs
  )
  return res.data
}

const useFollowUser = (profileId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['follows', profileId],
    mutationFn: ({ profileId, inputs }) => followUser(profileId, inputs),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['follows', profileId] }),
  })
}

export default useFollowUser
