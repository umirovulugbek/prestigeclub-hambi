import { motion } from 'framer-motion';
import { useNavigationType } from 'react-router-dom';

const pageVariants = {
	initial: {
		opacity: 0,
		x: 30, // Chapdan kirish
	},
	animate: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.3, ease: 'easeOut' },
	},
};

const PageWrapper = ({ children }) => {
	const navigationType = useNavigationType(); // 'PUSH', 'POP', 'REPLACE'
	const exitX = navigationType === 'POP' ? 10 : -10; // Orqaga qaytishda o‘ngdan chiqish

	return (
		<motion.div
			initial={{ opacity: 0.95, x: 10 }}
			animate={{ opacity: 1, x: 0, transition: { duration: 0.2, ease: 'easeInOut' } }}
			// exit={{ opacity: 0.95, x: exitX, transition: { duration: 0.15, ease: 'easeInOut' } }}
			className='absolute inset-0 w-full h-full bg-white'
		>
			{children}
		</motion.div>
	);
};

export default PageWrapper;
