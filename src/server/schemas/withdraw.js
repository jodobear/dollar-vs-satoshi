import mongoose from "mongoose"

const Schema = mongoose.Schema;

const withdrawSchema = new Schema({
    withdrawalId: {
        type: String
    },
    userId: {
        type: String
    }
});

const Withdraw = mongoose.model('Withdraw', withdrawSchema);

export default Withdraw;