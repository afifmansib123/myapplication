import { getToken } from 'next-auth/jwt';
import Order from '../../../models/Order';
import db from '../../../utils/db';

const handler = async (req, res) => {
  const session = await getToken({ req, secret: process.env.SECRET })
  if (!session) {
    return res.status(401).send('signin required');
  }

  
  await db.connect();
  const newOrder = new Order({
    ...req.body,
    session: session._id,
  });

  const order = await newOrder.save();
  res.status(201).send(order);
};
export default handler;