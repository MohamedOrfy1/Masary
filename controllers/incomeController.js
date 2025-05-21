const xlsx = require('xlsx');
const Income = require('../models/Income');
const User = require('../models/User');

// Add Income Source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, source, amount, date } = req.body;

        // Validation: Check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (error) {
        res.status(500).json({ 
            message: "Server Error",
            error: error.message 
        });
    }
};

exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 }); // Get most recent first
        res.status(200).json({
            success: true,
            count: income.length,
            data: income
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Server Error",
            error: error.message // Include error details
        });
    }
};

// Delete Income Record
exports.deleteIncome = async (req, res) => {
    try {
        const deletedIncome = await Income.findByIdAndDelete(req.params.id);
        
        if (!deletedIncome) {
            return res.status(404).json({ 
                success: false,
                message: "Income record not found" 
            });
        }

        res.status(200).json({ 
            success: true,
            message: "Income deleted successfully",
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

exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    // Prepare data for Excel
    const data = income.map((item) => ({
    Source: item.source,
    Amount: item.amount,
    Date: item.date,
    }));
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book.append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, 'income_details.xlsx');
    res.download('income_details.xlsx');
    } catch (error) {
    res.status(500).json({ message: "Server Error" });
    }

    };
