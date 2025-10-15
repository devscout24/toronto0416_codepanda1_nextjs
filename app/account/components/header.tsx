import { Button } from '@/components/ui/button'
import { DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { MoreHorizontalIcon } from 'lucide-react'
import React from 'react'
import SideNav from './sideNav'

export default function Header({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex justify-between items-center'>
            <div className='w-full'>
                {children}
            </div>
            <div className='block lg:hidden'>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button className='hover:bg-primary border-primary hover:text-primary-foreground' variant="outline" aria-label="Open menu">
                            <MoreHorizontalIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full p-5" align="end">
                        <SideNav />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
