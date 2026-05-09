import Transaction from '../models/transaction.model.js';
import Logger from '../config/logger.js';

export const createTransaction = async (req, res) => {
    try {
        const { type, amount, title, category } = req.body;

        const transaction = new Transaction({
            user: req.user.userId,
            type,
            amount,
            title,
            category
        })

        await transaction.save();

        res.status(201).json({ success: true, message: 'Transaction created successfully', transaction });

    } catch(err) {
        Logger.error('Error in createTransaction', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.userId});
        res.status(200).json({ success: true, transactions });
         
    } catch(err) {
        Logger.error('Transaction Get Error:', err);
        res.status(500).json({ success: false, message: "Internal Server Error"})
    }
};


export const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const transactionDelete = await Transaction.findByIdAndDelete(id);

    } catch(err) {
        Logger.error('Transaction Delete Error:', err);
        res.status(500).json({ success: false, message: "Internal Server Error"})
    }
};