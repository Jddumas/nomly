const mongoose = require('mongoose');
const cities = require('./cities');
const {descriptors, cuisine} = require('./seedHelpers');
const Restaurant = require('../models/restaurant');

// to seed server
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }

// const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/nom-ly';

// mongoose.connect(dbUrl, {
// });
// to seed server

mongoose.connect('mongodb://localhost:27017/nom-ly', {
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Restaurant.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10)
        const r = new Restaurant({
            // author: '613b74893a2de4cc631755d4',
            author: '6142ac0b1b3950f90d51de5d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(cuisine)} ${sample(descriptors)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni fugit est sapiente consequuntur rem dolorem dolore sequi tenetur libero, autem voluptas aut quibusdam modi eos exercitationem nemo ratione nisi tempore totam velit explicabo eaque ducimus. Nesciunt dolores quaerat soluta eos cum, eius suscipit eaque eum voluptatibus nihil.',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
              ]

            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dtgroug0w/image/upload/v1631641074/Nomly/mvez2oelxhii8qfj8s39.jpg',
                  filename: 'Nomly/mvez2oelxhii8qfj8s39',
                },
                {
                  url: 'https://res.cloudinary.com/dtgroug0w/image/upload/v1631641075/Nomly/e75zql0vllviekcecgko.jpg',
                  filename: 'Nomly/e75zql0vllviekcecgko',
                }
              ]
        })
        await r.save();
    }}

seedDB().then(() => {
    mongoose.connection.close();
})