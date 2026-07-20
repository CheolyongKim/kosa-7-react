import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 개발 환경에서는 브라우저가 Vite 서버에만 요청한다.
// Vite가 /api 요청을 백엔드로 전달하므로 CORS 헤더가 없어도 로컬 개발이 가능하다.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.2.196:8080",
        changeOrigin: true,
      },
    },
  },
});
