import icons from "../icons.json"
import dateTitle from "../utils/dateTitle"

const List = ({date,data}) => {
    return (
        <div className="mb-10">
            <h5 className="text-gray-400 text-sm mb-5">{dateTitle(date)}</h5>
            {
                data.map(expense => {
                    return (
                        <div key={expense._id} className="flex justify-between mb-4 items-center">
                            <div className="flex items-center gap-5">
                                <h5 className="text-2xl">{icons[expense.subCategory]}</h5>
                                <div>
                                    <h2 className="text-black">{expense.purpose}</h2>
                                    <h4 className="text-gray-400">{expense.subCategory}</h4>
                                </div>
                            </div>
                            <h4 className="text-gray-400 text-md">-₹{expense.amount}</h4>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default List