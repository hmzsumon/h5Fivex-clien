import React from 'react';

const MyTestPage = () => {
	return (
		<div>
			<h1 className='text-3xl font-bold text-center mt-10'>My Test Page</h1>
			<p className='text-center mt-5'>
				This is a simple test page to demonstrate the structure.
			</p>
			<div className='flex justify-center mt-10'>
				<button className='px-4 py-2 bg-blue-500 text-white rounded'>
					Click Me!
				</button>
			</div>
		</div>
	);
};

export default MyTestPage;
