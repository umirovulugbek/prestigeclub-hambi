import * as React from 'react';
import InputMask from 'react-input-mask';

export default function BasicDatePicker(props) {
	return (
		<div className='flex flex-col w-full justify-between'>
			<span className='text-sm font-normal px-2 mb-[1px] text-[#141414] dark:text-white'>{props?.custrom_label}</span>
			<InputMask placeholder='дд.мм.гггг' name={props?.name} mask='99/99/9999' onChange={props.onChange} value={props.value || ''} maskPlaceholder={null}>
				{inputProps => (
					<input
						{...inputProps}
						className={` bg-[#EBF0F5] dark:bg-[#272829]  dark:text-white  px-[20px] rounded-xl h-[45px] w-full  text-[14px] ${
							props.error?.[props.name] ? 'border-red border' : 'border-[#EBF0F5] border dark:border-[#272829]'
						}`}
					/>
				)}
			</InputMask>
		</div>
	);
}
