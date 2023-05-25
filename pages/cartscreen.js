import { useContext } from "react";
import { Store } from "./store";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";

export default function Cartscreen () {
    const {state, dispatch} = useContext(Store)

    const {cart: {cartitems}} = state

    console.log('putkimari')
    console.log(JSON.stringify(cartitems))

    return(
        <Layout>
            <div className="grid md:grid-cols-5 md:gap-5">
            <div className="overflow-x-auto md: col-span-3">
            <table className="min-w-full">
                <thead className="border-b">
                    <tr>
                    <th>Item</th>
                    <th>Item</th>
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
              width={600}
              height={600}
            />
            &nbsp;{item.name}
          </a>
        </Link>
      </td>
      <td className="p-5 text-right">{item.quantity}</td>
      <td className="p-5 text-right">{item.price}</td>
    </tr>
  ))}
</tbody>
            </table>
            </div>
            </div>
        </Layout>
    )
}