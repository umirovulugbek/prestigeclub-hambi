import React, { useEffect, useState } from 'react';
import Stories from 'react-insta-stories';
import PreloadImage from 'react-preload-image';
import { useDispatch, useSelector } from 'react-redux';
import useBroneInfoStory from '../../hooks/stories/useBroneInfoStory';
import useDanangStory from '../../hooks/stories/useDanangStory';
import useIstanbulStory from '../../hooks/stories/useIstanbulStory';
import useNyachangStory from '../../hooks/stories/useNyachangStory';
import useTrabzoneStory from '../../hooks/stories/useTrabzoneStory';
import { CloseIcon } from '../homeS3Icon';

const StoryModal = ({ stories, onClose, setSelectStories }) => {
	const { story_loading } = useSelector(s => s);
	const dispatch = useDispatch();

	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);

	return (
		<div className=''>
			<div className='fixed   inset-0 z-[99999] bg-black flex items-center justify-center' onClick={onClose}>
				<div className='container_main !px-0 w-full'>
					<div className='relative h-screen' onClick={e => e.stopPropagation()}>
						<Stories
							stories={stories}
							onAllStoriesEnd={() => {
								setSelectStories(null);
							}}
							onStoryEnd={() => {
								dispatch({ type: 'SET_STORY_LOADING', payload: true });
							}}
							keyboardNavigation
							autoPlay
							progressStyles={{
								background: '#235DFF',
								borderRadius: '10px',
								height: '5px',
							}}
							progressWrapperStyles={{
								background: '#ffffff',
								borderRadius: '10px',
								height: '5px',
								shadow: 'none',
							}}
							// width={window.innerWidth}
							width={'100%'}
							height={window.innerHeight}
							defaultInterval={3000}
							isPaused={story_loading}
						/>

						<button className='absolute top-7 right-4 text-white text-3xl font-bold p-2  z-[999999] rounded-full ' onClick={onClose}>
							<CloseIcon fill={'#FFFF'} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

const Storiess = () => {
	const [selectStories, setSelectStories] = useState(null);
	const brone_info = useBroneInfoStory();
	const trabzon_story = useTrabzoneStory();
	const danang_story = useDanangStory();
	const nyachang_story = useNyachangStory();
	const istanbul_story = useIstanbulStory();

	const data = [...istanbul_story, ...brone_info, ...trabzon_story, ...nyachang_story];
	return (
		<div className='mb-4 flex gap-3'>
			{data.map(item => (
				<div key={item.id} onClick={() => setSelectStories(item.stories)} className={`min-w-[95px] h-[115px] relative cursor-pointer rounded-lg ${item?.bgColor}`}>
					<PreloadImage
						duration='300ms'
						lazy
						src={item.image}
						alt={item.title}
						className='absolute !rounded-lg w-full h-full object-cover stories-img '
						innerStyle={{
							borderRadius: '8px',
						}}
						style={{
							borderRadius: '8px',
						}}
					/>
					<div className='absolute bottom-2 left-2 right-2   text-white'>{item.title}</div>
				</div>
			))}

			{selectStories && <StoryModal setSelectStories={setSelectStories} stories={selectStories} onClose={() => setSelectStories(null)} />}
		</div>
	);
};

export default Storiess;
