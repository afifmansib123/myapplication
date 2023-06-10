import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export default function unauthorized () {

    const router = useRouter()
    const {message} = router.query

    return(

    <Layout title = "unauthorized">
        <h1 className="text-xl">Access Denied</h1>
        {message && <div className="mb-4">{message}</div>}
    </Layout>
    ) 
}