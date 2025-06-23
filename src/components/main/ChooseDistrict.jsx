import React, { useState } from 'react';
import MapIcon from '../../svg/MapIcon';
import { ArrowRight } from '../itemIcon';
import ModalBottom from '../modal/ModalBottom';
const data = [
	{
		region_id: 1,
		label: '🏙️ Центр и Даунтаун',
		description: 'Даунтаун и центр города — сердце Дубая. Здесь находятся Бурдж-Халифа, Dubai Mall, поющие фонтаны и лучшие туристические отели.',
		selected: false,
	},
	{
		region_id: 2,
		label: '✅ Бизнес и деловые районы',
		description: 'Бизнес Бей, Аль Хабтур Сити и улица Шейх Зайд – районы с офисами, высотками и современными отелями. Отличный выбор для деловых поездок.',
		selected: true,
	},
	{
		region_id: 3,
		label: '🧕 Исторический Дубай',
		description: 'Районы Дейра и Бур Дубай – старый город с рынками, музеями и атмосферой настоящего Востока. Здесь много недорогих и уютных отелей.',
		selected: true,
	},
	{
		region_id: 4,
		label: '🏖️ Пляжные районы Джумейры',
		description: 'Джумейра и Аль Барша – спокойные жилые районы с пляжами, уютными кафе и семейными отелями. Подходят для размеренного отдыха.',
		selected: true,
	},
	{
		region_id: 5,
		label: '🌆 Дубай Марина и тусовка',
		description: 'Современные высотки, яхты, ночная жизнь и модные рестораны. Отлично подойдёт молодым путешественникам и парам.',
		selected: false,
	},
	{
		region_id: 6,
		label: '🌴 Острова и люкс-курорты',
		description: 'Пальма Джумейра и Остров Мира – это элитный курортный отдых, частные пляжи, резорты и виллы премиум-класса.',
		selected: true,
	},
	{
		region_id: 7,
		label: '🏜️ Пустыня и сафари-отели',
		description: 'Уединённые отели за городом. Здесь можно насладиться звёздным небом, тишиной и пустынным пейзажем. Подходят для романтики и wellness-отдыха.',
		selected: true,
	},
	{
		region_id: 8,
		label: '🏗️ Промзона и удалённые районы',
		description: 'Джебель-Али, Nad Al Sheba и схожие зоны – здесь редко, но встречаются хорошие отели. Обычно это более бюджетный и спокойный вариант.',
		selected: false,
	},
	{
		region_id: 9,
		label: '🎢 Парк развлечений',
		description: 'Dubai Parks and Resorts – зоны с тематическими парками (Legoland, Motiongate). Отличный выбор для семей с детьми.',
		selected: true,
	},
];
const ChooseDistrict = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div>
			<div
				onClick={() => {
					setIsOpen(true);
				}}
				className='mx-[10px] bg-white p-[15px] rounded-lg flex  justify-between items-center cursor-pointer'
			>
				<div className='flex items-center gap-[5px]'>
					<MapIcon />
					Поможем выбрать район <span className='text-[#235DFF] font-medium'>(8)</span>
				</div>
				<ArrowRight />
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
							return (
								<div className='bg-white p-4 w-full rounded-xl flex flex-col gap-3' key={index}>
									<div className='font-medium flex items-center gap-3'>
										<input type='checkbox' />
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
