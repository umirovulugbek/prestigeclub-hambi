import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const AudioPlayer = () => {
	const audioRef = useRef(null);
	const { t } = useTranslation()
	const [isPlaying, setIsPlaying] = useState(false);
	const [progress, setProgress] = useState(0);
	const [duration, setDuration] = useState(0);

	const togglePlayPause = () => {
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	const handleTimeUpdate = () => {
		setProgress(audioRef.current.currentTime);
	};

	const handleLoadedMetadata = () => {
		setDuration(audioRef.current.duration);
	};

	// const handleProgressClick = e => {
	// 	// Progress bar kengligini va bosilgan joyni hisoblash
	// 	const rect = e.target?.getBoundingClientRect();
	// 	const clickX = e.clientX - rect.left;
	// 	const newTime = (clickX / rect.width) * duration;
	// 	audioRef.current.currentTime = newTime; // Yangi vaqtni o'rnatish
	// 	setProgress(newTime);
	// };
	const handleProgressClick = e => {
		// Progress barning to‘g‘ri kengligini olish uchun currentTarget-dan foydalanamiz
		const rect = e.currentTarget.getBoundingClientRect();
		const clickX = e.clientX - rect.left;
		const newTime = (clickX / rect.width) * duration;

		audioRef.current.currentTime = newTime; // Yangi vaqtni o‘rnatish
		setProgress(newTime);
	};

	const formatTime = time => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60)
			.toString()
			.padStart(2, '0');
		return `${minutes}:${seconds}`;
	};

	return (
		<div className='flex items-end space-x-2 w-full'>
			{/* Play/Pause Button */}
			<button onClick={togglePlayPause}>
				{isPlaying ? (
					<div className='w-[50px] h-[50px] flex justify-center items-center '>
						<div className='rounded-full bg-[#235DFF] w-[41.67px] h-[41.67px] text-white font-black items-center flex justify-center  gap-1 text-[20px]'>
							<span>|</span>
							<span>|</span>
						</div>
					</div>
				) : (
					<svg width='50' height='50' viewBox='0 0 50 50' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M25.0001 4.16675C20.8796 4.16675 16.8517 5.3886 13.4257 7.6778C9.99969 9.96699 7.32943 13.2207 5.7526 17.0275C4.17577 20.8343 3.76321 25.0232 4.56706 29.0645C5.37092 33.1057 7.35511 36.8179 10.2687 39.7315C13.1823 42.6451 16.8944 44.6292 20.9357 45.4331C24.977 46.237 29.1659 45.8244 32.9727 44.2476C36.7795 42.6707 40.0332 40.0005 42.3224 36.5745C44.6116 33.1484 45.8334 29.1205 45.8334 25.0001C45.8334 22.2642 45.2946 19.5551 44.2476 17.0275C43.2006 14.4999 41.666 12.2032 39.7315 10.2687C37.7969 8.33414 35.5003 6.79956 32.9727 5.75259C30.445 4.70562 27.736 4.16675 25.0001 4.16675ZM20.8334 34.3751V15.6251L33.3334 25.0001L20.8334 34.3751Z'
							fill='#235DFF'
						/>
					</svg>
				)}
			</button>
			<div className='w-full flex flex-col '>
				{/* Progress Bar */}

				<div className='flex-1 w-full'>
					<div className='relative h-[15px] bg-[#235DFF26] rounded-full w-full cursor-pointer' onClick={handleProgressClick}>
						<div className='absolute top-0 left-0 h-[15px] !bg-blue-500 rounded-full' style={{ width: `${(progress / duration) * 100}%` }}></div>
					</div>
				</div>

				{/* Time Display */}
				<div className='text-sm  dark:text-white flex justify-between leading-[17.75px] mx-1'>
					<div></div>
					{formatTime(progress)} / {formatTime(duration)}
				</div>
			</div>

			{/* Audio Element */}
			<audio ref={audioRef} src='/audio/travel.mp3' onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata}></audio>
		</div>
	);
};

export default AudioPlayer;
