import { STRINGS } from '../constants/strings'

export const readableDate = (date, language) => {
    const [year, month, day] = date.split("-")
    if (language === "en-US") {
        return `${STRINGS[language].MONTHS[Number(month) - 1]} ${Number(day)}, ${year}`
    } else if (language === "pt-BR") {
        return `${Number(day)} de ${STRINGS[language].MONTHS[Number(month) - 1]} de ${year}`
    }
}