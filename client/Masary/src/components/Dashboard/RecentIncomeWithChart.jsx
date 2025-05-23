import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

const COLORS = ['#2D2A73', '#00B8A9', '#F4C95D', '#FF6B6B'];

const RecentIncomeWithChart = ({data, totalIncome}) => {
    const [chartdata, setChartdata] = useState([]);
    const prepareChartData = () => {
        const dataArr = data.map((item) => ({
            name: item?.source,
            amount: item?.amount,
        }));
        setChartdata(dataArr);
    }
    

    useEffect(() => {
        prepareChartData();
        return () => {}
    }, [data]); 
  return (
    <div className='card'>
      <div className='flex justify-between items-center '>
        <h5 className='text-lg'>
            Recent Income
        </h5>
      </div>
      <CustomPieChart
       data={chartdata} 
       label = "Total Income"
       totalAmount={totalIncome}
       showTextAnchor
       colors={COLORS}
       />

    </div>
  )
}

export default RecentIncomeWithChart
