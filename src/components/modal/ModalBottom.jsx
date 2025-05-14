import { AnimatePresence, motion } from 'framer-motion';
import { React } from 'react';
import ButtonMain from '../ui/ButtonMain';

const ModalBottom = ({ close, modal, btnShow = true, textBtn, heightModal, content, clickFunction }) => {
	return (
		<div className={`container_main `}>
			<AnimatePresence>
				{modal && (
					<motion.div
						initial='hidden'
						animate='visible'
						exit='hidden'
						onClick={close}
						className='fixed z-[9091] inset-0 flex items-end justify-end w-full bg-[#09101D99] backdrop-blur-sm'
					>
						<motion.div
							initial={{ y: '100vh' }}
							animate={{ y: 0 }}
							exit={{ y: '100vh' }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className='w-full overflow-hidden'
							onClick={e => e.stopPropagation()}
						>
							<div className={`container_main flex w-full bg-[#EBF0F5] dark:bg-[#141414] rounded-tr-[10px] rounded-tl-[10px]  ${modal ? heightModal : 'h-[0]'}`}>
								<div className='flex flex-col justify-between w-full gap-3'>
									<div className={`flex flex-col ${btnShow ? 'h-[calc(100%_-_70px)]' : 'h-full'} `}>
										<div className='flex justify-center w-full py-[10px] px-[16px]'>
											<div className='h-[6px] w-[50px] rounded-[10px] bg-[#235DFF]' />
										</div>
										<div className='flex h-full overflow-y-auto'>{content}</div>
									</div>
									{btnShow && <ButtonMain type='button' type_color='t_blue' className='w-full mb-[20px]' text={textBtn} onClick={() => clickFunction()} />}
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
export default ModalBottom;
