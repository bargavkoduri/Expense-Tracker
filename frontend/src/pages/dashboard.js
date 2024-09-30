import { useState } from "react"
import Expenses from "../components/Expenses"
import Modal from "../components/Modal"

const Dashboard = () => {

    const [isVisible,setIsVisible] = useState(false)

    return (
        <>
            <div className="flex p-6 h-full gap-4">
                <div className="w-6/12 flex flex-col gap-4">
                    <div className="w-100 h-3/6 bg-gray-200 rounded-lg">

                    </div>
                    <div className="w-100 h-3/6 bg-gray-200 rounded-lg">

                    </div>
                </div>
                <div className="w-6/12 rounded-lg overflow-auto">
                    <div className="bg-gray-200 rounded h-full p-6">
                        <Expenses />
                    </div>
                    <div className="rounded-full text-4xl text-center bg-blue-700 text-white w-12 h-12 cursor-pointer absolute right-10 bottom-10"
                        onClick={() => setIsVisible(true)}
                    >
                        +
                    </div>

                </div>
            </div>
            <Modal isVisible={isVisible} setIsVisible={setIsVisible} />
        </>
    )
}

export default Dashboard