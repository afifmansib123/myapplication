import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import data from "@/utils/data";

export default function productscreen(){
    const {query} = useRouter()
    const {slug} = query

    const allproducts = data.products.find((x)=> x.slug === slug)

    return(
        <Layout title = {allproducts.name}>
            <h1>{allproducts.name}</h1>
            <p> amra chole eshechi </p>
        </Layout>
    )
}