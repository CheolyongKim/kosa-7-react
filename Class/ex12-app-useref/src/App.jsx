import { useState } from 'react'
import './App.css'
import { useRef } from 'react';

function App() {
 
  //1. local variable : 함수가 호출될때마다 초기화
  //2. useState : 함수가 재호출되어도(랜더링) 값 유지 > set 값이 변환 > 자동 랜더링
  //3. useRef : 값으 유지하되 함수가 재 호출 되지 않는다 

  //let countvar = 0; 
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  //{current:0}  접근방식 : countRef.current  > 0 값을 얻는다

  console.log("countRef : " + countRef);
  console.log("APP 랜더링 ...")

  //함수를 2개 만들어서
  //useState 변경  랜더링
  //countRef 변경  랜더링 

  const increaseCount = () =>{
    setCount(count + 1);
  }

  const increaseRef = () => {
    countRef.current = countRef.current + 1;
    console.log("ref : " + countRef.current);
  }


  return (
     <div className="App">
          <p>useState : {count}</p>
          <p>useRef : {countRef.current}</p>

          <button onClick={increaseCount}>useState증가</button>
          <button onClick={increaseRef}>useRef증가</button>
    </div>
  )
}

export default App
