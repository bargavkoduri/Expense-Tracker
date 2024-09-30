import data from "../data.json"
import { useAuth } from "@clerk/clerk-react"
import { useEffect, useState } from "react"
import axios from 'axios'
const Categories = Object.keys(data)
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL 

console.log(BACKEND_URL)

const Expenses = () => {
    const [category, setCategory] = useState('All')
    const [subCategory,setSubCategory] = useState('')
    const [expenses,setExpenses] = useState([])
    const { getToken } = useAuth()

    const fetchExpenses = async () => {
        try {
            let token = await getToken()
            let resp = await axios.get(`${BACKEND_URL}/expense/all`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setExpenses(resp.data)
            
        } catch(err) {
            alert('Unable to fetch data')
        }
    }

    const subCategories = data[category] || []

    const handleCategoryChange = (e) => {
        setSubCategory('')
        setCategory(e.target.value)
    }

    const handleSubCategoryChange = (catg) => {
        setSubCategory(catg)
    }

    useEffect(() => {
        fetchExpenses()
    }, [])

    return (
        <>
            <div className="flex justify-between">
                <h2 className="font-bold text-xl" >Transactions</h2>
                <div className="w-fit">
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        onChange={handleCategoryChange}
                    >
                    {
                        Categories.map((catg,index) => <option key={index} value={catg}>{catg}</option>)
                    }
                    </select>
                </div>
            </div>

            <div className="flex gap-6 flex-wrap mt-4">
             {
                subCategories.map((catg,index) => {
                    return (
                        <div key={index} className={`p-2 rounded-lg border border-blue-500 cursor-pointer ${catg.name === subCategory ? 'text-white bg-blue-400' : 'text-gray-600 bg-white'}`}
                            onClick={() => handleSubCategoryChange(catg.name)}
                        >
                            <h4>{catg.name}</h4>
                        </div>
                    )
                })
             }
            </div>
        </>
    )
}

export default Expenses