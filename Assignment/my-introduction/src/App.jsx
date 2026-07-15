import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StickyText from './components/StickyText'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StickyText />
        <TechStack />
        <Projects />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
