import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import data from "@/utils/data";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { Store } from "../store";
import Router from "next/router";
import db from "@/utils/db";
import Product from "@/models/Product";
import axios from "axios";
import { toast } from "react-toastify";


export default function productscreen(props){

    const {allproducts} = props
    const{state,dispatch} = useContext(Store)
    const router = useRouter()

    if(!allproducts){
        return (
            <div>item not found</div>
        )
    }
    

    const addtocart = async() => {
        const existitem = state.cart.cartitems.find((item)=>item.slug==allproducts.slug)
        const quantity = existitem? existitem.quantity + 1 : 1


        const {data} = await axios.get(`/api/products/${allproducts._id}`)

        if(data.countinstock < quantity){
            return toast.error('item out of stock')
        }

        dispatch({type : "ADD_TO_CART", payload: {...allproducts, quantity}})
        Router.push('/cartscreen')
    }

    

    return(
        <Layout title = {allproducts.name}>
            <div className="py-2">
            <h1>{allproducts.name}</h1>
            <Link href = "/">back to product</Link>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-3">
            <div className="md:col-span-2">
                <Image
                src = {allproducts.image}
                width={600}
                height={400}
                ></Image>
            </div>
            
            <div className="card p-5 justify-right">
            <div>
                <ul>
                    <li>{allproducts.name}</li>

                </ul>
            </div>

            <div className="card p-5 ml-auto ">
                <div>{allproducts.name}</div>
                <div>{allproducts.quantity}</div>
                <button className="primary-button w-full" style={{color:'blue'}} onClick={addtocart}>CHECK</button>
                <Link legacyBehavior href = "/cartscreen">back to product</Link>
            </div>
            </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context){
    const {params} = context
    const {slug} = params

    await db.connect()
    const product = await Product.findOne({slug}).lean()
    await db.disconnect()
    return{
        props: {
            allproducts: product?db.convertDocToObj(product):null
        }
    }
}