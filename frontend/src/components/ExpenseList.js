import { memo } from "react"
import List from "./List"

const ExpenseList = ({expenseMap,dates}) => {
    return (
        <div>
            {
                dates.map((date, index) => {
                    return <List key={index} date={date} data={expenseMap[date]} />
                })
            }
        </div>
    )
}

export default memo(ExpenseList)