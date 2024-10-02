import data from "../data.json"
import {  useState, useMemo, memo } from "react"
import groupByDate from "../utils/groupData"
import ExpenseList from "./ExpenseList"
const Categories = Object.keys(data)

const Expenses = ({expenses}) => {
    const [category, setCategory] = useState('All')
    const [subCategory, setSubCategory] = useState('')
    
    let expenseMap = useMemo(() => groupByDate(expenses, category, subCategory),
        [expenses, category, subCategory]
    )
    let dates = useMemo(() => Object.keys(expenseMap).sort((a, b) => b.localeCompare(a)),
        [expenseMap]
    )

    const subCategories = data[category] || []

    const handleCategoryChange = (e) => {
        setSubCategory('')
        setCategory(e.target.value)
    }

    const handleSubCategoryChange = (catg) => {
        setSubCategory(catg)
    }

    return (
        <>
            <div className="flex justify-between">
                <h2 className="font-bold text-xl" >Transactions</h2>
                <div className="w-fit">
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={handleCategoryChange}
                    >
                        {
                            Categories.map((catg, index) => <option key={index} value={catg}>{catg}</option>)
                        }
                    </select>
                </div>
            </div>

            <div className="flex gap-6 flex-wrap mt-4 mb-5">
                {
                    subCategories.map((catg, index) => {
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

            <ExpenseList dates={dates} expenseMap={expenseMap} />
        </>
    )
}

export default memo(Expenses)