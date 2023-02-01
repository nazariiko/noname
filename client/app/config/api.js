const uri = 'http://localhost:5000'
// const uri = 'https://noname-api.up.railway.app'
export const config = {
    createUrl: (path) => `${uri}/api/${path}`
}