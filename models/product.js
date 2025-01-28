import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
