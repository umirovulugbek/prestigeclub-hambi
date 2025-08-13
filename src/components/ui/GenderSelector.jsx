import React from 'react';

const GenderSelector = ({ selectedGender, setSelectedGender, err, setErrors }) => {
	return (
		<div>
			<span className={`text-sm font-normal px-2  mb-[1px] text-[#141414]  dark:text-white`}>{'Пол'}</span>
			<div className='flex justify-center  gap-[10px]'>
				<div
					onClick={() => {
						setSelectedGender('male');
						setErrors({ ...err, gender: false });
					}}
					className={`${
						selectedGender === 'male' ? ' !border-[#0077FF1F] !bg-[#0077FF1F]  ' : err?.gender === true ? ' border-red' : ' border-white bg-[#EBF0F5] dark:border-[#141414] '
					} w-full !text-[#235DFF]    h-[45px]  text-sm inline-flex gap-[16px] cursor-pointer relative z-[1] border px-[20px] py-[18px] rounded-xl duration-200    dark:bg-[#272829] items-center`}
				>
					Мужчина
				</div>

				<div
					className={`${err ? '' : ''}  ${
						selectedGender === 'female' ? ' !border-[#FF662F1F]  !bg-[#FF662F1F] ' : err?.gender === true ? ' border-red' : ' border-white bg-[#EBF0F5] dark:border-[#141414]'
					} w-full h-[45px] text-sm inline-flex gap-[16px] dark:bg-[#272829] cursor-pointer relative z-[1] border px-[20px] py-[18px] rounded-xl duration-200  !text-[#FF662F] items-center `}
					onClick={() => {
						setSelectedGender('female');
						setErrors({ ...err, gender: false });
					}}
				>
					Женщина
				</div>
			</div>
		</div>
	);
};

export default GenderSelector;
