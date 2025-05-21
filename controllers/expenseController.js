const xlsx = require('xlsx');
const Expense = require('../models/Expense');
const User = require('../models/User');

// Add Expense Source
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, category, amount, date } = req.body;

        // Validation: Check for missing fields
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ 
            message: "Server Error",
            error: error.message 
        });
    }
};

exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 }); // Get most recent first
        res.status(200).json({
            success: true,
            count: expense.length,
            data: expense
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Server Error",
            error: error.message // Include error details
        });
    }
};

// Delete Expense Record
exports.deleteExpense = async (req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
        
        if (!deletedExpense) {
            return res.status(404).json({ 
                success: false,
                message: "Expense record not found" 
            });
        }

        res.status(200).json({ 
            success: true,
            message: "Expense deleted successfully",
            deletedId: req.params.id
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Server Error",
            error: error.message 
        });
    }
};

exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    // Prepare data for Excel
    const data = expense.map((item) => ({
    category: item.category,
    Amount: item.amount,
    Date: item.date,
    }));
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book.append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, 'expense.xlsx');
    res.download('expense.xlsx');
    } catch (error) {
    res.status(500).json({ message: "Server Error" });
    }

    };
