import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Range } from 'react-range';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSearchParams } from '../../../utils/function';
import ModalBottom from '../../modal/ModalBottom';

const ModalFilter = ({ modal, setModal, filter_option }) => {
	const { search } = useLocation();
	const navigate = useNavigate();
	const paramsObj = getSearchParams();

	const { t, i18n } = useTranslation();
	const [values, setValues] = useState([0, 0]);
	const [selectedStars, setSelectedStars] = useState([]);
	const [tags, setTags] = useState([]);

	const handleStarSelection = star => {
		setSelectedStars(prev => (prev.includes(+star) ? prev.filter(s => s !== +star) : [...prev, +star]));
	};
	const handleChange = values => {
		setValues(values);
	};

	useEffect(() => {
		if (filter_option?.price_range?.min && filter_option?.price_range?.max) {
			setValues([filter_option?.price_range?.min, filter_option?.price_range?.max]);
		}
	}, [filter_option]);

	useEffect(() => {
		const params = new URLSearchParams(search);

		const minPrice = params.get('price_min');
		const maxPrice = params.get('price_max');

		if (paramsObj?.price_min && paramsObj?.price_max) {
			setValues([Number(minPrice), Number(maxPrice)]);
		}

		const stars = params.getAll('stars[]').map(Number);

		setSelectedStars(stars.length ? stars?.map(item => Number(item)) : []);

		const selectedTagIds = params.getAll('tags[]').map(Number);

		setTags(prevTags =>
			prevTags.map(tag => ({
				...tag,
				selected: selectedTagIds.includes(tag.id),
			}))
		);
	}, [search, filter_option]);

	const SubmitFilter = () => {
		const params = new URLSearchParams(search);

		// Avval eski qiymatlarni o‘chirish
		params.delete('price_min');
		params.delete('price_max');
		params.delete('stars[]');
		params.delete('tags[]');

		params.append('price_min', values[0]);
		params.append('price_max', values[1]);

		selectedStars.forEach(star => {
			params.append('stars[]', star);
		});

		tags.filter(tag => tag.selected).forEach(tag => {
			params.append('tags[]', tag.id);
		});

		navigate(`?${params.toString()}`);

		setModal(false);
	};

	return (
		<div className='w-full'>
			<ModalBottom
				close={() => setModal(false)}
				modal={modal}
				heightModal='min-h-[20vh] max-h-[80vh]'
				btnShow={false}
				translateY='translate-y-[80vh]'
				content={
					<div className='w-full'>
						<div className='flex items-center justify-between w-full gap-3 mb-2'>
							<p className='font-semibold text-[20px] text-[#141414] dark:text-white'>{t('home.filters')}</p>
						</div>
						<div className='mb-6 bg-white dark:bg-[#272829] rounded-xl pt-[15px] py-[25px] px-[10px]'>
							<label className='block text-[17px] font-medium mb-2 dark:text-white '>{t('home.yourBudget')}</label>
							<div className='flex gap-3 mb-6'>
								<div className='flex flex-col w-full'>
									<label htmlFor='' className='text-[#76787A] text-sm'>
										{t('home.from')}
									</label>
									<div className='bg-[#EBF0F5] dark:bg-[#141414] dark:text-[#76787A] rounded-lg p-[10px] text-[#141414] text-[17px] text-center'>
										{values[0]?.toLocaleString()} {t('home.uzs')}
									</div>
								</div>
								<div className='flex flex-col w-full'>
									<label htmlFor='' className='text-[#76787A] text-sm'>
										{t('home.until')}
									</label>
									<div className='bg-[#EBF0F5] dark:bg-[#141414] dark:text-[#76787A] rounded-lg p-[10px] w-full text-[#141414] text-[17px]  text-center'>
										{values[1]?.toLocaleString()} {t('home.uzs')}
									</div>
								</div>
							</div>

							<div className='px-3'>
								<Range
									values={values}
									step={100000}
									min={filter_option?.price_range?.min}
									max={filter_option?.price_range?.max}
									onChange={handleChange}
									renderTrack={({ props, children }) => (
										<div
											{...props}
											style={{
												...props.style,
												height: '6px',
												backgroundColor: '#ddd',
												position: 'relative',
											}}
										>
											<div
												style={{
													position: 'absolute',
													top: 0,
													left: `${
														((values[0] - filter_option?.price_range?.min) /
															(filter_option?.price_range?.max - filter_option?.price_range?.min)) *
														100
													}%`,
													right: `${
														100 -
														((values[1] - filter_option?.price_range?.min) /
															(filter_option?.price_range?.max - filter_option?.price_range?.min)) *
															100
													}%`,
													height: '6px',
													backgroundColor: '#4A90E2',
												}}
											/>
											{children}
										</div>
									)}
									renderThumb={({ props }) => (
										<div
											{...props}
											style={{
												...props.style,
												height: '28px',
												width: '28px',
												boxShadow: '0px 6px 13px 0px #0000001F',
												borderRadius: '50%',
												backgroundColor: '#fff',
												outline: 'none',
											}}
										/>
									)}
								/>
							</div>
						</div>
						{/* Stars Selection */}
						<div className='mb-6 bg-white dark:bg-[#272829] rounded-xl py-[15px] px-[10px]'>
							<label className='block text-[17px] font-medium mb-2 dark:text-white '>{t('home.stardom')}</label>
							<div className='flex space-x-2'>
								{filter_option?.star_keys?.map((star, index) => (
									<button
										key={index}
										onClick={() => handleStarSelection(Number(star))}
										className={`px-8 py-2 bg-[#EBF0F5] dark:bg-[#141414] dark:text-[#76787A] rounded-3xl gap-1 flex items-center justify-center text-sm ${
											selectedStars.includes(Number(star)) ? '!bg-[#235DFF] text-white dark:!text-white' : ''
										}`}
									>
										<img src='/images/star.svg' alt='' /> {star}
									</button>
								))}
							</div>
						</div>
						{/* <div className='mb-6 bg-white dark:bg-[#272829] rounded-xl py-[15px] px-[10px]'>
							<label className='block text-[17px] font-medium mb-2 dark:text-white '>Выберите регион</label>
							<div className='flex space-x-2'>
								{filter_option?.star_keys?.map((star, index) => (
									<button
										key={index}
										onClick={() => handleStarSelection(star)}
										className={`px-8 py-2 bg-[#EBF0F5] dark:bg-[#141414] dark:text-[#76787A] rounded-3xl gap-1 flex items-center justify-center text-sm ${
											selectedStars.includes(star) ? '!bg-[#235DFF] text-white dark:!text-white' : ''
										}`}
									>
										<img src='/images/star.svg' alt='' /> {star}
									</button>
								))}
							</div>
						</div> */}
						{/* Tags Selection */}
						{/* <div className='mb-6 bg-white dark:bg-[#272829] rounded-xl py-[15px] px-[10px]'>
							<label className='block text-[17px] font-medium mb-2  dark:text-white'>
								{t('home.selected_tags')} ({tags?.filter(item => item?.selected === true)?.length}/{tags?.length})
							</label>
							<div className='flex flex-wrap gap-2'>
								{visibleTags.map((tag, index) => (
									<button
										key={index}
										onClick={() => handleTagToggle(tag.id)}
										className={`px-4 py-2 bg-[#EBF0F5] dark:bg-[#141414] dark:text-[#76787A] rounded-3xl text-sm ${
											tag.selected ? '!bg-[#235DFF] text-white dark:!text-white' : ''
										}`}
									>
										{tag.name}
									</button>
								))}
								<div className='w-full flex justify-center '>
									{tags.length > 5 && (
										<div
											onClick={() => setShowAll(!showAll)}
											className='px-4 py-2   w-fit   text-base text-center  hover:bg-[#EBF0F5] rounded-3xl dark:hover:bg-[#141414]  cursor-pointer text-[#235DFF] font-medium '
										>
											{showAll
												? t('home.less')
												: i18n?.language === 'ru'
												? `Показать еще ${tags?.length - 5} тегов`
												: `Yana ${tags?.length - 5} ta tegni ko'rsatish`}
										</div>
									)}
								</div>
							</div>
						</div> */}
						<button
							onClick={() => {
								SubmitFilter();
							}}
							className='mt-4 mb-4 w-full py-2 bg-[#1C4ACC] text-white rounded-[12px]'
						>
							{t('home.save')}
						</button>{' '}
					</div>
				}
			/>
		</div>
	);
};

export default ModalFilter;
