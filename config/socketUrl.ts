// config/socketUrl.ts
let socketUrl = '';

if (process.env.NODE_ENV === 'development') {
	socketUrl = 'http://localhost:8000'; // local socket server
} else {
	socketUrl = 'https://h5fivex-api-f483cf4d7ab3.herokuapp.com'; // deployed socket server
}

export default socketUrl;
