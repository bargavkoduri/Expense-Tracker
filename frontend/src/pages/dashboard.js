import { useState, useEffect, useCallback } from "react"
import Expenses from "../components/Expenses"
import axios from 'axios'
import { useAuth } from "@clerk/clerk-react"
import Modal from "../components/Modal"
import Month from "../components/Month"
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import Week from "../components/Week"
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const Dashboard = () => {

    const [isVisible, setIsVisible] = useState(false)
    const [expenses, setExpenses] = useState([])

    const { getToken } = useAuth()


    const fetchExpenses = useCallback(async () => {
        try {
            let token = await getToken()
            let resp = await axios.get(`${BACKEND_URL}/expense/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setExpenses(resp.data)
        } catch (err) {
            alert('Unable to fetch data')
        }
    }, [])

    useEffect(() => {
        fetchExpenses()
    }, [])

    return (
        <>
            <div className="flex p-6 h-full gap-4 bg-gray-200">
                <div className="w-6/12 flex flex-col gap-4">
                    <div className="w-100 h-2/6  rounded-lg bg-white">
                        <Month expenses={expenses} />
                    </div>
                    <div className="w-100 h-4/6  rounded-lg bg-white">
                        <Week expenses={expenses} />
                    </div>
                </div>
                <div className="w-6/12 rounded-lg overflow-y-scroll bg-white">
                    <div className="rounded h-full p-6">
                        <Expenses expenses={expenses} />
                    </div>
                    <div className="rounded-full text-4xl text-center bg-blue-700 text-white w-12 h-12 cursor-pointer absolute right-10 bottom-10"
                        onClick={() => setIsVisible(true)}
                    >
                        +
                    </div>

                </div>
            </div>
            <Modal isVisible={isVisible} setIsVisible={setIsVisible} fetchExpenses={fetchExpenses} />
        </>
    )
}

export default Dashboard