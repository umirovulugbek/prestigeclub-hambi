import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavigationOne from '../../components/ui/NavigationOne';
import Axios from '../../utils/httpsClinet';
import { useTranslation } from 'react-i18next';

const FaqsTourUzb = () => {
	const { id } = useParams();
	const [data, setData] = useState();
	const { t } = useTranslation()
	useEffect(() => {
		getTourUzb();
	}, []);

	const getTourUzb = () => {
		Axios()
			.get(`/api/uzb-tours/tour/${id}`)
			.then(res => {
				setData(res?.data?.data);
			});
	};

	return (
		<div>
			<NavigationOne darkmode={false} text={t('home.faq')} />
			<div className='pt-[65px]  container_main  !px-0 '>
				<div className=' px-[15px] flex flex-col gap-3  pt-[15px]'>
					{data?.faqs?.map((item, index) => {
						return (
							<div key={index} className='flex flex-col rounded-lg bg-white dark:bg-[#272829] text-[#141414] dark:text-white p-[15px] gap-3'>
								<div className=' font-medium text-base'>{item?.question}</div>
								<img src='/images/linedashed.svg' alt='' />
								<div className='  text-sm'>{item?.answer}</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default FaqsTourUzb;
