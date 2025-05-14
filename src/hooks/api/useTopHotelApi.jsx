import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Axios from '../../utils/httpsClinet';

const useTopHotelApi = () => {
	const dispatch = useDispatch();

	const getTop = async () => {
		const res = await Axios().get(`api/v1/search-v2/top-hotels`);
		return res?.data?.top_hotels;
	};

	const { data: home_top = [], isLoading } = useQuery({
		queryKey: ['top-hotels', 1],
		queryFn: getTop,
		onError: () => {
			dispatch({ type: 'SET_LOADING_TOP', payload: false });
		},
		onSettled: () => {
			dispatch({ type: 'SET_LOADING_TOP', payload: false });
		},
	});

	useEffect(() => {
		dispatch({ type: 'SET_LOADING_TOP', payload: isLoading });
	}, [isLoading, dispatch]);

	return { home_top };
};

export default useTopHotelApi;
