import './App.css'
import Greeting from './components/Greeting';
import List from './components/List';
import User from './components/User';

function App() {

  const username="king";
  const constData=100;

 
  const user = {
    name:"kim",
    age:30,
    email:'kim@naver.com'
  }

  const todos = ["AAA" , "BBB" , "CCC"]

  return (
    <div className='App'>
        <Greeting name={username}  uname="world" conut={constData}  />
        <List items={todos} />
        <User user={user} />
    </div>
  )
}

export default App
