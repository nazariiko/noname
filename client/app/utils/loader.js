const API = 'http://localhost:5000/api/static'
// const API = 'https://noname-api.up.railway.app/api/static'
export default (src) => {
    return `${API}${src}`
}