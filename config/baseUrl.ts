let baseUrl = '';
if (process.env.NODE_ENV === 'development') {
	// Code specific to development mode
	baseUrl = 'http://localhost:8000';
	// console.log('Running in development mode');
} else {
	//Global-X-api-1901b8e6064a.herokuapp.com/
	https: baseUrl = 'https://h5fivex-api-f483cf4d7ab3.herokuapp.com';
	// Code specific to production mode
	// console.log('Running in production mode');
}
// console.log('baseUrl', baseUrl);
export default baseUrl;
