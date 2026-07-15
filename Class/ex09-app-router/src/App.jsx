import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Users from './components/Users';

function Home() {
    return (
        <div>
            <h3>Home Page</h3>
            <p>Welcome to Home</p>
        </div>
    )
}

function About() {
    return (
        <div>
            <h3>About Page</h3>
            <p>Welcome to About</p>
        </div>
    )
}

function Contact() {
    return (
        <div>
            <h3>Contact Page</h3>
            <p>Welcome to Contact</p>
        </div>
    )
}



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
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/contact' element={<Contact/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
