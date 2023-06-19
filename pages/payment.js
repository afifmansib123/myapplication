import CheckoutWizard from "@/components/CheckoutWizard";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Store } from "./store";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function PaymentScreen(){


    const [selectedpaymentmethod, setselectedpaymentmethod] = useState('')

    const router = useRouter()


    const {state, dispatch} = useContext(Store)
    const {cart} = state
    const {shippingadress, paymentMethod} = cart

    const submitHandler = (e) => {
        e.preventDefault()
        if(!selectedpaymentmethod){
            return toast.error('payment method required ')
        }
        dispatch({type: "SAVE_PAYMENT_METHOD", payload : selectedpaymentmethod })
        Cookies.set('cart',
        JSON.stringify({...cart, paymentMethod:selectedpaymentmethod})
        )
        router.push('/placeorder')
    }

    useEffect(()=>{
        if(!shippingadress.adress){
            return router.push('/shipping')
        }
        setselectedpaymentmethod(paymentMethod || '')
    },[paymentMethod,router,shippingadress.adress])

    

    
     return(
        <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl">Payment Method</h1>
        {['PayPal', 'Bikash', 'QR_PAY'].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={payment}
              type="radio"
              checked={selectedpaymentmethod === payment}
              onChange={() => setselectedpaymentmethod(payment)}
            />

            <label className="p-2" htmlFor={payment}>
              {payment}
            </label>
          </div>
        ))}
        <div className="mb-4 flex justify-between">
          <button
            onClick={() => router.push('/shipping')}
            type="button"
            className="default-button"
          >
            Back
          </button>
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
     )
}


PaymentScreen.auth = true;