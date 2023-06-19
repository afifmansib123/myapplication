import Layout from "@/components/Layout";
import React, { useContext, useEffect } from "react";
import CheckoutWizard from "@/components/CheckoutWizard";
import {useForm} from 'react-hook-form'
import { Store } from "./store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function ShippingScreen(){

    const router = useRouter()

    const {
        handleSubmit,
        register,
        formState: {errors},
        setValue,
        getValues,
    }=useForm()
    
    const {state, dispatch} = useContext(Store)
    const {cart} = state
    const {shippingadress} = cart

    useEffect(()=>{
        setValue('fullName', shippingadress.fullName);
        setValue('address', shippingadress.address);
        setValue('city', shippingadress.city);
},[setValue,shippingadress])
    
    

    const submitHandler = ({fullName,address,city}) => {
        dispatch({
            type: "SAVE_ADRESS",
            payload : {fullName,address,city},
        })
        Cookies.set('cart', JSON.stringify({...cart, shippingadress:{fullName,address,city}}))
        router.push('/payment')
    }
    
    return(

        <Layout title="Shipping adress">
            <CheckoutWizard activeStep={1}></CheckoutWizard>
            <form
            className="mx-auto max-w-screen-md"
            onSubmit={handleSubmit(submitHandler )} 
            >
                <h1 className="mb-4 text-xl">Shipping Adress</h1>
                <div className="mb-4">
                    <label>
                        Full Name
                    </label>
                    <input
                    className="w-full"
                    id="fullName"
                    autoFocus
                    {...register('fullName',{required:'please add the full name'})}
                    ></input>
                    {errors.fullName && (
                        <div className="text-red-500">{errors.fullName.message}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label>
                        adress
                    </label>
                    <input
                    className="w-full"
                    id="address"
                    {...register('address',{
                        required:'please add the full name',
                        minLength: {value: 3, message: 'more than 3 chars at least'}
                    })}
                    ></input>
                    {errors.adress && (
                        <div className="text-red-500">{errors.adress.message}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label>
                        city
                    </label>
                    <input
                    className="w-full"
                    id="city"
                    {...register('city',{
                        required:'please enter city',
                    })}
                    ></input>
                    {errors.city && (
                        <div className="text-red-500">{errors.city.message}</div>
                    )}
                </div>
                <div className="mb-4">
                    <button className="primary-button">Next</button>
                </div>
            </form>
        </Layout>
    )
}

ShippingScreen.auth = true