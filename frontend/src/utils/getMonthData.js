const getMonthData = (arr) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const monthData = arr.filter((expense) => {
        const expenseDate = new Date(expense.createdAt);
        const expenseYear = expenseDate.getFullYear();
        const expenseMonth = expenseDate.getMonth();

        if(expenseYear !== currentYear)
            return false
        
        if(expenseYear === currentYear && currentMonth !== expenseMonth)
            return false

        return true
    })

    let mp = {
        "Essential Expenses": 0,
        "Non-Essential Expenses": 1,
        "Miscellaneous": 2,
        "Savings and Investments": 3
    }

    let data = [0,0,0,0]

    monthData.forEach(expense => {
        data[mp[expense.category]] += expense.amount
    });

    return data

}

export default getMonthData