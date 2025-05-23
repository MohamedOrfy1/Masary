import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart';
const COLORS = ["#2D2A73", "#00B8A9", "#FF6B6B"];

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {
  const balanceData = [
    {name:"Total Baance", amount:totalBalance},
    {name:"Total Income", amount:totalIncome},
    {name:"Total Expense", amount:totalExpense},
  ]

  return  <div className='card'>
    <div className='flex items-center justify-between'>
        <h5 className='text-lg'>
            Finance Overview
        </h5>
    </div>

    <CustomPieChart 
    data={balanceData} 
    label = "Total Balance"
    totalAmount= {`${totalBalance} EGP`}
    colors={COLORS} 
    showTextAnchor
    />
  </div>

}

export default FinanceOverview
