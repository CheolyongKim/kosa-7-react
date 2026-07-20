# Boardly

React + Vite 기반의 학습용 게시판입니다. Spring Boot REST API와 연결할 수 있으며, API가 실행되지 않은 경우에는 로컬 브라우저 저장소를 사용해 CRUD 흐름을 시연합니다.

## 실행

```bash
pnpm install
pnpm dev
```

개발 서버는 `/api` 요청을 `http://192.168.2.196:8080`으로 프록시해 CORS 문제 없이 연결합니다. 다른 서버를 쓰려면 `vite.config.js`의 `target`을 바꿉니다. 배포 환경에서 프런트와 API 도메인이 다르면 백엔드 CORS 설정 또는 `VITE_API_BASE_URL` 설정이 필요합니다.

## 설계 판단 근거

| 선택 | 이유 |
| --- | --- |
| React Router | URL을 화면 상태로 관리하므로 목록·상세·수정 화면을 새로고침해도 같은 위치를 복원할 수 있습니다. |
| TanStack Query | 게시글은 서버가 기준인 데이터입니다. 캐시, 로딩·오류 상태, 변경 후 무효화를 한곳에서 처리합니다. |
| Zustand | 로그인한 사용자처럼 UI 전반에서 빠르게 참조할 작은 클라이언트 상태에만 사용합니다. 서버 데이터를 중복 보관하지 않습니다. |
| Axios 인스턴스 | base URL, timeout, 인증 헤더를 공통 설정해 API 호출의 중복과 누락을 줄입니다. |
| `staleTime: 30초` | 목록 왕복 시 요청을 줄이되 너무 오래된 정보를 보여주지 않는 균형점입니다. 캐시 삭제 시간과는 다릅니다. |
| 로컬 폴백 | 네트워크 연결 실패일 때만 사용합니다. 서버가 4xx/5xx를 응답한 경우에는 실제 오류를 그대로 노출해 문제를 감추지 않습니다. |

## Spring Boot API 계약

- `GET /boards`: `BoardSummaryResponse[]` 배열
- `GET /boards/{id}`
- `POST /boards`: `{ title, writer, content }`
- `PUT /boards/{id}`: `{ title, content }` (`writer`는 수정 불가)
- `DELETE /boards/{id}`

프런트 개발 서버(`http://localhost:5173`)에서 연결하려면 Spring Boot에 `/api/**` 대상 CORS 설정이 필요합니다.
