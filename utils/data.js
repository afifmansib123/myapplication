import bcrypt from 'bcryptjs'

const data = {
    users : [
        {
            name : "afif",
            email : "afifmansib123@gmail.com",
            password : bcrypt.hashSync('123456'),
            isAdmin : true,
        },
        {
            name : "zian",
            email : "zian123@gmail.com",
            password : bcrypt.hashSync('123456'),
            isAdmin : false,
        },
    ],
    products : [
        {
            name : "rockthenight",
            slug : "item-1",
            price:"200",
            image: '/images/image1.jpeg',
            quantity : 0,
            countinstock : 10,
        },
        {
            name : "rockthenight2",
            slug : "item-2",
            price:"200",
            image: '/images/image2.jpeg',
            quantity : 0,
            countinstock : 10,
        },
        {
            name : "rockthenight3",
            slug : "item-3",
            price:"200",
            image: '/images/image3.jpeg',
            quantity : 0,
            countinstock : 10,
        },
    ]
}

export default data