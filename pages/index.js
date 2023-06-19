import Layout from '@/components/Layout'
import Productitem from '@/components/ProductItem'
import db from '@/utils/db'
import Product from '@/models/Product'
import { useContext, useState } from 'react'
import { Store } from './store'
import {toast} from 'react-toastify'
import axios from 'axios'


export default function Home({products}) {
  //connected23
  const {state,dispatch} = useContext(Store)
  const {cart} = state

  const addtocart = async(products,event) => {
    event.preventDefault()
    const existitem = cart.cartitems.find((item)=>item.slug==products.slug)
    const quantity = existitem? existitem.quantity + 1 : 1


    const {data} = await axios.get(`/api/products/${products._id}`)

    if(data.countinstock < quantity){
        return toast.error('item out of stock')
    }

    dispatch({type : "ADD_TO_CART", payload: {...products, quantity}})
    return toast.success('item added to cart')
    
}
  
  return (
    <>
      <Layout title = "home page">
       <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-3">
        {products.map((product)=>(
          <Productitem products={product} key={product.slug} addtocart={addtocart}></Productitem>
        ))}
        
       </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps(){
  await db.connect()
  const products = await Product.find().lean()
  await db.disconnect()
  return{
    props: {
      products : products.map(db.convertDocToObj)
    }
  }
}
