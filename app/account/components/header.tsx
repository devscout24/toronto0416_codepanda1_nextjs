import { Button } from '@/components/ui/button'
import { DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { MoreHorizontalIcon } from 'lucide-react'
import React from 'react'
import SideNav from './sideNav'

export default function Header({children} : {children: React.ReactNode}) {
  return (
    <div className='flex justify-between items-center'>
        <div>
            {children}
        </div>
        <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="default" aria-label="Open menu">
                        <MoreHorizontalIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full p-5" align="end">
                    <SideNav/>
                </DropdownMenuContent>
            </DropdownMenu>
    </div>
  )
}
