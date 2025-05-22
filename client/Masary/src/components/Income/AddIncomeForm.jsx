import React, { useState } from 'react'
import Input from '../inputs/Input';

const AddIncomeForm = ({onAddIncome}) => {
    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: "",
    });

    const handleChange = (key, value) => {
        setIncome({...income, [key]: value});
    };

  return (
    <div>
        <Input
        value={income.source}
        onChange={(e) => handleChange("source", e.target.value)}
        label="Income Source"
        placeholder="Enter Income Source"
        type="text"
        /> 
        <Input
        value={income.amount}
        onChange={(e) => handleChange("amount", e.target.value)}
        label="Income Amount"
        placeholder="Enter Income Amount"
        type="number"
        />
        <Input
        value={income.date}
        onChange={(e) => handleChange("date", e.target.value)}
        label="Income Date"
        placeholder="Enter Income Date"
        type="date"
        />

        <div className='flex justify-end mt-6'>
            <button
                type='button'
                className='add-btn add-btn-fill'
                onClick={() => onAddIncome(income)}
            >
                Add Income
            </button>
        </div>
    </div>
  )
}

export default AddIncomeForm
