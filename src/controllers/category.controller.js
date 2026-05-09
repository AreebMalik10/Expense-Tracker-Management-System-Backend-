import Category from '../models/category.model.js';
import Logger from '../config/logger.js';

export const createCategory = async (req, res) => {
    try {
        const { name, type, color, icon } = req.body;

        if(!name || !type ) {
            return res.status(400).json({ message: 'Name and type are required' });
        }

        const category = new Category({
            name, 
            type, 
            color,
            icon,
            user: req.user.userId   
        });

        await category.save();

        res.status(201).json({ success: true, message: 'Category created successfully', category });
         
    } catch (err) {
        logger.error('Error in createCategory', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ user: req.user.userId });
        res.status(200).json({ success: true, categories });

    } catch (err) {
        logger.error('Error in getCategories:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type, color, icon } = req.body;

        const category = await Category.findOneAndUpdate (
            { _id: id, user: req.user.userId },
            { name, type, color, icon },
            { new: true }
        );

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        res.status(200).json({ success: true, message: 'Category updated successfully', category });

    } catch (err) {
        logger.error('Error in updateCategory', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findOneAndDelete({ _id: id, user: req.user.userId });

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        res.status(200).json({ success: true, message: 'Category deleted successfully' });

    } catch (err) {
        logger.error('Error in deleteCategory:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}