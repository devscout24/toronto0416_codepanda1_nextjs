import React from 'react'
import Checkout from '../../components/checkout'
import Credit from '@/assets/icons/credit.svg';
import Stripe from "@/assets/icons/stripe.svg";
import Paypal from "@/assets/icons/paypal.svg";
import Cash from "@/assets/icons/cash.svg";
import Visa from "@/assets/icons/visa.svg";
import Master from "@/assets/icons/master.svg";

const cards = [
    { id: 2, name: "Stripe", icon: Stripe },
    { id: 3, name: "PayPal", icon: Paypal },
    { id: 4, name: "Cash on Delivery", icon: Cash },
]

export default function PaymentPage() {
    return (
        <section className="section-container w-full space-y-28 pt-10 pb-28">
            <div className="flex flex-col items-start gap-10 md:flex-row">
                <div className="w-full md:w-[70%]">
                    <section className="rounded-2xl text-xl font-medium bg-white p-5">
                        <h1 className='border-b text-xl pb-5'>Select Payment Method</h1>
                        <div className='mt-5'>
                            <h1 className='text-xl'>Recommended methods</h1>                       
                                <div className="gap-5 p-5 rounded-xl mt-2.5 border border-primary/0 hover:border-primary bg-primary/10 cursor-pointer">
                                    <div className='flex justify-between'>
                                        <div className='flex items-center gap-5'>
                                            <Credit />
                                            <span>
                                                <p className='text-lg'>Credit/Debit Card</p>
                                            <p className='text-sm text-neutral-300'>Visa / Mastercard</p>
                                            </span>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <Master />
                                            <Visa />
                                        </div>
                                    </div>
                                </div>
                   
                            <div  className='mt-5'>
                                <h1 className='text-xl'>Other payment methods</h1>
                                <div>
                                {
                                    cards.map(card => (
                                        <div key={card.id} className="flex items-center gap-5 p-5 rounded-xl mt-2.5 bg-accent hover:bg-primary/10 border-accent border hover:border-primary cursor-pointer">
                                            <div className='flex items-center gap-5'>
                                                <card.icon />
                                                <div>
                                                    <p className='text-lg'>{card.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            </div>
                        </div>


                    </section>
                </div>
                <div className="w-full md:w-[30%]">
                    <Checkout
                        title="Place Order"
                        redirectTo="?place-order-modal=place-order"
                    />
                </div>
            </div>
        </section>
    )
}
