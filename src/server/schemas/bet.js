import mongoose from "mongoose"

const Schema = mongoose.Schema;

const betSchema = new Schema({
    betAmount: {
        type: Number,
        required: true
    },
    startValue: {
        type: Number,
        required: true
    },
    endValue: {
        type: Number,
        required: true
    },
    betDirection: {
        type: String,
        required: true
    },
    player: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Bet = mongoose.model('Bet', betSchema);

export default Bet;