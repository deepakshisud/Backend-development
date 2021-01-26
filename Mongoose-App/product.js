const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connection open");
    })
    .catch(err => {
        console.log("Error detected");
        console.log(err);
    })

const productSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        min: [0,'Price must be positive']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: {
        type: [String]
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
});


productSchema.methods.greet = function() {
    console.log("hello")
};

const Product = mongoose.model('Product', productSchema);


const findProduct = async() => {
    const foundProduct = await Product.findOne({name: 'Mountain Bike'});
    foundProduct.greet();
}

findProduct();



// const bike = new Product( {
//     name: 'Mountain Bike',
//     price: 2000,
//     categories: ['cycling']
// });

// bike.save()
// Product.findOneAndUpdate({name:'Mountain Bike'}, {price: -100}, {new: true, runValidators: true})
//     .then( data => {
//         console.log("It worked");
//         console.log(data);
//     })
//     .catch( err => {
//         console.log("Error encountered")
//         console.log(err)
//     })
