import React from 'react';

interface RankProps {
	name: string;
	entries: number;
}

function Rank({ name, entries }: RankProps) {
	return (
		<div>
			<div className='white f3'>
				{`${name}, your current entry count is...`}
			</div>
			<div className='white f1'>{entries}</div>
		</div>
	);
}

export default Rank;
