export function abbreviateNumber(value, precision = 2) { // eslint-disable-line import/prefer-default-export
	let newValue = value;
	const suffixes = ["", "K", "M", "B","T"];
	let suffixNum = 0;
	while (newValue >= 1000) {
		newValue /= 1000;
		suffixNum += 1;
	}
	
	const numPrecision = precision;
	if(numPrecision === "") {
		newValue = newValue.toFixed();
	} else {
		const multiplier = 10 ** numPrecision;
		newValue = Math.round(newValue * multiplier) / multiplier;
	}
	newValue += suffixes[suffixNum];
	return newValue;
}