'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeSwitch = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<>
			<label className="ui-switch">
				<input
					type="checkbox"
					value={theme}
					checked={theme === 'light' ? undefined : true}
					onChange={(e) => setTheme(theme === 'light' ? 'dark' : 'light')}
				></input>
				<div className="slider">
					<div className="circle"></div>
				</div>
			</label>
		</>
	);
};

export default ThemeSwitch;
