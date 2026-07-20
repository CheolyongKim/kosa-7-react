import axios from "axios";

// 기본값 /api는 Vite 개발 프록시를 거쳐 CORS 문제를 피한다.
// 배포 환경에서는 VITE_API_BASE_URL로 실제 API 주소를 지정할 수 있다.
const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
  timeout: 5_000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
