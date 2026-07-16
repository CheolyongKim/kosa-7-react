import { useState } from 'react';
import './App.css'

const hardCalculate = (number) => {
  for (let index = 0; index < 999999999; index++) {
    // do something
  }

  return number + 10000;
}

const easyCalculate = (number) => {
  return number+1;
}

function App() {

  const [hardNumber, setHardNumber] = useState(1);
  const [easyNumber, setEasyNumber] = useState(1);

  const hardSum = hardCalculate(hardNumber);
  const easySum = easyCalculate(easyNumber);

  return (
    <div className='App'>
      <h3>복잡한 계산 논리 수행</h3>
      <input type='number' value={hardNumber} onChange={(e) => {setHardNumber(parseInt(e.target.value))}}/>
      <span>+10000={hardSum}</span>

      <h3>단순한 계산 논리 수행</h3>
      <input type='number' value={easyNumber} onChange={(e) => {setEasyNumber(parseInt(e.target.value))}}/>
      <span>+1={easySum}</span>
    </div>
  )
}

export default App
