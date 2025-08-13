import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from '../../utils/httpsClinet';
import BasicDatePicker from '../ui/BasicDatePicker';
import GenderSelector from '../ui/GenderSelector';
import RSelect from '../ui/RSelect';
import InputUi from '../ui/inputUi';
const HotelTourBookingForm = ({ people, onSubmitt, formsData }) => {
	const [formData, setFormData] = useState({});
	const [errors, setErrors] = useState({});
	const [selectedGender, setSelectedGender] = useState(null);
	const [country_list, setCountryList] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		if (people?.key) {
			const key = people?.key;
			setFormData({
				firstName: formsData?.[key]?.firstName || '',
				lastName: formsData?.[key]?.lastName || '',
				birthDate: formsData?.[key]?.birthDate || '',
				citizenship: formsData?.[key]?.citizenship || '',
				docType: formsData?.[key]?.docType || 'Заграничный паспорт',
				seria: formsData?.[key]?.seria || '',
				documentNumber: formsData?.[key]?.documentNumber || '',
				docIssued: formsData?.[key]?.docIssued || '',
				validUntil: formsData?.[key]?.validUntil || '',
				age: formsData?.[key]?.validUntil || '',
				human: formsData?.[key]?.human || '',
			});

			setSelectedGender(formsData?.[key]?.gender || null);
		}
	}, [people]);

	useEffect(() => {
		getCountryList();
	}, []);

	const getCountryList = () => {
		Axios()
			.get('/api/references/country-list')
			.then(res => {
				let newD = [];
				res?.data?.data?.forEach(el => {
					newD = [...newD, { value: el?.id, label: el?.name }];
				});
				setCountryList(newD);
			})
			.catch(err => {
				console.log(err);
			});
	};

	const handleSubmit = e => {
		e.preventDefault();
		let tt = true,
			validationErrors = {};
		if (!formData?.firstName) {
			tt = false;
			validationErrors = { ...validationErrors, firstName: true };
		}
		if (selectedGender === null) {
			tt = false;
			validationErrors = { ...validationErrors, gender: true };
		}
		if (!formData?.lastName) {
			tt = false;
			validationErrors = { ...validationErrors, lastName: true };
		}
		if (!formData?.birthDate || errors?.birthDate) {
			tt = false;
			validationErrors = { ...validationErrors, birthDate: true };
		}
		if (!formData?.citizenship) {
			tt = false;
			validationErrors = { ...validationErrors, citizenship: true };
		}
		// if (!formData?.human) {
		// 	tt = false;
		// 	validationErrors = { ...validationErrors, human: true };
		// }
		// if (!formData?.docType) {
		// 	tt = false;
		// 	validationErrors = { ...validationErrors, docType: true };
		// }

		if (!formData?.seria) {
			tt = false;
			validationErrors = { ...validationErrors, seria: true };
		}
		if (!formData?.documentNumber) {
			tt = false;
			validationErrors = { ...validationErrors, documentNumber: true };
		}
		if (!formData?.docIssued || errors?.docIssued) {
			tt = false;
			validationErrors = { ...validationErrors, docIssued: true };
		}
		if (!formData?.validUntil || errors?.validUntil) {
			tt = false;
			validationErrors = { ...validationErrors, validUntil: true };
		}

		if (tt) {
			onSubmitt(people?.key, {
				firstName: formData?.firstName,
				lastName: formData?.lastName,
				birthDate: formData?.birthDate,
				citizenship: formData?.citizenship,
				docType: 'Заграничный паспорт',
				seria: formData?.seria,
				documentNumber: formData?.documentNumber,
				docIssued: formData?.docIssued,
				validUntil: formData?.validUntil,
				gender: selectedGender,
				human: formData?.human,
			});
			// setModal(false);
			navigate(-1);
		} else {
			setErrors(validationErrors);
		}
	};

	const handleChange = e => {
		const { name, value } = e?.target;
		// setFormData(prev => ({
		// 	...prev,
		// 	[name]: value,
		// }));
		// setErrors(prev => ({
		// 	...prev,
		// 	[name]: false,
		// }));

		if (name === 'seria') {
			const uppercaseValue = value.toUpperCase();
			if (/^[A-Z]{0,2}$/.test(uppercaseValue)) {
				setFormData(prev => ({
					...prev,
					[name]: uppercaseValue,
				}));
				setErrors(prev => ({
					...prev,
					[name]: false,
				}));
			}
		} else if (name === 'documentNumber') {
			const cleanedValue = value.replace(/\D/g, '');
			if (cleanedValue.length <= 7) {
				setFormData(prev => ({
					...prev,
					[name]: cleanedValue,
				}));
				setErrors(prev => ({
					...prev,
					[name]: false,
				}));
			}
		} else if (name === 'validUntil') {
			const dvalue = new Date(value);
			if (dvalue.getFullYear() < 9999) {
				setFormData(prev => ({
					...prev,
					[name]: value,
				}));
				setErrors(prev => ({
					...prev,
					[name]: false,
				}));
			}
		} else if (name === 'docIssued') {
			const dvalue = new Date(value);
			if (dvalue.getFullYear() < 9999) {
				setFormData(prev => ({
					...prev,
					[name]: value,
				}));
				setErrors(prev => ({
					...prev,
					[name]: false,
				}));
			}
		} else {
			setFormData(prev => ({
				...prev,
				[name]: value,
			}));
			setErrors(prev => ({
				...prev,
				[name]: false,
			}));
		}
	};
	const handleChangeDate = (e, name) => {
		const value = e.target.value;

		// Faqat formatni tekshiruvchi regex
		const formatRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

		let isValid = false;

		if (formatRegex.test(value)) {
			const [day, month, year] = value.split('/').map(Number);

			const date = new Date(year, month - 1, day); // month - 1 chunki JSda 0-11
			// Tekshiradi: Sana to'g'rimi va kiritilgan kun, oy, yil saqlanadimi
			isValid = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day && year >= 1900 && year <= 2100;
		}

		setFormData(prev => ({
			...prev,
			[name]: value,
		}));

		setErrors(prev => ({
			...prev,
			[name]: !isValid, // noto‘g‘ri bo‘lsa xato chiqaradi
		}));
	};

	const handleSelectChange = e => {
		setFormData(prev => ({
			...prev,
			citizenship: e,
		}));
		setErrors(prev => ({
			...prev,
			citizenship: false,
		}));
	};

	const handleSelectChangeHuman = e => {
		setFormData(prev => ({
			...prev,
			human: e.target.value,
		}));
		setErrors(prev => ({
			...prev,
			human: false,
			gender: false,
		}));

		if (e.target.value === 'MR') {
			setSelectedGender('male');
		} else if (e.target.value === 'MRS') {
			setSelectedGender('female');
		} else if (e.target.value === 'CHD') {
			setSelectedGender('male');
		} else {
			setSelectedGender(null);
		}
	};
	const mr_options = [
		{ value: 'MR', label: 'Mr - Господин' },
		{ value: 'MRS', label: 'Mrs - Госпожа' },
		{ value: 'CHD', label: 'CHD - Ребенок до 16' },
	];

	return (
		<form onSubmit={handleSubmit}>
			<div className='dark:bg-[#141414]  rounded-xl w-full'>
				<div className='flex flex-col justify-between  w-full '>
					<div className='flex flex-col gap-4'>
						{/* <InputUi
						value={formData.human}
						err={errors}
						onChange={handleSelectChangeHuman}
						name='human'
						label=''
						placeholder='Введите фамилию на Латинице'
						type='select'
						options={mr_options}
					/> */}
						<GenderSelector err={errors} setErrors={setErrors} selectedGender={selectedGender} setSelectedGender={setSelectedGender} />
						<InputUi
							is_label={true}
							value={formData.lastName}
							err={errors}
							onChange={handleChange}
							name='lastName'
							placeholder='Введите фамилию на Латинице'
							label={'Фамилия'}
						/>
						<InputUi label={'Имя'} value={formData.firstName} err={errors} onChange={handleChange} name='firstName' is_label={true} placeholder='Введите имя на Латинице' />
						<div className='flex gap-[10px]'>
							<BasicDatePicker
								custrom_label={'Дата рождения'}
								value={formData.birthDate || null}
								error={errors}
								name='birthDate'
								onChange={v => handleChangeDate(v, 'birthDate')}
							/>

							<div className='w-full'>
								<span className={`text-sm font-normal px-2  mb-[1px] text-[#141414]  dark:text-white`}>{'Граждаствно'}</span>
								<RSelect
									value={formData.citizenship}
									err={errors}
									label={'Граждаствно'}
									onChange={handleSelectChange}
									name='citizenship'
									is_label={true}
									placeholder={'Выберите'}
									options={country_list}
								/>
							</div>
						</div>
						<InputUi
							label={'Тип документа'}
							value={formData.docType}
							err={errors}
							onChange={() => {}}
							name='docType'
							is_label={true}
							disabled={true}
							placeholder='Заграничный паспорт'
						/>
						<div className='flex gap-[10px]'>
							<InputUi label={'Серия'} value={formData.seria} err={errors} onChange={handleChange} name='seria' w='w-1/4' is_label={true} placeholder='AA' />
							<InputUi
								label={'Номер паспорта или ID-карты'}
								value={formData.documentNumber}
								err={errors}
								onChange={handleChange}
								name='documentNumber'
								w='w-3/4'
								is_label={true}
								placeholder='1234567'
							/>
						</div>
						<div className='flex gap-[10px]'>
							<BasicDatePicker
								custrom_label={'Документ выдан'}
								value={formData.docIssued || null}
								error={errors}
								name='docIssued'
								onChange={v => handleChangeDate(v, 'docIssued')}
							/>
							<BasicDatePicker
								custrom_label={'Действителен до'}
								value={formData.validUntil || null}
								error={errors}
								name='validUntil'
								onChange={v => handleChangeDate(v, 'validUntil')}
							/>
						</div>
						<div className='bg-[#BBD3FF] rounded-[10px] p-[15px] text-sm flex gap-3 items-center'>
							<div className='min-w-[25px] min-h-[25px]'>
								<svg width='29' height='25' viewBox='0 0 29 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='M15.3114 17.2354H13.613L13.6017 15.6729H15.3114V17.2354ZM13.6017 13.9302H15.3V7.76458H13.6017V13.9302ZM14.4565 2.34375C8.36956 2.34375 3.41711 6.9 3.41711 12.5C3.41711 18.1 8.36956 22.6562 14.4565 22.6562C20.5435 22.6562 25.4959 18.1 25.4959 12.5C25.4959 6.9 20.5435 2.34375 14.4565 2.34375Z'
										fill='#235DFF'
									/>
								</svg>
							</div>
							<p className='  text-sm !leading-[18px]'> Срок истечения документа должен быть не менее 6 месяцев после окончания тура</p>{' '}
						</div>
					</div>
				</div>
			</div>
			<div className=' dark:bg-[#141414] container_main !px-0 !mt-4 bg-white z-30  w-full  bottom-0 left-0 right-0'>
				<div className='!container py-1 !px-0'>
					<button
						className={`mb-[10px] w-full  h-[50px] flex items-center justify-center gap-2 md:font-semibold font-medium md:text-base text-sm md:px-4 px-1.5 py-3 rounded-xl duration-150 cursor-pointer mt-4 border border-blueRibbon bg-blueRibbon text-white`}
						type='submit'
					>
						Сохранить данные
					</button>
				</div>
			</div>
		</form>
	);
};

export default HotelTourBookingForm;
