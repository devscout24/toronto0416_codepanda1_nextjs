import React from 'react'
import successIcon from '@/assets/svgs/success.png'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function SuccessModal() {
    return (
        <div className='flex flex-col items-center'>
            <Image src={successIcon} height={140} width={140} alt='success' />
            <div className='my-10'>
                <h1 className='text-3xl font-medium'>Your Order Placed</h1>
                <p className='text-lg text-neutral-400'>Successfully your order placed</p>
            </div>
            <Link className='w-full' href={'/'}><Button className='w-full'>Continue Browsing</Button></Link>
        </div>
    )
}
