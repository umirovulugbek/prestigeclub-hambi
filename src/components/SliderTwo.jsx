import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import useWindowSize from '../utils/customhook/useWindowSize';
import TopHotelCard from './card/TopHotelCard';

const SliderTwo = ({ list, darkmode, colorWhite = false, priceShow = false, linktrue }) => {
	const { loading_top } = useSelector(s => s);

	const [windowWidth] = useWindowSize();
	const [cardWidth, setCardWidth] = useState(0);
	const [objInfo, setInfoObj] = useState({
		containerWidth: 640,
		cardCount: windowWidth <= 320 ? 1 : 2,
		cardPercentage: windowWidth <= 320 ? 70 : windowWidth <= 640 ? 80 : 89,
	});

	const calculateCardWidth = () => {
		const effectiveContainerWidth = Math.min(objInfo?.containerWidth, windowWidth);
		const totalWidth = effectiveContainerWidth * (objInfo?.cardPercentage / 100);
		return totalWidth / objInfo?.cardCount;
	};

	useEffect(() => {
		const newCardWidth = calculateCardWidth();
		setCardWidth(newCardWidth);
	}, [windowWidth, objInfo?.containerWidth, objInfo?.cardCount, objInfo?.cardPercentage]);

	return (
		<>
			<div
				className='container_main overflow-hidden !pr-0'
				style={{
					width: Math.min(objInfo?.containerWidth, windowWidth),
				}}
			>
				<div className='overflow-x-scroll'>
					<div className='flex space-x-4'>
						{loading_top ? (
							<>
								<Skeleton width={173} height={265} style={{ borderRadius: '8px' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
								<Skeleton width={173} height={265} style={{ borderRadius: '8px' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
								<Skeleton width={173} height={265} style={{ borderRadius: '8px' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
								<Skeleton width={173} height={265} style={{ borderRadius: '8px' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
							</>
						) : (
							<TopHotelCard list={list} darkmode={darkmode} colorWhite={colorWhite} priceShow={priceShow} cardWidth={200} cardWidthShow={true} linktrue={linktrue} />
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default SliderTwo;
