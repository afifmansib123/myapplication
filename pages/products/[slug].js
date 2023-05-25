import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import data from "@/utils/data";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { Store } from "../store";


export default function productscreen(){

    const{state,dispatch} = useContext(Store)


    const {query} = useRouter()
    const {slug} = query


    const allproducts = data.products.find((x)=> x.slug === slug)

    const addtocart = () => {
        const existitem = state.cart.cartitems.find((item)=>item.slug==allproducts.slug)
        const quantity = existitem? existitem.quantity + 1 : 1
        dispatch({type : "ADD_TO_CART", payload: {...allproducts, quantity}})
    }

    console.log(JSON.stringify(state))

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
                <button className="primary-button w-full" style={{color:'blue'}} onClick={addtocart}>add to cart</button>
                <Link legacyBehavior href = "/cartscreen">back to product</Link>
            </div>
            </div>
            </div>
        </Layout>
    )
}