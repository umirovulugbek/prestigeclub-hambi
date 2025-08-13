import React from 'react';
import { useNavigate } from 'react-router-dom';
import OverflowHidden from '../main/OverflowHidden';
import ButtonMain from '../ui/ButtonMain';

const ModalBottomFull = ({ close, modal, btnShow = true, textBtn, translateY, heightModal, linkTo, content, clickFunction }) => {
	const navigate = useNavigate();
	return (
		<>
			<div className={` relative z-9999  duration-300 ${modal ? 'opacity-100' : 'opacity-0'}`}>
				<div
					className={`fixed top-0 left-0 flex justify-center z-[9090] ${modal ? 'w-full h-full' : 'w-0 h-0'}
        `}
				>
					<div className=' w-full backdrop-blur-sm' style={{ background: '#09101D99' }} onClick={close} />
				</div>
				<div className={`fixed z-[9091]  bottom-0 left-0 flex justify-center w-full duration-300 ${modal ? heightModal : `h-[0]`}`}>
					<div className={` flex w-full bg-white dark:bg-[#141414]  duration-300 ${modal ? `${heightModal} translate-y-[0]` : `h-[0] ${translateY}`}`}>
						<div className='flex flex-col justify-between w-full gap-3'>
							<div className={`flex flex-col ${btnShow ? 'h-[calc(100%_-_70px)]' : 'h-full'} `}>
								<div className='flex justify-center w-full py-[10px] px-[16px]'>
									<div className='h-[6px] w-[50px] rounded-[10px] bg-neutralAlto' />
								</div>
								<div className='flex h-full overflow-y-auto  w-full'>{content}</div>
							</div>
							{btnShow ? <ButtonMain type='button' type_color='t_blue' className='w-full mb-3' text={textBtn} onClick={() => clickFunction()} /> : ''}
						</div>
					</div>
				</div>
			</div>
			{modal ? <OverflowHidden /> : ''}
		</>
	);
};

export default ModalBottomFull;
