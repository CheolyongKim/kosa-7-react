import { useState } from 'react';
import './App.css'

function App() {
 
  console.log("App 함수 호출");

  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  let nomalCount = 0; //local 변수 (함수 생성 .. 생성 ...소멸) : 함수가 재 호출되면 당근 초기화 된다

  const handleClick = () => {
    nomalCount+=1;
    setCount(count + 1);

    console.log("nomalCount: " + nomalCount);
    console.log("count : " + count);
  }

  const inputClick = (e) => {
    setText(e.target.value);
  }
  return (
    <div className='App'>
      <p>count: {count}</p>
      <button onClick={handleClick}>count증가</button>
      <hr />
      <input type="text" value={text} onChange={inputClick} />
      <p>Enter Text : {text}</p>
    </div>
  )
}

export default App
