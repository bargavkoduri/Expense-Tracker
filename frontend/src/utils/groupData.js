let shouldFilter = (exp,category,subCategory) => {
    if(category === "All")
        return false;
    if(exp.category !== category || (exp.subCategory !== subCategory && subCategory !== ''))
        return true;
    return false
}

const groupByDate = (arr,category,subCategory) => {
    let data = arr.reduce((acc,exp) => {
        const expDate = new Date(exp.createdAt).toISOString().split('T')[0];
        let res = shouldFilter(exp,category,subCategory)
        if(!res) {
            if(!acc[expDate])
                acc[expDate] = [];
            acc[expDate].push(exp)
        }

        return acc
    },{})

    return data
}

export default groupByDate