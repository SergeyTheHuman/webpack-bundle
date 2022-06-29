function createAnalytics() {
	let counter = 0
	let isKilled = false

	const listener = () => counter++

	document.addEventListener('click', listener)

	return {
		destroy() {
			document.removeEventListener('click', listener)
			isKilled = true
		},
		getClicks() {
			if (isKilled) {
				return 'Счетчик уничтожен'
			}
			return counter
		},
	}
}

window.analytics = createAnalytics()
