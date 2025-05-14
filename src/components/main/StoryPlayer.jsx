import { useEffect, useState } from 'react';

const StoryPlayer = ({ stories, activeIndex, onClose }) => {
	const [loading, setLoading] = useState(true);
	const [progress, setProgress] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(activeIndex);

	useEffect(() => {
		setLoading(true);
		setProgress(0);
	}, [currentIndex]);

	useEffect(() => {
		let interval;
		if (!loading) {
			interval = setInterval(() => {
				setProgress(prev => (prev < 100 ? prev + 1 : 100));
			}, 50);
		}

		return () => clearInterval(interval);
	}, [loading]);

	useEffect(() => {
		if (progress === 100) {
			handleNext();
		}
	}, [progress]);

	const handleNext = () => {
		if (currentIndex < stories.length - 1) {
			setCurrentIndex(currentIndex + 1);
		} else {
			onClose();
		}
	};

	const handlePrev = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		}
	};

	return (
		<div className='fixed container_main top-0 bottom-0 right-0 z-9999 left-0 w-full h-full bg-[#141414] flex items-center justify-center'>
			<div className='absolute top-2 left-4 right-4 flex space-x-1'>
				{stories.map((_, index) => (
					<div key={index} className={`h-1 flex-1 bg-gray-500 rounded-full overflow-hidden`}>
						<div className='h-full bg-white transition-all' style={{ width: index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%' }} />
					</div>
				))}
			</div>

			{loading && <div className='absolute w-10 h-10 border-4 border-gray-300 border-t-transparent rounded-full animate-spin'></div>}

			<img onEnded={handleNext} onLoad={() => setLoading(false)} src={stories[currentIndex].image} alt='' className={`w-full h-full object-cover ${loading ? 'hidden' : 'block'}`} />

			<div className='absolute inset-0 flex'>
				<div className='w-1/3' onClick={handlePrev}></div>
				<div className='w-1/3'></div>
				<div className='w-1/3' onClick={handleNext}></div>
			</div>

			<button onClick={onClose} className='absolute top-2 right-2 text-white text-2xl'>
				✖
			</button>
		</div>
	);
};

export default StoryPlayer;
