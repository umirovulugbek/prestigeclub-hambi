import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Axios from '../../../utils/httpsClinet';
import { setToken } from '../../../utils/tokenStorge';
import ButtonMain from '../../ButtonMain';
import LoaderRound from '../../LoaderRound';
import Input from '../../form/Input';
import { CloseIcon } from '../../homeS3Icon';
import ModalBottom from '../../modal/ModalBottom';

const ModalLogin = ({
	modal,
	darkmode,
	// obj,
	// setObj,
	// objError,
	// setObjError,
}) => {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);

	const [obj, setObj] = useState({
		name: '',
		password: '',
	});
	const [objError, setObjError] = useState({
		name: false,
		password: false,
	});

	const changeInput = event => {
		setObj({ ...obj, [event.target.name]: event.target.value });
		setObjError({ ...objError, [event.target.name]: false });
	};

	const handleLogin = e => {
		e.preventDefault();

		setLoading(true);
		let tt = true,
			error = {};

		if (!obj?.name) {
			tt = false;
			error = { ...error, name: true };
		}
		if (!obj?.password) {
			tt = false;
			error = { ...error, password: true };
		}

		let objNew = {
			name: obj?.name?.replace(/[^\d]/g, ''),
			password: obj?.password,
		};

		if (tt) {
			Axios()
				.post(`https://tripusk.yarbek.uz/api/v1/auth/login`, objNew)
				.then(r => {
					setToken(r?.data?.access_token);
					dispatch({ type: 'SET_USER', payload: r?.data?.user ?? {} });

					dispatch({ type: 'LOGIN_MODAL', payload: false });
					setLoading(false);
				})
				.catch(e => {
					dispatch({ type: 'LOGIN_MODAL', payload: false });
					setLoading(false);
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			setObjError(error);
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		}
	};

	return (
		<div className='w-full'>
			<ModalBottom
				close={() => dispatch({ type: 'LOGIN_MODAL', payload: false })}
				modal={modal}
				heightModal='min-h-[20vh] max-h-[80vh]'
				btnShow={false}
				translateY='translate-y-[80vh]'
				content={
					<div className='w-full'>
						<div className='flex items-center justify-between w-full gap-3'>
							<p className='font-semibold text-xl'>Войти</p>
							<CloseIcon className='cursor-pointer' onClick={() => dispatch({ type: 'LOGIN_MODAL', payload: false })} />
						</div>
						<div>
							<form onSubmit={handleLogin} className='mt-[30px] flex flex-col gap-6'>
								<Input
									type='phone'
									placeholder='выберите'
									title='Введите номер телефона'
									error={objError?.name ? true : false}
									value={obj?.name}
									name={'name'}
									onChange={changeInput}
									darkmode={darkmode}
								/>
								<Input
									type='password'
									placeholder='Пароль'
									title='Введите пароль'
									error={objError?.password ? true : false}
									value={obj?.password}
									name={'password'}
									onChange={changeInput}
									darkmode={darkmode}
								/>
								<ButtonMain type='submit' type_color='t_blue' className='w-full mb-3' onClick={() => {}} text={loading ? <LoaderRound size={16} /> : 'Войти'} />
							</form>
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default ModalLogin;
