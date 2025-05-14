export const PriceFormat = (price = '0') => {
	const priceNumber = parseFloat(price);
	if (isNaN(priceNumber)) return 0;
	return priceNumber >= 0
		? priceNumber
				.toFixed(1)
				.replace(/(\d)(?=(\d{3})+\.)/g, '$1 ')
				.replace('.0', '')
		: `-${Math.abs(priceNumber)
				.toFixed(1)
				.replace(/(\d)(?=(\d{3})+\.)/g, '$1 ')
				.replace('.0', '')}`;
};
