import { useState } from 'react'
import './App.css'
import TodoForm from './component/TodoForm';
import TodoList from './component/TodoList';

/*
function useState(initialValue) {
    let value = []];
    function setValue(newValue) {
        value = newValue;
    }
    return [value, setValue];
}
사용하면
const [count, setCount] = useState([]);
*/

function App() {

  //데이터 관리 (배열 빈배열) 상태관리 (ussState)
  const [todos , setTodos ] = useState(['a','b','c']);
  //getter , setter 통해서 read , write
  //useState 함수가 재호출 되어도 값을 유지한다
  //setTodos 통해서 useState 값이 바뀌면 함수를 재호출 (새로운 데이터 반영 그림 그리기 위해)

  //함수안에 함수가 생성
  const addTodo = (todo) => {
    //기존 배열에 새로운 값을 추가
    setTodos([...todos,todo]); //기본배열 복제해서 펼쳐놓고 새로운 값 추가 (spread 연산자)
  }
  
   //값을 삭제하는 함수
   const removeTodo = (index) => {
      //반드시 기억
      // isArray , map , forEach , filter (4 놈의 함수가 ...)
      /*
       let array = [3,5,11,0,9,'String']
       let result = array.filter((value)=> value < 10)
       result 새로운 배열
       result 출력 : [3,5,0,9]
      */
      setTodos(todos.filter((_,i)=> i !== index));

      //(_,i)=> i !== index
      // _ 자리는 값이 들어오는 자리  >> 나는 배열의 값을 쓰지않을거여 ( _ 무시)

      /*
        const todos = ["잠자기", "밥먹기" , "책읽기"];
        const index = 1; //배열의 index
        //배열에서 "밥먹기" 값을 삭제

        const newTodos = todos.filter((_,i)=> i !== index)
        //결과
        newTodos = ["잠자기", "책읽기"];
      */

      //질문 : why addTodo , removeTodo 를 App.jsx 가지고 있을까요 :   const [todos , setTodos ] = useState([]);
   }

  return (
    <div style={{padding:'15px'}}> 
      <h3>Todo List</h3>
      <TodoForm addTodo={addTodo} /> 
      <TodoList todos={todos} removeTodo={removeTodo} />
    </div>
  )
}

export default App
