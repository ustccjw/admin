export const toggleArray = (array, value) => {
	const res = [...array]
	const index = array.indexOf(value)
	if (index === -1) {
		res.push(value)
	} else {
		res.splice(index, 1)
	}
	return res
}
