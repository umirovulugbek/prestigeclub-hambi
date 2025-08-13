import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { months_ru, months_uz } from '../../utils/constants';
import Axios from '../../utils/httpsClinet';
import { planIcon } from '../homeS3Icon';

const fetchTownFrom = async town_from_inc => {
	const { data } = await Axios().get('api/v1/search/town-from');
	return data?.data?.find(el => el?.somo_id === Number(town_from_inc));
};

const fetchTowns = async (town_from_inc, tour_operator_id, state_id, somo_id) => {
	const { data } = await Axios().get(`api/v1/search/towns?town_from_inc=${town_from_inc}&tour_operator_id=${tour_operator_id}&state_id=${state_id}`);
	return data?.data?.find(el => el?.somo_id === Number(somo_id));
};

const HeaderDetailParams = ({ darkmode }) => {
	const { t, i18n } = useTranslation();
	const urlParams = new URLSearchParams(window.location.search);

	const town_from_inc = urlParams.get('town_from_inc');
	const tour_operator_id = urlParams.get('tour_operator_id');
	const state_id = urlParams.get('state_id');
	const tour_somo_id = urlParams.get('tour_somo_id');

	const formatDate = checkin => {
		if (!checkin || checkin.length !== 8) return '';
		const month = parseInt(checkin.slice(4, 6), 10) - 1;
		const day = parseInt(checkin.slice(6, 8), 10);
		return `${day} ${(i18n?.language === 'uz' ? months_uz : months_ru)[month]}`;
	};

	const { data: departureData, isLoading: loadingDeparture } = useQuery({
		queryKey: ['townFrom', town_from_inc],
		queryFn: () => fetchTownFrom(town_from_inc),
		enabled: !!town_from_inc,
		staleTime: 1000 * 60 * 5,
	});

	const { data: townData, isLoading: loadingTown } = useQuery({
		queryKey: ['towns', town_from_inc, tour_operator_id, state_id, tour_somo_id],
		queryFn: () => fetchTowns(town_from_inc, tour_operator_id, state_id, tour_somo_id),
		enabled: !!(town_from_inc && tour_operator_id && state_id && tour_somo_id),
		staleTime: 1000 * 60 * 5,
	});

	return (
		<div className='whitespace-normal rounded-xl dark:text-white text-blueWood'>
			<div className='flex justify-between gap-3'>
				<div className='flex gap-[10px] items-start'>
					{loadingDeparture ? (
						<Skeleton width={100} height={23} style={{ borderRadius: '8px' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
					) : (
						<p className='text-lg font-normal'>{departureData?.name}</p>
					)}
					<p className='mt-[7px]'>{planIcon}</p>
					{loadingTown ? (
						<Skeleton width={100} height={23} style={{ borderRadius: '8px' }} baseColor={darkmode ? '#36393E' : '#DADADA'} />
					) : (
						<p className='text-lg font-normal break-all line-clamp-1'>{townData?.name}</p>
					)}
				</div>
			</div>
			<div className='whitespace-nowrap text-sm font-normal'>
				{urlParams.get('checkin') ? formatDate(urlParams.get('checkin')) + ', ' : ''}
				{Number(urlParams.get('adult')) + Number(urlParams.get('childs'))} {t('home.turist')}, {urlParams.get('nights')} {t('home.nights')}
			</div>
		</div>
	);
};

export default HeaderDetailParams;
