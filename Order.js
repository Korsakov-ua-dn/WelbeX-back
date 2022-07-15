import mongoose from 'mongoose';

const Order = new mongoose.Schema({
    date: {type: String, required: true},
    name: {type: String, required: true},
    amount: {type: Number, required: true},
    distance: {type: Number, required: true},
})

export default mongoose.model('welbex', Order);