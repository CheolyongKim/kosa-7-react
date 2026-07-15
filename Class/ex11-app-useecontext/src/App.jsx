import { createContext } from 'react'
import './App.css'
import { useState } from 'react';
import { useContext } from 'react';

const ThemeContext = createContext();

function App() {   // root component 

  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{theme,setTheme}}>
       <Toolbar/>  //나는 내가 쓰지 데이터 props 로 전달받지 않을거야
    </ThemeContext.Provider>
  )
}

//별도로 JSX 파일 만들지 않고 UI 컴포넌트 직접 ..구현 (함수 만들겠다)
function Toolbar(){
  return (
    <div>
        <h3>Toolbar</h3>
        <ThemeButton />
    </div>
  )
}

function ThemeButton(){
  //부모자원 전역자원처럼 하위 컴포넌트 가져다 쓰기 
  const {theme,setTheme}  = useContext(ThemeContext);
  
   return (
    //  <Toolbar/>  를 통해서 데이터 전달받지 않아도 root 로 부터 바로 가져올 수 있다 (useContext)
   
    <button     onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                style={{  backgroundColor: theme === 'light' ? '#fff' : '#333',
                   color: theme === 'light' ? '#000' : '#fff', }}>
                {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </button>
  )
}



export default App
