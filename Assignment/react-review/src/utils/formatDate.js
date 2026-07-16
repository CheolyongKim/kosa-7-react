// 날짜 포맷 로직을 유틸로 분리해 목록/상세/댓글에서 같은 표현을 재사용한다.
export const formatDate = (value) =>
  new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium' }).format(new Date(value));
