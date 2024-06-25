export const getAmountList = () => {
    return ["1","2","3","4","5"]
}

export const GetDayList = () =>{
    return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
    ]
}

export const getDayOfWeek = (date: string) => {
    const days = GetDayList()
    const dayIndex = new Date(date).getDay()
    return days[dayIndex]
}