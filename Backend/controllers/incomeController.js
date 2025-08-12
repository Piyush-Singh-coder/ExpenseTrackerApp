const xlsx = require('xlsx');
const Income = require('../models/Income');


// Add Income
exports.addIncome = async(req, res) =>{
    const userId = req.user.id;

    try {
        const {icon, source, amount, date} = req.body;

        if (!source || !amount || !date){
            return res.status(400).json({message: "All fields are required"});
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        })

        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}


// Get Income
exports. getAllIncome = async(req, res) =>{
    const userId = req.user.id;
    try {
        const income = await Income.find({userId}).sort({date: -1});
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}


// Delete Income
exports.deleteIncome = async(req, res) =>{
    try {
        const income = await Income.findByIdAndDelete(req.params.id)
        // console.log(income)
        res.status(200).json({message: "Successfully deleted"});
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}


// Download Income Excel
exports.downloadIncomeExcel = async(req, res) =>{
    const userId = req.user.id;

    try {
        const income = await Income.find({userId}).sort({date: -1});

        // Prepare data for excel
        const data = income.map((item) =>({
            Source: item.source,
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

