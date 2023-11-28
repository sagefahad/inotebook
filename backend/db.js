const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/inotebook";

const connectToMongo =()=>{
    main()
    .then(()=>{console.log('Connected to Mongo Successfully!')})
    .catch(err => console.log(err));
}

async function main() {
  await mongoose.connect(mongoURI);
}

module.exports = connectToMongo;