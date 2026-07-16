import { createContext } from 'react';

// Fast Refresh 경고를 피하려고 Context 객체를 Provider 파일과 분리했다.
// 컴포넌트는 직접 이 파일을 쓰지 않고 useBoard 커스텀 훅을 통해 접근한다.
export const BoardContext = createContext(null);
