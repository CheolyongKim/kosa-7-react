import './App.css'
import { useState, useReducer } from 'react'

const ACTION_TYPES = {
  deposit: 'deposit',
  withdraw: 'withdraw'
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.deposit: return state + action.payload;
    case ACTION_TYPES.withdraw: return state - action.payload;
  }
}

function App() {

  const [number, setNumber] = useState(0);
  const [money, dispatch] = useReducer(reducer, 0);

  return (
    <div className='App'>
      <h3>KOSA 은행</h3>
      <p>잔액: {money}</p>
      <hr/>
      <input type='number' value={number} onChange={(e) => {setNumber(parseInt(e.target.value))}}></input>
      <hr/>
      <button onClick={() => {dispatch({type:"deposit", payload:number})}}>입금</button>
      <hr/>
      <button onClick={() => {dispatch({type:"withdraw", payload:number})}}>출금</button>
    </div>
  )
}

export default App
