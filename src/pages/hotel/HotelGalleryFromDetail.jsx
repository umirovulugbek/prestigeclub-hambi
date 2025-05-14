import lgThumbnail from 'lightgallery/plugins/thumbnail';
import LightGallery from 'lightgallery/react';
import React, { useEffect, useState } from 'react';
import NavigationThree from '../../components/NavigationThree';

// Styles
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lightgallery.css';
import Axios from '../../utils/httpsClinet';

const HotelGalleryFromDetail = ({ darkmode }) => {
	const [itemObj, setItemObj] = useState({});
	const [strParams, setStrParams] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
		const searchParams = window.location.search;
		if (searchParams) {
			fetchData(searchParams);
			setStrParams(searchParams);
		}
	}, []);

	const fetchData = searchParams => {
		setLoading(true);
		Axios()
			.get(`api/v1/somo-travel/tour-prices-hotel-info2${searchParams === undefined ? strParams : searchParams}`)
			.then(r => {
				let data = r?.data?.data;

				setItemObj(data);
			})
			.catch(e => {
				setItemObj({});
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div className='min-h-screen pb-[65px] dark:bg-[#141414]'>
			<NavigationThree darkmode={darkmode} title={itemObj?.name} />
			<div className='container_main'>
				<LightGallery plugins={[lgThumbnail]} elementClassNames='grid grid-cols-2 gap-2.5'>
					{itemObj?.photos?.map((item, index) => {
						return (
							<a key={index} href={item.full_path} className='col-span-1 relative h-[150px] w-full rounded-[10px] mb-[7px] overflow-hidden'>
								<img
									onError={e => {
										e.target.src =
											'https://img.wattpad.com/8f19b412f2223afe4288ed0904120a48b7a38ce1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5650722d38464e2d744a515349673d3d2d3234323931353831302e313434336539633161633764383437652e6a7067';
									}}
									src={item.full_path}
									className='h-full w-full object-cover'
									alt=''
								/>
							</a>
						);
					})}
				</LightGallery>
			</div>
		</div>
	);
};

export default HotelGalleryFromDetail;
