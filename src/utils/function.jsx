export function getSearchParams() {
	const searchParams = new URLSearchParams(window.location.search);
	const paramsObject = {};

	for (const [key, value] of searchParams.entries()) {
		if (key.endsWith('[]')) {
			const baseKey = key.slice(0, -2);
			paramsObject[baseKey] = paramsObject[baseKey] || [];
			paramsObject[baseKey].push(isNaN(value) ? value : Number(value));
		} else if (key === 'checkin') {
			paramsObject[key] = value.replace(/-/g, '');
		} else {
			paramsObject[key] = isNaN(value) ? value : Number(value);
		}
	}

	return paramsObject;
}
export function formatCompactNumber(num) {
	if (num >= 1000000) {
		return (num / 1000000)?.toFixed(1)?.replace(/\.0$/, '') + ' M';
	}
	if (num >= 1000) {
		return (num / 1000)?.toFixed(1)?.replace(/\.0$/, '') + ' K';
	}
	return num.toString();
}
