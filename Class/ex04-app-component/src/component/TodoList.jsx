import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({todos , removeTodo}) => {

    //구조분해 할당
    //todos ['잠자기' , '밥먹기' ...]
    //List 에서 TodoItem 사용 배열의 개수만큼 반복
    //javascript : forEach , map , filter ...
    //map(value , index , array)  조작된 배열을 리턴
    return (
        <ul>
            {
                /*
                todos.map((todo,index)=> {   return ...

                })
                */ 
                todos.map((todo,index)=>(
                    <TodoItem key={index} todo={todo} index={index} removeTodo={removeTodo} />
                ))   
            }
        </ul>
    );
};

export default TodoList;