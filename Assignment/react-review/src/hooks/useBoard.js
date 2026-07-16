import { useContext } from 'react';
import { BoardContext } from '../context/BoardContextValue';

// Context 접근을 커스텀 훅으로 감싸서 컴포넌트에서는 useBoard()만 호출하면 된다.
// Provider 밖에서 잘못 사용한 경우에도 즉시 원인을 알 수 있게 에러를 던진다.
export function useBoard() {
  const board = useContext(BoardContext);
  if (!board) throw new Error('useBoard는 BoardProvider 내부에서 사용해야 합니다.');

  return board;
}
