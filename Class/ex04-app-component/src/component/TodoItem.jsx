import React from 'react';

//게시판 데이터 1건
const TodoItem = ({todo, index, removeTodo}) => {
    return (
        <div>
            {todo}
            <button onClick={()=>{ removeTodo(index)}} style={{marginLeft:'10px'}}>DataDelete</button>
        </div>
    );
};

export default TodoItem;