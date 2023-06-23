import Order from "@/models/Order"
import db from "@/utils/db"
import { getToken } from "next-auth/jwt"
const handler = async (req, res) => {
    const session = await getToken({ req, secret: process.env.SECRET })
    if(!session){
        return res.status(401).send('signin required')
    }

await db.connect()
const order = await Order.findById(req.query.id)
if(order){
    if(order.isPaid){
        return res.status(400).send({message : 'Error , order is paid already'})
    }
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
        id : req.body.id,
        status : req.body.status,
        email_adress : req.body.email_adress,
    }
    const paidOrder = await order.save()
    await db.disconnect()
    res.send({message:'order paid successfully', order: paidOrder})
}else{
    await db.disconnect()
    res.status(404).send({message: 'error : order not found '})
}
}
export default handler 