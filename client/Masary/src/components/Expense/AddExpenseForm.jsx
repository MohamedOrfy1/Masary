import React, { useState } from 'react'
import Input from '../inputs/Input'

const AddExpenseForm = ({onAddExpense}) => {
    const [expense, setExpense] = useState({
        category: '',
        amount: '',
        date: '',
        icon: '',
    });

    const handleChange = (key, value) => setExpense({...expense, [key]: value});
    
  return <div>
    <Input
        value={expense.category}
        onChange={e => handleChange('category', e.target.value)}
        label='Category'
        placeholder='Enter Category'
        type="text"
    />
    <Input
        value={expense.amount}
        onChange={e => handleChange('amount', e.target.value)}
        label='Amount'
        placeholder='Enter Amount'
        type="number"
    />

    <Input
        value={expense.date}
        onChange={e => handleChange('date', e.target.value)}
        label='Date'
        placeholder='Select Date'
        type="date"
    />

    <div className='flex justify-end mt-6'>
        <button
            type='button'
            className='add-btn add-btn-fill'
            onClick={() => onAddExpense(expense)}
        >
            Add Expense
        </button>
    </div>
  </div>
}

export default AddExpenseForm
