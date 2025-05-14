import React, { useEffect } from 'react';

const OverflowHidden = ({ children }) => {
	useEffect(() => {
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);

	return <>{children}</>;
};

export default OverflowHidden;
