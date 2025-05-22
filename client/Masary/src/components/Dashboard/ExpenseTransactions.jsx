import moment from 'moment'
import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
const ExpenseTransactions = ({transactions, onSeeMore}) => {
    console.log(transactions);
  return (
    <div  className='card'>
      <div className='flex justify-between items-center'>
        <h5 className='text-lg f'>
            Recent Expense Transactions
        </h5>
        <button onClick={onSeeMore} className='card-btn'>
            See More <LuArrowRight />
        </button>
      </div>
      <div className='mt-6'>
        {transactions?.slice(0, 5).map((expense) => (
            <TransactionInfoCard  
                key={expense._id}
                title={expense.category}
                icon={expense.icon}
                date={ moment(expense.date).format('DD MMM YYYY') }
                amount={expense.amount}
                type='expense'
                hideDeleteBtn
            />
        ))}

      </div>
    </div>
  )
}

export default ExpenseTransactions
