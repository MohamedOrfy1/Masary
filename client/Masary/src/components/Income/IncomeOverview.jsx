import React, { useEffect, useState } from 'react'
import {LuPlus} from 'react-icons/lu'
import { prepareIncomeBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';
const IncomeOverview = ({transactions, onAddIncome}) => {
    const [chartData, setChartData] = useState([])

    console.log('IncomeOverview transactions:', transactions);

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions)
        setChartData(result)
        console.log('IncomeOverview chartData:', result);
        return () => {};
    }, [transactions]);
  return (
    <div className='card'>
        <div className='flex justify-between items-center'>
           <div className=''>
                <h5 className='text-lg'>
                    Income Overview
                </h5>
                <p className='text-xs text-gray-400 mt-0.5'>
                    Track your income sources and categories
                </p>
           </div>
           <button className='add-btn' onClick={onAddIncome}>
                <LuPlus className='text-lg' />
                Add Income
           </button>
        </div>
        <div className='mt-10'>
            <CustomBarChart data={chartData} />
        </div>
    </div>
  )
}

export default IncomeOverview
