import { useEffect } from 'react';

const PreloadImages = ({ src, className }) => {
	useEffect(() => {
		const images = [src];

		images.forEach(src => {
			const img = document.createElement('img');
			img.src = src;
			img.className = className;
			// img.style.display = 'none';
			document.body.appendChild(img);
		});
	}, []);

	return null;
};

export default PreloadImages;
