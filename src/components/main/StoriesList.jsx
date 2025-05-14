import { useState } from 'react';
import StoryCircle from './StoryCircle';
import StoryPlayer from './StoryPlayer';

const storiesData = [
	{
		id: 1,
		username: 'sadriddin',
		avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
		image: '/images/story-danang.svg',
		watched: false,
	},
	{
		id: 2,
		username: 'karimov',
		avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
		image: '/images/story-danang.svg',
		watched: false,
	},
	{
		id: 3,
		username: 'navaib',
		avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
		image: '/images/story-danang.svg',
		watched: false,
	},
	{
		id: 4,
		username: 'hasanxon',
		avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
		image: '/images/story-danang.svg',
		watched: false,
	},
	{
		id: 5,
		username: 'chumoli',
		avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
		image: '/images/story-danang.svg',
		watched: false,
	},
];

const StoriesList = () => {
	const [stories, setStories] = useState(storiesData);
	const [activeIndex, setActiveIndex] = useState(0);
	const [selectedStory, setSelectedStory] = useState(null);

	const handleStoryEnd = () => {
		setStories(prevStories => prevStories.map((s, i) => (i === activeIndex ? { ...s, watched: true, watching: false } : s)));
		setSelectedStory(null);
	};

	const handleStoryClick = index => {
		setStories(prevStories => prevStories.map((story, i) => (i === index ? { ...story, watching: true } : story)));
		setSelectedStory(stories);
		setActiveIndex(index);
	};
	return (
		<div className='flex  gap-5 p-4 bg-[#141414] overflow-x-auto'>
			{stories.map((story, index) => (
				<StoryCircle key={story.id} story={story} onClick={() => handleStoryClick(index)} />
			))}
			{selectedStory && <StoryPlayer stories={selectedStory} activeIndex={activeIndex} onClose={handleStoryEnd} />}
		</div>
	);
};

export default StoriesList;
