import bcrypt from 'bcryptjs';

const data = {
  Users: [
    {
      name: 'BANK',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Jane',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "stats1-sunmiBKK",
      slug: "item-1",
      price: "200",
      image: '/images/image1.jpeg',
      quantity: 0,
      countinstock: 10,
    },
    {
      name: "stats2-sunmiCH",
      slug: "item-2",
      price: "200",
      image: '/images/image2.jpeg',
      quantity: 0,
      countinstock: 10,
    },
    {
      name: "stats3-sunmiPH",
      slug: "item-3",
      price: "200",
      image: '/images/image3.jpeg',
      quantity: 0,
      countinstock: 10,
    },
    {
      name: "stats4-sunmiPTY",
      slug: "item-4",
      price: "8000",
      image: '/images/image4.png',
      quantity: 0,
      countinstock: 10,
    },

  ]
}

export default data