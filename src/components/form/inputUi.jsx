// InputUi.jsx
import React, { useEffect } from 'react';

const InputUi = ({ is_label = true, err, onChange = () => {}, name = '', type = '', w = '', label = '', placeholder = '', disabled = false, value, options = [], id }) => {
	useEffect(() => {
		// const validUntil = document.getElementById('date3');
		const firstDateInput = document.querySelector('input[type="date"]');
		const firstDateAll = document.querySelectorAll('input[type="date"]');
		const today = new Date().toISOString().split('T')[0];

		// if (firstDateAll?.id !== 'date3') {
		// 	firstDateInput.max = today;
		// }
	}, [id]);
	return (
		<div className={`flex flex-col ${w}`}>
			{is_label === true ? <span className={`text-sm font-normal px-2  mb-[1px] text-[#141414]  dark:text-white`}>{label}</span> : null}
			{type === 'date' ? (
				<div
					className={`${disabled ? 'bg-[#EFEFEF4D] dark:bg-[#141414]  dark:text-white' : ''}  ${
						err?.[name] ? 'border-red border dark:border-red' : ''
					}  h-[45px] inline-flex gap-[16px] cursor-pointer relative   px-[20px] rounded-xl duration-200  dark:!bg-[#272829] !bg-[#EBF0F5]  dark:border-[#4B4B59]`}
				>
					<input
						onChange={onChange}
						id={id}
						name={name}
						value={value}
						type='date'
						className='w-full text-sm dark:!bg-[#272829] !bg-[#EBF0F5] dark:text-white'
						placeholder={placeholder}
						disabled={disabled}
					/>
				</div>
			) : type === 'select' ? (
				<>
					<div
						className={`${disabled ? 'bg-[#EFEFEF4D] dark:bg-[#141414] dark:text-white w-full' : ''}  ${
							err?.[name] ? 'border-red border dark:border-red' : ''
						}  h-[45px] inline-flex gap-[16px] cursor-pointer relative   px-[20px] rounded-xl duration-200  dark:!bg-[#272829] !bg-[#EBF0F5] dark:border-[#4B4B59]`}
					>
						<select onChange={onChange} name={name} value={value} className='w-full focus:outline-none dark:!bg-[#272829] !bg-[#EBF0F5] dark:text-white'>
							<option value=''>Tanlang</option>
							{options.map((option, index) => (
								<option key={index} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</div>
				</>
			) : (
				// <div
				// 	className={`${disabled ? 'bg-[#EFEFEF4D] dark:bg-[#141414] dark:text-white' : ''} ${w} ${
				// 		err?.[name] ? 'border-red dark:border-red' : ''
				// 	}  h-[45px] inline-flex gap-[16px] cursor-pointer   rounded-xl `}
				// >
				// 	<RSelect error={err?.[name]} onChange={onChange} name={name} value={value} options={options} />
				// </div>
				<div
					className={`${disabled ? 'bg-[#EFEFEF4D] dark:bg-[#141414]  dark:text-white' : ''}  ${
						err?.[name] ? 'border-red border dark:border-red' : ''
					}  h-[45px] inline-flex gap-[16px] cursor-pointer relative   px-[20px] rounded-xl duration-200  dark:!bg-[#272829] !bg-[#EBF0F5]  dark:border-[#4B4B59]`}
				>
					<input
						onChange={onChange}
						name={name}
						value={value}
						type='text'
						className='w-full text-sm dark:!bg-[#272829] bg-[#EBF0F5] dark:text-white'
						placeholder={placeholder}
						disabled={disabled}
					/>
				</div>
			)}

			{/* </div> */}
		</div>
	);
};

export default InputUi;
