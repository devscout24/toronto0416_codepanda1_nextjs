import React from 'react'
import Checkout from '../../components/checkout'
import credit from '@/assets/icons/credit.svg';
import stripe from "@/assets/icons/stripe.svg";
import paypal from "@/assets/icons/paypal.svg";
import cash from "@/assets/icons/cash.svg";

const cards = [
    { id: 1, name: "Credit/Debit Card", description: "Credit/Debit Card", icon: credit },
    { id: 2, name: "Stripe", icon: stripe },
    { id: 3, name: "PayPal", icon: paypal },
    { id: 4, name: "Cash on Delivery", icon: cash },
]

export default function PaymentPage() {
    return (
        <section className="section-container w-full space-y-28 pt-10 pb-28">
            <div className="flex flex-col items-start gap-10 md:flex-row">
                <div className="w-full md:w-[70%]">
                    <section className="rounded-2xl text-xl font-medium bg-white p-5">
                        <h1 className='border-b pb-5'>Select Payment Method</h1>
                        <div className='mt-5'>
                            <h1 className=''>Recommended methods</h1>
                            <div>
                                {
                                    cards.map(card => (
                                        <div key={card.id} className="flex items-center gap-5 p-5 rounded-xl mt-5 bg-accent hover:bg-primary/10 cursor-pointer">
                                            <div className='flex items-center gap-5'>
                                                <card.icon />
                                                <div>
                                                    <p>{card.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>


                    </section>
                </div>
                <div className="w-full md:w-[30%]">
                    <Checkout
                        title="Proceed to Pay"
                        redirectTo=""
                    />
                </div>
            </div>
        </section>
    )
}
