import axios from 'axios'

// url Api
const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});


// Error handling
instance.interceptors.response.use(null, error => {
    // 403 && 401 error
    if (error.response && (error.response.status == 403 || error.response.status == 401)) {
        console.error(error.response.data.error);
        return;
    }
    // 404 error
    else if (error.response && error.response.status == 404) {
        console.error('پیدا نشد');
        return;
    }
    console.error('خطای اتصال به سرور')
})

// client
export const client = {
    get: instance.get,
    post: instance.post,
    put: instance.put,
    delete: instance.delete
}