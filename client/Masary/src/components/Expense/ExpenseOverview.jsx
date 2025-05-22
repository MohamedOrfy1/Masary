import React, { useEffect, useState } from 'react'
import {LuPlus} from 'react-icons/lu'
import { prepareExpensesBarChartData, prepareExpensesLineChartData } from '../../utils/helper';
import CustomLineChart from '../Charts/CustomLineChart';
const ExpenseOverview = ({transactions, onAddExpense}) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
       const result = prepareExpensesLineChartData(transactions);
       setChartData(result);

       return () => {};
    }, [transactions]);

     
  return <div className='card'>
      <div className='flex justify-between items-center'>
        <div className=''>  
            <h5 className='text-lg'>
                Expense Overview
            </h5>
            <p className='text-sm text-gray-400 mt-0.5'>
                Track your expenses and manage your budget
            </p>
        </div>
        <button
            className='add-btn'
            onClick={onAddExpense}
        >
            <LuPlus className='text-lg '/>
            Add Expense
        </button>
      </div>
      <div className='mt-10'>
        <CustomLineChart
            data={chartData}
        />
      </div>
    </div>
}

export default ExpenseOverview
