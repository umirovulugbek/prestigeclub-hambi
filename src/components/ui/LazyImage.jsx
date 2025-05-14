import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const LazyImage = ({ src, alt, className, classNameF = '', onError = () => {} }) => {
	const [isVisible, setIsVisible] = useState(false);
	const imgRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);

		if (imgRef.current) observer.observe(imgRef.current);

		return () => observer.disconnect();
	}, []);

	return (
		<div ref={imgRef} className={classNameF + 'relative w-full  overflow-hidden rounded-lg bg-gray-300 dark:bg-[#36393E]'}>
			{isVisible ? (
				<motion.img
					src={src}
					onError={onError}
					alt={alt}
					initial={{ opacity: 0, scale: 1.11, filter: 'blur(8px)' }}
					animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
					transition={{ duration: 0.7, ease: 'easeOut' }}
					className={className + ''}
				/>
			) : (
				<div className='w-full h-60 bg-gray-200 dark:bg-[#36393E] animate-pulse'></div>
			)}
		</div>
	);
};

export default LazyImage;
