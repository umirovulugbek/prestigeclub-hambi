
import React from 'react';
import Select from 'react-select';
import useReactSelectConfig from '../../hooks/useReactSelectConfig';
const RSelect = props => {
	const reactSelectConfiguration = useReactSelectConfig();
	return (
		<Select
			maxMenuHeight={200}
			className={props?.err?.[props.name] ? 'border border-red rounded-xl' : ''}
			placeholder={props?.placeholder}
			{...reactSelectConfiguration}
			onChange={props?.onChange}
			{...props}
			isDisabled={props?.disabled}
			options={props?.options}
		// menuPlacement="auto"
		// menuPosition="fixed"
		/>
	);
};

export default RSelect;
