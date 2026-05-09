import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    color: { type: String, required: true },
    icon: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

export default Category;