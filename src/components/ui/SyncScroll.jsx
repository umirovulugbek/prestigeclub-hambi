import { useRef } from 'react';
import { trackEvent } from '../../utils/mixpanel';

export default function SyncScroll({ data }) {
	const topScrollRef = useRef(null);
	const bottomScrollRef = useRef(null);

	// Massivni ikkiga bo‘lish
	const half = Math.ceil(data.length / 2);
	const topData = data.slice(0, half); // Yuqori qismini olish
	const bottomData = data.slice(half); // Pastki qismini olish

	const handleScroll = e => {
		trackEvent('nyachang_view_str');
		const { scrollLeft } = e.target;
		if (e.target === topScrollRef.current) {
			bottomScrollRef.current.scrollLeft = scrollLeft;
		} else {
			topScrollRef.current.scrollLeft = scrollLeft;
		}
	};

	return (
		<div className='flex flex-col gap-[5px]'>
			<div ref={topScrollRef} onScroll={handleScroll} className='flex overflow-x-auto space-x-[5px] scrollbar-hide'>
				{topData.map((item, index) => (
					<button
						key={index}
						className='text-[#141414] whitespace-nowrap bg-[#DEE7FF] dark:bg-[#141414] dark:text-white font-normal h-[34px] text-base text-start flex justify-center items-center px-3 rounded-[20px]'
					>
						{item}
					</button>
				))}
			</div>

			<div ref={bottomScrollRef} onScroll={handleScroll} className='flex overflow-x-auto space-x-[5px] scrollbar-hide'>
				{bottomData.map((item, index) => (
					<div
						key={index}
						className='text-[#141414] whitespace-nowrap bg-[#DEE7FF] dark:bg-[#141414] dark:text-white font-normal h-[34px] text-base text-start flex justify-center items-center px-3 rounded-[20px]'
					>
						{item}
					</div>
				))}
			</div>
		</div>
	);
}
