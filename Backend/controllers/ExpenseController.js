const xlsx = require('xlsx');
const Expense = require('../models/Expense');


// Add Expense
exports.addExpense = async (req, res) =>{
    const userId = req.user.id;

    try {
        const {icon, category, amount, date} = req.body;

        if (!category || !amount || !date){
            return res.status(400).json({message: "All fields are required"});
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date,
        })
        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
}

// get Expense
exports.getAllExpense = async(req, res) =>{
    const userId = req.user.id;

    try {
        const expense = await Expense.find({userId}).sort({date: -1});
        res.json(expense);
    } catch (error) {
         res.status(500).json({message:"Internal Server Error"})
    }
}

exports.deleteExpense = async(req, res) =>{
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id)
        // console.log(income)
        res.status(200).json({message: "Successfully deleted"});
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}

// Download Income Excel
exports.downloadExpenseExcel = async(req, res) =>{
    const userId = req.user.id;

    try {
        const expense = await Expense.find({userId}).sort({date: -1});

        // Prepare data for excel
        const data = expense.map((item) =>({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }))

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb,ws, "Income");
        xlsx.writeFile(wb, 'income_details.xlsx');
        res.download('income_details.xlsx')
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}

