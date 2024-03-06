import React from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

export default function LoadingButton() {
  return (
    <Button disabled>
      <Loader2 className='mr-2 w-4 h-4 animate-spin' />
    </Button>
  )
}
