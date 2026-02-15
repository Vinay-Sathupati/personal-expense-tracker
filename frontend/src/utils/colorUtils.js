export const expenseBaseColor = '#e11d48'
export const incomeBaseColor = '#16a34a'


//Converting Hexcode to RGB
/* 
Converts a HEX color (like "#e11d48") into RGB format so we can adjust the shade dynamically.
This helps when generating lighter or darker versions of the same base color.
*/
const hexToRgb = (hex) => {
    const bigint = parseInt(hex.replace("#",""),16)
    return {
        r: (bigint >> 16) & 255,
        g:(bigint >> 8) & 255,
        b: bigint& 255
    }
}




//Gerneric Shade Generator
/* 
Highest value → darkest shade
Lower values → lighter shade

Creates lighter and darker shades of a base color based on how big the value is.
This makes the chart visually show which category has the highest expense without using random colors.
*/
export const generateShade = (value, maxValue, baseColor) => {
    if (!maxValue) return baseColor

    const intensity = value/maxValue
    const baseRGB = hexToRgb(baseColor)

    const lightRGB = {r: 240, g: 220, b: 225 }

    const r = Math.round(baseRGB.r * intensity + lightRGB.r * (1-intensity))
    const g = Math.round(baseRGB.g * intensity + lightRGB.g * (1-intensity))
    const b = Math.round(baseRGB.b * intensity + lightRGB.b * (1-intensity))

    return `rgb(${r},${g},${b})`
}