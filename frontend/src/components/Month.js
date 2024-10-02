import { Doughnut } from 'react-chartjs-2';
import getMonthData from "../utils/getMonthData";
import { memo } from 'react';

// Essentials -> green
// Non-essentials -> yellow
// Miscelaneous -> grey
// Savings and Investments -> red

const Month = ({expenses}) => {
    let expenseData = getMonthData(expenses)
    let totalExpenseSum = expenseData.reduce((prev,curr) => {
        return prev+curr
    },0)
    let data = {
        datasets: [{
            data: expenseData,
            backgroundColor: [
                'rgba(0, 100, 0, 0.6)',
                'rgba(255,222,33, 0.6)',
                'rgba(211,211,211, 0.6)',
                'rgba(210,10,46, 0.6)'
            ],
            borderColor: [
                'rgba(0, 100, 0, 1)',
                'rgba(255,222,33, 1)',
                'rgba(211,211,211, 1)',
                'rgba(210,10,46, 1)'
            ],
            borderWidth: 1,
        }],
    } 

    const options = {
        responsive: true,
        plugins: {
            datalabels: {
                display: true,
                color: 'black',
                formatter: function (value) {
                    if (!value)
                        return ""
                    return `${Math.trunc((value/totalExpenseSum)*100)}%`;
                }
            }, 
        }
    }

    return (
        <div className="p-4">
            <h2 className="font-bold text-xl">This Month</h2>
            <div className='flex justify-around'>
                <div style={{position: "relative",width: "200px", height: "200px"}}>
                    <Doughnut data={data} options={options}/>
                </div>
                <div>
                    <div className='flex items-center gap-6 mb-3'>
                        <div className='w-8 h-8 rounded-md' style={{ backgroundColor: "rgba(0, 100, 0, 0.6)"}}>
                        </div>
                        <div>
                            <h5 className='text-sm text-gray-400'>Essentials</h5>
                            <h4 className='text-md text-gray-500'>₹{expenseData[0]}</h4>
                        </div>
                    </div>

                    <div className='flex items-center gap-6 mb-3'>
                        <div className='w-8 h-8 rounded-md' style={{ backgroundColor: "rgba(255,222,33, 0.6)" }}>
                        </div>
                        <div>
                            <h5 className='text-sm text-gray-400'>Non Essential</h5>
                            <h4 className='text-md text-gray-500'>₹{expenseData[1]}</h4>
                        </div>
                    </div>

                    <div className='flex items-center gap-6 mb-3'>
                        <div className='w-8 h-8 rounded-md' style={{ backgroundColor: "rgba(211,211,211, 0.6)" }}>
                        </div>
                        <div>
                            <h5 className='text-sm text-gray-400'>Miscelaneous</h5>
                            <h4 className='text-md text-gray-500'>₹{expenseData[2]}</h4>
                        </div>
                    </div>

                    <div className='flex items-center gap-6'>
                        <div className='w-8 h-8 rounded-md' style={{ backgroundColor: "rgba(210,10,46, 0.6)" }}>
                        </div>
                        <div>
                            <h5 className='text-sm text-gray-400'> Savings and Investments</h5>
                            <h4 className='text-md text-gray-500'>₹{expenseData[3]}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Month)