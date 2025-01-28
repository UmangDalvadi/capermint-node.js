import mongoose from 'mongoose';

const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    parentCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: null,
    },
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

export default Category;
