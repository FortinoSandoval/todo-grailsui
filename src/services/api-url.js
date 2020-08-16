let apiUrl = '';
if (process.env.NODE_ENV === 'production') {
  apiUrl = '/api/'
} else {
  apiUrl = 'http://localhost:8080/api/'
}
export default apiUrl;
