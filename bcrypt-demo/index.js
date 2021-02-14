const bcrypt = require('bcrypt');


const hashPassword = async(pw) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pw,salt);
    console.log(salt);
    console.log(hash);
}

const login = async(pw, hashpw) => {
    const result = await bcrypt.compare(pw, hashpw);
    if(result) {
        console.log("Logged in");
    }
    else {
        console.log("Authentacation fauled");
    }
}

//hashPassword('monkey');
login('monkey','$2b$10$Xi4YbFBIwCNMTpKj0cQRReHBIWVcvfWOK5YOuQROWcw17225zuflG' )