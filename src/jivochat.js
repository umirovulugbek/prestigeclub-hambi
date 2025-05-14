import { useEffect, useState } from 'react';

function JivoChat({ user }) {
	const [unread, setUnread] = useState(0);
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		window.jivo_onLoad = function () {
			window.jivo_api.setOptions({ visible: false });
			window.jivo_api.setContactInfo({
				name: user.name,
				email: user.email,
				phone: user.phone,
			});
		};

		window.jivo_onMessageReceived = function (message) {
			if (message.type === 'operator') {
				setUnread(prev => prev + 1);
			}
		};

		// Чат ochilganda xabarnoma (badge) nolga tushadi
		window.jivo_onOpen = function () {
			setUnread(0);
		};
	}, [user]);

	// Чатni ochish funksiyasi
	const openChat = () => {
		window.jivo_api.open();
	};

	return (
		<div className='relative inline-block'>
			<button
				onClick={openChat}
				onMouseEnter={() => setIsHovered(true)}
				className=' relative px-[20px]  py-[10px] bg-[#C5D2E0] text-[#141414] w-full border-none rounded-lg cursor-pointer'
				onMouseLeave={() => setIsHovered(false)}
			>
				Забронировать с помощью менеджера
				{unread > 0 && (
					<span
						style={{
							position: 'absolute',
							top: '-5px',
							right: '-5px',
							background: 'red',
							color: 'white',
							borderRadius: '50%',
							padding: '5px 10px',
							fontSize: '12px',
						}}
					>
						{unread}
					</span>
				)}
			</button>

			{/* {isHovered && (
				<div className='absolute left-0  top-[-150px] mt-2 w-48 bg-white shadow-lg rounded-lg p-2' style={{ zIndex: 100 }}>
					<a href='https://example.com/help' target='_blank' rel='noopener noreferrer' className='block px-3 py-2 hover:bg-gray-100 rounded-md text-black'>
						📖 Yordam markazi
					</a>
					<a href='https://example.com/contact' target='_blank' rel='noopener noreferrer' className='block px-3 py-2 hover:bg-gray-100 rounded-md text-black'>
						📞 Biz bilan bog‘lanish
					</a>
				</div>
			)} */}
		</div>
	);
}

export default JivoChat;
