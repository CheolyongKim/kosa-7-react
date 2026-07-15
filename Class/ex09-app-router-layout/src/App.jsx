import './App.css'
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Product'
import NotFound from './pages/NotFound'
import ProductDetail from './pages/ProductDetail'

function App() {

  return (
    <BrowserRouter>
                <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="home">Home</Link>
                        </li>
                        <li>
                            <Link to="about">About</Link>
                        </li>
                        <li>
                            <Link to="products">Products</Link>
                        </li>
                    </ul>
                </nav>
            </div>
    <Routes>
      
      <Route element={<RootLayout/>}>
        <Route index element={<Home/>}></Route>
        <Route path="about" element={<About/>}></Route>
        <Route path="products" element={<Products/>}></Route>
        <Route path="products/:id" element={<ProductDetail/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
