/** Маршрутизация по SPA */
export const redirectSPA = (href: string) => {
	let element = document.createElement('a')
	element.href = href
	element.style.display = 'none'
	document.querySelector('body')?.appendChild(element)
	element.click()
	element.remove()
}

/** Установка debounce */
export const setDebounce = (callback: (...args: any) => any, delay: number = 100) => {
	/** Идентификатор отложенного вызова */
	let timeoutId: number | undefined = undefined

	const call = () => {
		if (timeoutId) clearTimeout(timeoutId)
		timeoutId = setTimeout(callback, delay)
	}

	return call
}



  //Функция форматирования телефона
  export function formatPhone(phone: string | undefined) {
    if (!phone) return "";
    let digits = phone.replace(/\D/g, "");
    // Если номер начинается с 8
    if (digits.length === 11 && digits.startsWith("8")) {
      digits = "7" + digits.slice(1);
    }
    if (digits.length === 11 && digits.startsWith("7")) {
      return `+7 ${digits.slice(1, 4)} ${digits.slice(4, 7)} ${digits.slice(
        7,
        9
      )} ${digits.slice(9, 11)}`;
    }
    if (digits.length === 10) {
      return `+7 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(
        6,
        8
      )} ${digits.slice(8, 10)}`;
    }
    return phone;
  }

export default {
	redirectSPA,
	setDebounce,
}
