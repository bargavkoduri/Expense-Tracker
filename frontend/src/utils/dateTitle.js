const dateTitle = (dateString) => {
    let date = new Date(dateString)
    let currDate = new Date()

    if(date.getDate() === currDate.getDate() && date.getMonth() === currDate.getMonth() && date.getFullYear() === currDate.getFullYear())
        return "Today"

    currDate.setHours(currDate.getHours()-24)
    
    if (date.getDate() === currDate.getDate() && date.getMonth() === currDate.getMonth() && date.getFullYear() === currDate.getFullYear())
        return "Yesterday"

    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return day+" "+month+" "+year

}

export default dateTitle