import { generateShade } from "./colorUtils";
import { monthNames } from "../constants/categories";

export const prepareDonutData = (categories, baseColor) => {
    const sorted = [...categories].sort(
        (a,b) => b.totalAmount - a.totalAmount
    )

    const maxValue = sorted.length > 0 ? sorted[0].totalAmount : 0

    return sorted?.map((item)=> ({
        name: item._id,
        value: item.totalAmount,
        fill: generateShade(item.totalAmount, maxValue, baseColor)
    }))
}




export const prepareMonthlyBarData = (monthly) => {
    const monthlyMap = {}

    monthly.forEach((item)=> {
        const monthIndex = item._id.month -1
        const monthName = monthNames[monthIndex]

        if (!monthlyMap[monthName]) {
            monthlyMap[monthName] = {
                month: monthName,
                income: 0,
                expense: 0
            }
        }

        monthlyMap[monthName][item._id.type] = item.total
    })

    return Object.values(monthlyMap)
}