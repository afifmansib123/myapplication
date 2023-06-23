import { getToken } from "next-auth/jwt";

const handler = async (req,res) => {
    const session = await getToken({ req, secret: process.env.SECRET })
    if(!session){
        return res.status(401).send('signin required')
    }
res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
}
export default handler