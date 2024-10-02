import dateTitle from "./dateTitle"

const getWeekData = (arr) => {
    let currentDate = new Date()
    let sixDaysAgo = new Date()
    sixDaysAgo.setDate(currentDate.getDate()-6)

    sixDaysAgo.setHours(0,0,0,0)

    const weekData = arr.filter((expense) => {
        const expenseDate = new Date(expense.createdAt)
        if(expenseDate >= sixDaysAgo )
            return true
        return false
    })

    let labels = []
    let mp = {
        "Essential Expenses": 0,
        "Non-Essential Expenses": 1,
        "Miscellaneous": 2,
        "Savings and Investments": 3
    }
    let mpDateIndex = {}
    let data = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]

    ]

    for(let i = 0;i < 7;i++)
    {
        let str = dateTitle(sixDaysAgo.toDateString())
        labels.push(str)
        mpDateIndex[str] = i
        sixDaysAgo.setDate(sixDaysAgo.getDate()+1)
    }

    weekData.map((expense) => {
        let row = mp[expense.category]
        let col = mpDateIndex[dateTitle(expense.createdAt)]
        console.log(row," ",col)
        data[mp[expense.category]][mpDateIndex[dateTitle(expense.createdAt)]] += expense.amount
    })

    return [labels,data]
}

export default getWeekData