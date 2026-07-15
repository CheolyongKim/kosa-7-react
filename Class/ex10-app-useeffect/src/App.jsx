import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
 
  const [count, setCount] = useState(1);
  const [name, setName] = useState('');

  const handleCountUpdate = () =>{
    setCount(count + 1);
  }

  const handleInputChange = (e) => {
    setName(e.target.value);
  }

  //useEffect : 마운트 , 업데이트(useState 변화 : 함수 재호출) , 언마운트
  useEffect(
    () => {  //콜백함수
        console.log("매번 랜더링");
    }
  )

  //처음 마운트 , count useState 변화 될 때마다
  useEffect(
    () =>{
        console.log("마운트 , count update 마다");
    } , [count] 
  )

  useEffect(
    () =>{
        console.log("마운트 , name update 마다");
    } , [name] 
  )

  //마운트 한번( 초기화)
   useEffect(
    () =>{
        console.log(" [] 한번만 마운트 ");
    } , [] 
  )

  return (
   <div className='App'>
        <button onClick={handleCountUpdate}>count_update</button>
        <span>count:{count}</span><br />
        <input type='text' value={name} onChange={handleInputChange} />
    </div>
  )
}

export default App
