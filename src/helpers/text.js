export const limitTextSize = (text) => {
    const textArr = text.slice(0, 600).split(" ")
    textArr[textArr.length - 1] = "..."
    return textArr.join(" ")
}

export const readableMoney = (amount, language) => {
    return new Intl.NumberFormat(language, {style: 'currency', currency: 'USD', minimumFractionDigits: 0}).format(amount)
}