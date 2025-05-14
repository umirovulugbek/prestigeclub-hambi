import React, { useState, useRef, useEffect } from 'react';

const CustomDatePicker = () => {
	const [selectedDate, setSelectedDate] = useState(null);
	const [showCalendar, setShowCalendar] = useState(false);
	const calendarRef = useRef(null);

	// Inputga bosilganda kalendarni ko‘rsatish
	const handleInputClick = () => {
		setShowCalendar(true);
	};

	// Kalendar tashqarisiga bosilganda yopish
	useEffect(() => {
		const handleClickOutside = event => {
			if (calendarRef.current && !calendarRef.current.contains(event.target)) {
				setShowCalendar(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	// Joriy oyning kunlarini chiqarish
	const renderCalendarDays = () => {
		const days = [];
		const today = new Date();
		const year = today.getFullYear();
		const month = today.getMonth();
		const daysInMonth = new Date(year, month + 1, 0).getDate();

		for (let i = 1; i <= daysInMonth; i++) {
			const dayDate = new Date(year, month, i);
			const isSelected = selectedDate && selectedDate.getDate() === i && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;

			days.push(
				<div
					key={i}
					onClick={() => {
						setSelectedDate(dayDate);
						setShowCalendar(false);
					}}
					className={`w-8 h-8 flex items-center justify-center m-1 rounded cursor-pointer transition-colors 
            ${isSelected ? 'bg-blue-500 text-white' : 'bg-white text-black hover:bg-blue-100'}`}
				>
					{i}
				</div>
			);
		}
		return days;
	};

	return (
		<div className='relative inline-block'>
			<input
				type='text'
				onClick={handleInputClick}
				value={selectedDate ? selectedDate.toLocaleDateString() : ''}
				readOnly
				placeholder='Sanani tanlang'
				className='border border-gray-300 p-2 rounded w-40 cursor-pointer'
			/>
			{showCalendar && (
				<div ref={calendarRef} className='absolute top-12 left-0 bg-white border border-gray-300 rounded shadow-md p-4 z-10'>
					{/* Kalendar sarlavhasini qo'shish mumkin */}
					<div className='grid grid-cols-7 gap-1'>{renderCalendarDays()}</div>
				</div>
			)}
		</div>
	);
};

export default CustomDatePicker;
