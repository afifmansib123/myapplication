import Layout from '@/components/Layout'
import data from '../utils/data'
import Head from 'next/head'
import Productitem from '@/components/ProductItem'


export default function Home() {
  return (
    <>
      <Layout title = "home page">
       <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-3">
        {data.products.map((product)=>(
          <Productitem products={product} key={product.slug}></Productitem>
        ))}
        
       </div>
      </Layout>
    </>
  )
}
