import { useState } from "react"
import data from "../data.json"
import axios from "axios"
import { useAuth } from "@clerk/clerk-react"
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL 

const Modal = ({isVisible,setIsVisible}) => {

    const { getToken } = useAuth()

    const [formData,setFormData] = useState({
        purpose: "",
        amount: 0,
        category: "Essential Expenses",
        subCategory: "Housing"
    })

    let categories = Object.keys(data).slice(1)
    let subCategories = data[formData.category]

    const handleChange = (e) => {

        if(e.target.name === "category"){
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
                subCategory: data[e.target.value][0].name
            })
            return
        }

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            let token = await getToken()
            await axios.post(`${BACKEND_URL}/expense`,formData,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            alert('Expense Added')
            setIsVisible(false)
        } catch(err) {
            alert('Unable to process request')
        }
    }

    if(!isVisible)
        return <></>

    return (
        <div className="fixed inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className="w-[600px]">
               <div className="bg-white px-4 py-8 rounded-lg">
                    <div className="flex justify-between">
                        <h2 className="font-bold text-xl text-black">New Expense</h2>
                        <button className="text-gray-600 text-2xl" 
                            onClick={() => setIsVisible(false)}
                        >x</button>
                    </div>

                    <div className="mt-12">
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-5">
                            <label htmlFor="purpose" className="block mb-2 text-sm font-medium text-gray-900 ">What did you spend on?</label>
                            <input value={formData.purpose} type="text" name="purpose" id="purpose" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Rent" required onChange={handleChange}/>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 ">Amount</label>
                            <input type="number" value={formData.amount} min={1} name="amount" id="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Rent" required onChange={handleChange}/>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                            <select id="category"  name="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required onChange={handleChange}>
                            {
                                categories.map((catg,index) => {
                                    return (
                                        <option key={index} value={catg} >{catg}</option>
                                    )
                                })
                            }
                            </select>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="subcategory" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                            <select id="subcategory" name="subCategory" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required onChange={handleChange} >
                            {
                                subCategories.map((catg,index) => {
                                    return (
                                        <option key={index} value={catg.name}>{catg.name}</option>
                                    )
                                })
                            }
                            </select>
                        </div>
                        <div className="w-100">
                            <button type="submit" className="w-full text-white rounded-lg py-2 bg-blue-600">Add</button>
                        </div>
                    </form>
                    </div>
               </div> 
            </div>
        </div>
    )
}

export default Modal