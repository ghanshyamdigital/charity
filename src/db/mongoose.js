import mongoose from 'mongoose';

mongoose.Promise = global.Promise
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/charity';

mongoose.connect(DB_URL).then(
    ()=> {console.log("Database Connected..")},
    err => {console.log("err",err)}
);

export default mongoose;
