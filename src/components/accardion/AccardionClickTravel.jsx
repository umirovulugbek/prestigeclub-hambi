import React from 'react';
import AccardionItemClickTravel from './AccardionItemClickTravel';

const AccardionClickTravel = ({ data, darkmode }) => {
	return (
		<div className='px-[15px] flex flex-col gap-3'>
			{data.map((item, index) => (
				<AccardionItemClickTravel darkmode={darkmode} key={index} question={item.question} answer={item.answer} />
			))}
		</div>
	);
};

export default AccardionClickTravel;
