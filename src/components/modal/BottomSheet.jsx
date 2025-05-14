import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

function BottomSheet({ isClosed, setIsClosed }) {
	const [isOpen, setIsOpen] = useState(false);
	const prevIsOpen = usePrevious(isOpen);
	const controls = useAnimation();

	function onClose() {
		setIsOpen(false);
	}

	function onOpen() {
		setIsOpen(true);
	}

	function onToggle() {
		setIsOpen(!isOpen);
	}

	function onDragEnd(event, info) {
		const shouldClose = info.velocity.y > 20 || (info.velocity.y >= 0 && info.point.y > 45);
		if (shouldClose) {
			controls.start('hidden');
			onClose();
		} else {
			controls.start('visible');
			onOpen();
		}
	}

	useEffect(() => {
		if (prevIsOpen && !isOpen) {
			controls.start('hidden');
		} else if (!prevIsOpen && isOpen) {
			controls.start('visible');
		} else if (isClosed) {
			controls.start('closed');
		} else if (!isClosed) {
			controls.start('hidden');
		}
	}, [controls, isOpen, isClosed, prevIsOpen]);

	const handleDoubleClick = e => {
		switch (e.detail) {
			case 2:
				if (!prevIsOpen && isOpen) {
					controls.start('hidden');
					setIsOpen(false);
				} else if (prevIsOpen && !isOpen) {
					controls.start('visible');
					setIsOpen(true);
				}
				break;
			default:
				return;
		}
	};

	return (
		<motion.div
			drag='y'
			onDragEnd={onDragEnd}
			initial='hidden'
			animate={controls}
			transition={{
				type: 'spring',
				damping: 40,
				stiffness: 400,
			}}
			variants={{
				visible: { y: 104 },
				hidden: { y: '70%' },
				closed: { y: '100%' },
			}}
			dragConstraints={{ top: 0 }}
			dragElastic={0.2}
			className='bg-white w-80 h-[768px] border border-gray-300 shadow-lg rounded-t-3xl overflow-hidden z-50'
		>
			{/* <DragHandle onClick={handleDoubleClick} /> */}
			<Navbar isOpen={isOpen} onToggle={onToggle} setIsClosed={setIsClosed} />
		</motion.div>
	);
}

function usePrevious(value) {
	const previousValueRef = useRef();
	useEffect(() => {
		previousValueRef.current = value;
	}, [value]);

	return previousValueRef.current;
}

function DragHandle({ onClick }) {
	return (
		<div className='p-2 cursor-pointer' onClick={onClick}>
			<div className='w-12 h-1 bg-gray-400 mx-auto rounded-md' />
		</div>
	);
}

function Navbar({ isOpen, onToggle, setIsClosed }) {
	return (
		<div className='flex justify-between items-center p-4 border-b border-gray-300'>
			<span className='text-lg font-medium'>Bottom sheet</span>
			<div className='flex items-center'>
				<span className='flex items-center cursor-pointer text-sm' onClick={onToggle}>
					<span className='mr-2'>{isOpen ? '􀅋' : '􀅊'}</span>
					<span>{isOpen ? 'Collapse' : 'Expand'}</span>
				</span>
				<span className='text-xl cursor-pointer ml-4' onClick={() => setIsClosed(true)}>
					􀁡
				</span>
			</div>
		</div>
	);
}

export default BottomSheet;
