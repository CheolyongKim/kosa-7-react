import { useState } from 'react';
import useTodoStore from '../store/todoStore';

const TodoInput = () => {

    const [text , setText] = useState('');
    const addTodo = useTodoStore((state)=>state.addTodo);
    // 여기서 state 는 현재 스토어 내부에 저장된 값을 나타내는 객체 덩어리 (객체.속성명)
    // { count:0 , addTodo:fucntion(){} , remove:function(){} }  전체를 받아서 특정 자원 사용
    const handleSubmit = (e) => {
        e.preventDefault()
        if(text.trim()){
            addTodo(text);
            setText('');
        }
    }

    return (
     <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="할 일을 입력하세요"  />
      <button type="submit">추가</button>
    </form>
    );
};

export default TodoInput;