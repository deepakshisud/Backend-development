const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/relationshipDB', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connection open");
    })
    .catch(err => {
        console.log("Error detected");
        console.log(err);
    })

const userSchema = new mongoose.Schema( {
    first: String,
    last: String,
    addresses: [
        {
            _id:{id: false}, 
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
})


const User = mongoose.model('User', userSchema);

const makeUser = async() => {
    const u = new User({
        first: "Adit",
        last: "Bhatia"
    })
    u.addresses.push({
        street: "20 Kamal Enclave",
        city: "Kapurthala",
        state: "Punjab",
        country: "India"
    })
    const res = await u.save()
    console.log(res);
}


const addAddress = async(id) => {
    const user = await User.findById(id);
    user.addresses.push({
        street: "Novina Cloth House",
        city: "Palampur",
        state: "Himachal Pradesh",
        country: "India"
    
    })
    const res = await user.save();
    console.log(res);
}

addAddress('601f72341282c13b44a14166');