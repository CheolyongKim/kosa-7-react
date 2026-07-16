import './App.css'
import MultiInput from './Register';
import { useInput } from './useInput'

function displayData(message){
  alert(message);
}

function App() {

  const [inputValue, handleChange, handleSubmit] = useInput("hello", displayData);

  return (
   <div className='App'>
      <MultiInput/>
      <h3>useInput</h3>
      <input type={inputValue} onChange={handleChange} />
      <button onClick={handleSubmit}>확인</button>
   </div>
  )
}
export default App