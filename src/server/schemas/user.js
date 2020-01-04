import mongoose from "mongoose"

const Schema = mongoose.Schema;
const userSchema = new Schema({
    userName: {
        type: String,
        unique: true
    },
    userKey: {
        type: String,
        unique: true
    },
    userBalance: {
        type: Number
    }
});

const User = mongoose.model( 'User', userSchema);

export default User;