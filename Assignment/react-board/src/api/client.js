import axios from 'axios'

// 환경 변수로 API 주소를 바꾸면 배포 환경에서도 같은 빌드를 재사용할 수 있다.
const client = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api', timeout: 5_000 })
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
export default client
