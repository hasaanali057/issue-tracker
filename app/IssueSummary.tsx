import { Card, Flex, Text } from '@radix-ui/themes'
import React from 'react'
import { Status } from '@prisma/client'
import Link from 'next/link'

interface Props{
  open: number
  inProgress: number
  closed: number
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {

  const containers: {label: string, value: number, status: Status}[] = [
    { label: 'Open Issues', value: open, status: 'OPEN'},
    { label: 'In Progress Issues', value: inProgress, status: 'IN_PROGRESS'},
    { label: 'Closed Issues', value: closed, status: 'CLOSED'}
  ]
  return (
    <Flex gap='4'>
      {containers.map(container => (
        <Card key={container.label}>
          <Flex direction='column' gap='1'>
            <Link 
              href={`/issues/list?status=${container.status}`}
              className='text-sm font-medium'
            >{container.label}</Link>
          </Flex>
          <Text size='5' className='font-bold'>{container.value}</Text>
        </Card>
      ))}
    </Flex>
  )
}

export default IssueSummary