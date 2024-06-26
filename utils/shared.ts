export const getAmountList = () => {
    return ["1","2","3","4","5"]
}

export const GetDayList = () => {
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

export const GetRoleList = () => {
    return [
    "admin",
    "employee"
    ]
}

export const getDayOfWeek = (date: string) => {
    const days = GetDayList()
    const dayIndex = new Date(date).getDay()
    return days[dayIndex]
}

export function generateNumber(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}