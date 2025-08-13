import React, { useState } from 'react';
import MapIcon from '../../icons/MapIcon';
import { ArrowRight } from '../itemIcon';
import ModalBottom from '../modal/ModalBottom';
const data = [
	{
		region_id: 1,
		label: '🏙️ Центр и Даунтаун',
		description: 'Даунтаун и центр города — сердце Дубая. Здесь находятся Бурдж-Халифа, Dubai Mall, поющие фонтаны и лучшие туристические отели.',
		selected: false,
		regions: ['Шейх Заед'],
	},
	{
		region_id: 2,
		label: '✅ Бизнес и деловые районы',
		description: 'Бизнес Бей, Аль Хабтур Сити и улица Шейх Зайд – районы с офисами, высотками и современными отелями. Отличный выбор для деловых поездок.',
		selected: false,
		regions: ['Шейх Заед'],
	},
	{
		region_id: 3,
		label: '🧕 Исторический Дубай',
		description: 'Районы Дейра и Бур Дубай – старый город с рынками, музеями и атмосферой настоящего Востока. Здесь много недорогих и уютных отелей.',
		selected: false,
		regions: ['Дейра'],
	},
	{
		region_id: 4,
		label: '🏖️ Пляжные районы Джумейры',
		description: 'Джумейра и Аль Барша – спокойные жилые районы с пляжами, уютными кафе и семейными отелями. Подходят для размеренного отдыха.',
		selected: false,
		regions: ['Аль Барша'],
	},
	{
		region_id: 5,
		label: '🌆 Дубай Марина и тусовка',
		description: 'Современные высотки, яхты, ночная жизнь и модные рестораны. Отлично подойдёт молодым путешественникам и парам.',
		selected: false,
		regions: ['Дубай Марина'],
	},
	{
		region_id: 6,
		label: '🌴 Острова и люкс-курорты',
		description: 'Пальма Джумейра и Остров Мира – это элитный курортный отдых, частные пляжи, резорты и виллы премиум-класса.',
		selected: false,
		regions: ['Остров Мира'],
	},
	{
		region_id: 7,
		label: '🏜️ Пустыня и сафари-отели',
		description: 'Уединённые отели за городом. Здесь можно насладиться звёздным небом, тишиной и пустынным пейзажем. Подходят для романтики и wellness-отдыха.',
		selected: false,
		regions: ['Отели в пустыне'],
	},
	{
		region_id: 8,
		label: '🏗️ Промзона и удалённые районы',
		description: 'Джебель-Али, Nad Al Sheba и схожие зоны – здесь редко, но встречаются хорошие отели. Обычно это более бюджетный и спокойный вариант.',
		selected: false,
		regions: ['Джебель-Али'],
	},
	{
		region_id: 9,
		label: '🎢 Парк развлечений',
		description: 'Dubai Parks and Resorts – зоны с тематическими парками (Legoland, Motiongate). Отличный выбор для семей с детьми.',
		selected: false,
		regions: ['Парк Дубаи'],
	},
];
const ChooseDistrict = ({ darkmode, setSelectedRegions, selectedRegions }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedIds, setSelectedIds] = useState(() => {
		// Dastlab selected true bo‘lgan itemlar idsi
		return data.filter(item => item.selected).map(item => item.region_id);
	});
	const toggleRegion = region_id => {
		let newSelectedIds;
		if (selectedIds.includes(region_id)) {
			newSelectedIds = selectedIds.filter(id => id !== region_id);
		} else {
			newSelectedIds = [...selectedIds, region_id];
		}
		setSelectedIds(newSelectedIds);

		// Shu yerda name'larni yig'amiz
		const selectedNames = data.filter(item => newSelectedIds.includes(item.region_id)).flatMap(item => item.regions);

		// Parentga faqat name'lar yuboriladi
		setSelectedRegions(selectedNames);
	};
	return (
		<div>
			<div
				onClick={() => {
					setIsOpen(true);
				}}
				className='mx-[10px] bg-white p-[15px] dark:bg-[#272829] dark:text-white rounded-lg flex  justify-between items-center cursor-pointer'
			>
				<div className='flex items-center gap-[5px]'>
					<MapIcon />
					Поможем выбрать район
					<span className='text-[#235DFF] font-medium'>({selectedIds.length})</span>
				</div>
				<ArrowRight fill={darkmode ? '#fff' : '#042B50'} />
			</div>
			<ModalBottom
				close={() => setIsOpen(false)}
				modal={isOpen}
				heightModal='min-h-[20vh] max-h-[80vh]'
				btnShow={false}
				translateY='translate-y-[80vh]'
				content={
					<div className='flex flex-col gap-3  w-full  py-2 '>
						{data?.map((item, index) => {
							const checked = selectedIds.includes(item.region_id);

							return (
								<div className='bg-white dark:bg-[#272829] dark:text-white p-4 w-full rounded-xl flex flex-col gap-3' key={index}>
									<div className='font-medium flex items-center gap-3'>
										<input type='checkbox' className=' dark:text-black' checked={checked} onChange={() => toggleRegion(item.region_id)} />
										{item?.label}
									</div>
									<div className=' text-sm leading-[20px]'>{item?.description}</div>
								</div>
							);
						})}
					</div>
				}
			/>
		</div>
	);
};

export default ChooseDistrict;
