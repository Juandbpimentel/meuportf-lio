import axios from 'axios'

const api = axios.create({
    // Use relative requests by default -- frontend will call VITE_CONTACT_ENDPOINT when configured.
    baseURL: '/',
    headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error?.response?.data?.message || error?.message || 'Erro desconhecido'
        return Promise.reject(new Error(message))
    },
)

export default api
