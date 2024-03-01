'use client'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import 'react-loading-skeleton/dist/skeleton.css'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {

  const { data: users, error, isLoading  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000,
    retry: 3
  })

  const assignIssue = async (userId: string) => {
    try {
      await axios.patch('/api/issues/'+issue.id, {
        assignedToUserId: userId || null
      })
    } catch (error) {
      toast.error('changes couldnt be saved')
    }
  }
  
  return (
    <>
      <Select.Root onValueChange={ assignIssue }>
        <Select.Trigger placeholder='Assign...' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {users?.map(user => <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)}
          </Select.Group>
        </Select.Content> 
      </Select.Root>
      <Toaster />
    </>
  )
}

export default AssigneeSelect