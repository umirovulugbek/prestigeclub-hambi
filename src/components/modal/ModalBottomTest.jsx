import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import ButtonMain from '../ui/ButtonMain';

const ModalBottomTest = ({ close, modal, btnShow = true, textBtn, heightModal, content, clickFunction }) => {
	const overlayVariants = {
		visible: {
			opacity: 1,
			transition: {
				when: 'beforeChildren',
				duration: 0.3,
				delayChildren: 0.4,
			},
		},
		hidden: {
			opacity: 0,
			transition: {
				when: 'afterChildren',
				duration: 0.3,
				delay: 0.4,
			},
		},
	};
	const controls = useAnimation();
	useEffect(() => {
		if (modal) {
			controls.start('hidden');
		} else if (!modal) {
			controls.start('closed');
		}
	}, [controls, modal]);

	return (
		<div className='container_main'>
			{modal && (
				<motion.div
					drag='y'
					initial='hidden'
					animate={controls}
					onClick={close}
					transition={{
						type: 'spring',
						damping: 40,
						stiffness: 400,
					}}
					variants={{
						visible: { y: 104 },
						hidden: { y: '0%' },
						closed: { y: '100%' },
					}}
					exit={{ y: '100vh' }}
					dragConstraints={{ top: 0 }}
					dragElastic={0.2}
					className='fixed z-[9091]  top-0  inset-0 flex items-end justify-end w-full bg-[#09101D99] backdrop-blur-sm'
				>
					<motion.div
						initial={{ y: '100vh' }}
						animate={{ y: 0 }}
						exit={{ y: '100vh' }}
						transition={{
							type: 'spring',
							damping: 40,
							stiffness: 400,
						}}
						className='w-full overflow-hidden'
						onClick={e => e.stopPropagation()}
					>
						<motion.div className='container_main flex w-full bg-[#EBF0F5] dark:bg-[#141414] rounded-tr-[10px] rounded-tl-[10px] duration-300'>
							<div className='flex flex-col justify-between w-full gap-3'>
								<div className={`flex flex-col ${btnShow ? 'h-[calc(100%_-_70px)]' : 'h-full'}`}>
									<div className='flex justify-center w-full py-[10px] px-[16px]'>
										<div className='h-[6px] w-[50px] rounded-[10px] bg-[#235DFF]' />
									</div>
									<div className='flex h-full overflow-y-auto'>{content}</div>
								</div>
								{btnShow && <ButtonMain type='button' type_color='t_blue' className='w-full mb-[20px]' text={textBtn} onClick={() => clickFunction()} />}
							</div>
						</motion.div>
					</motion.div>
				</motion.div>
			)}
		</div>
	);
};

export default ModalBottomTest;
