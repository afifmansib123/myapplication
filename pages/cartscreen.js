import { useContext } from "react";
import { Store } from "./store";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

function Cartscreen () {

  const myrouter = useRouter()

    const {state, dispatch} = useContext(Store)

    const {cart: {cartitems}} = state

    console.log('putkimari')
    console.log(JSON.stringify(cartitems))

    const removeFromCart = (item) => {
      dispatch({ type: "DELETE_FROM_CART", payload: item });
    };

    const updatecartHandler = async(item, qty) => {
      const quantity = Number(qty)
      const {data} = await axios.get(`/api/products/${item._id}`)
      if(data.countinstock < quantity){
        return toast.error('item out of stock')
      }
      dispatch({type:"ADD_TO_CART",payload:{...item,quantity : quantity}})
      toast.success('item updated in cart')
    }

    const totalprice = 0

    return(
        <Layout>
            <div className="grid md:grid-cols-5 md:gap-5">
            <div className="overflow-x-auto md: col-span-3">
            <table className="min-w-full">
                <thead className="border-b">
                    <tr>
                    <th className="p-5 text-right">Item</th>
                    <th className="p-5 text-right">Item</th>
                    <th>Item</th>
                    <th>Item</th>
                    </tr>
                </thead>
                <tbody>
  {cartitems.map((item) => (
    <tr key={item.slug} className="border-b">
      <td>
        <Link legacyBehavior href={`/products/${item.slug}`}>
          <a className="flex items-center">
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
            />
            &nbsp;{item.name}
          </a>
        </Link>
      </td>
      <td className="p-5 text-right">
      <select value={item.quantity} onChange={(e)=>updatecartHandler(item,e.target.value)}>
      {[...Array(item.countinstock).keys()].map((x)=><option key={x+1} value={x+1}>{x+1}</option>)}
      </select>
      </td>
      <td className="p-5 text-right">{item.price}</td>
      <td className="text-right"><button onClick={()=>removeFromCart(item)}>X</button></td>
      
    </tr>
  ))}
  
</tbody>
<tfoot className="border-b">
  subtotal : {cartitems.reduce((a,c)=>a+c.quantity*c.price,0)}
  <button type="button" class="btn btn-primary" 
  
    onClick={()=>myrouter.push('login?redirect=/shipping')}

  >Checkout</button>
</tfoot>
            </table>
            </div>
            </div>
        </Layout>
    )
}

export default dynamic(()=>Promise.resolve(Cartscreen),{ssr:false})