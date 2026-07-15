import './App.css'
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Users from './components/Users';
function App() {
   /*
      주소창에
      http://localhost:5173

      http://localhost:5173/users

      http://localhost:5173/users/1
      http://localhost:5173/users/2
      
      useParams() > 1 또는 2


   */
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/users' element={<Users />} />
              <Route path='/user/:userId' element={<User />} />
          </Routes>
      </BrowserRouter>
  )  
}

export default App
