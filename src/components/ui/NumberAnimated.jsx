import { AnimatePresence, motion } from 'framer-motion';

const NumberAnimated = ({ number, direction }) => {
	const numberString = number.toString();

	return (
		<div className='flex space-x-0.5'>
			{numberString.split('').map((digit, index) => (
				<div key={index} className='relative w-3 h-8 overflow-hidden'>
					<AnimatePresence>
						<motion.span
							key={digit}
							initial={{ opacity: 0, y: direction === 1 ? 20 : -20, scale: 0.8 }}
							animate={{
								opacity: 1,
								y: 0,
								scale: 1,
								transition: { type: 'spring', stiffness: 500, damping: 50 },
							}}
							exit={{
								opacity: 0,
								y: direction === 1 ? -20 : 20,
								scale: 0.8,
								transition: { type: 'spring', stiffness: 500, damping: 50 },
							}}
							className='absolute inset-0 flex items-center justify-center text-center'
						>
							{digit}
						</motion.span>
					</AnimatePresence>
				</div>
			))}
		</div>
	);
};

export default NumberAnimated;
