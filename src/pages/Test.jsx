import React, { useState } from 'react';
import BottomSheet from '../components/modal/BottomSheet';

const Test = () => {
	const [isClosed, setIsClosed] = useState(false);

	return (
		<div className='flex flex-col bg-white rounded-xl w-80  overflow-hidden shadow-xl relative'>
			<div className='flex justify-between items-center p-4'>
				<span className='text-xl font-semibold'>Untitled demo</span>
				<span className='text-sm text-gray-500'>All changes saved</span>
			</div>
			<button className='w-12 h-12 bg-blue-500 text-white rounded-full flex justify-center items-center mx-auto my-4' onClick={() => setIsClosed(false)}>
				􀣾
			</button>
			<BottomSheet isClosed={isClosed} setIsClosed={setIsClosed} />
		</div>
	);
};

export default Test;
