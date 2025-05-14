const StoryCircle = ({ story, onClick }) => {
	return (
		<div className='flex flex-col items-center cursor-pointer' onClick={onClick}>
			<div
				className={`relative w-16 h-16 rounded-full p-[2px]
          ${story.watched ? 'border-gray-500 border' : 'bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#dc2743]'}
        `}
			>
				<div className='rounded-full bg-black p-1'>
					<img src={story.avatar} alt={story.username} className='w-full h-full rounded-full object-cover' />
				</div>
			</div>
			<p className='text-white text-xs truncate w-16'>{story.username}</p>
		</div>
	);
};

export default StoryCircle;
