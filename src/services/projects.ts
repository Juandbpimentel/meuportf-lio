import api from './api'
import axios from 'axios'

export type ProjectApiConfig = {
    baseUrl: string
    placeholder: string
    method: 'GET' | 'POST'
    healthPath?: string
}

export async function fetchProjectStatus(config: ProjectApiConfig) {
    const url = `${config.baseUrl}${config.healthPath ?? config.placeholder}`
    if (config.method === 'GET') {
        const res = await axios.get(url)
        return { status: 'online', info: res.statusText || 'OK' }
    }
    const res = await axios.post(url)
    return { status: 'online', info: res.statusText || 'OK' }
}

export async function sendContact(payload: { name: string; email: string; message: string }) {
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT
    if (!endpoint) {
        throw new Error('Configure VITE_CONTACT_ENDPOINT para enviar mensagens')
    }
    const res = await api.post(endpoint, payload)
    return res.data
}
