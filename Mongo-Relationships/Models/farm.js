const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDB', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connection open");
    })
    .catch(err => {
        console.log("Error detected");
        console.log(err);
    })


const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }

})

const Product = mongoose.model('Product', productSchema);

// Product.insertMany([
//     {name:'Tomato', price:20, season: 'Summer'},
//     {name:'Oranges', price:90, season: 'Winter'},
//     {name:'Cauliflower', price:35, season: 'Spring'},
// ])

const farmSchema = new mongoose.Schema({
    name: String,
    city: String,
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
})

const Farm = mongoose.model('Farm', farmSchema);

// const makeFarm = async() => {
//     const farm = new Farm({name: "Health and Wealth", city:"Palampur"});
//     const tomato = await Product.findOne({name: 'Tomato'});
//     farm.products.push(tomato);
//     await farm.save()
//     console.log(farm);
// }

// makeFarm();


const addProduct = async() => {
    const farm = await Farm.findOne({name:'Health and Wealth'});
    const orange = await Product.findOne({name:'Oranges'});
    farm.products.push(orange);
    farm.save();
}

Farm.findOne({name: "Health and Wealth"})
    .populate('products')
    .then(farm=> console.log(farm));

