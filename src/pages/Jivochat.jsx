import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NavigationOne from '../components/ui/NavigationOne';

const JivoChat = ({ darkmode }) => {
	const { t } = useTranslation();
	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://jivo.chat/wNWz7oVBB6';
		script.async = true;
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	return (
		<div className=' dark:bg-[#141414] min-h-screen pb-[65px]'>
			<NavigationOne darkmode={darkmode} linkClose={false} text={t('home.support')} />
			<div id='jivo_chat_widget' className=' dark:bg-[#141414]' style={{ position: 'fixed', bottom: '10px', top: '80px', right: '0px', left: 0, width: '100%', height: '90%' }}>
				<iframe title='JivoChat Widget' src='https://jivo.chat/widget/wNWz7oVBB6' style={{ width: '100%', height: '100%', border: 'none' }} />
			</div>
		</div>
	);
};

export default JivoChat;
