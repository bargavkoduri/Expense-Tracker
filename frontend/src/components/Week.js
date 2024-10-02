import getWeekData from "../utils/getWeekData"
import { memo } from "react"
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const Week = ({expenses}) => {
    const [labels,expenseData] = getWeekData(expenses)

    console.log(expenseData)

    const data = {
        labels,
        datasets: [
            {
                data: expenseData[0],
                backgroundColor: 'rgba(0, 100, 0, 0.6)'
            },
            {
                data: expenseData[1],
                backgroundColor: 'rgba(255,222,33, 0.6)'
            },
            {
                data: expenseData[2],
                backgroundColor: 'rgba(211,211,211, 0.6)'
            },
            {
                data: expenseData[3],
                backgroundColor: 'rgba(210,10,46, 0.6)'
            }
        ]
    }

    const options  = {
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
        plugins: {
            datalabels: {
                display: true,
                color: 'black',
                formatter: function (value) {
                    if(!value)
                        return ""
                    return `${value}`;
                }
            },
            legend: {
                display: false
            }
        }
    };
    
    return (
        <div className="p-5">
            <h2 className="font-bold text-xl mb-4">This Week</h2>
            <Bar data={data} options={options} plugins={[ChartDataLabels]} />
        </div>
    )
}

export default memo(Week)