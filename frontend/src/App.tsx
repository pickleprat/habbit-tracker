import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import Register from './pages/Register';
import type { JSX } from 'react';
import Hobbies from './pages/Hobbies';
import Settings from './pages/Settings';
import TaskPage  from './pages/Tasks';


function App() : JSX.Element {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile" element={<Hobbies/>}/> 
        <Route path="/settings" element={<Settings/>}/> 
        <Route path="/tasks/:hobbyId" element={<TaskPage />} />
        {/* <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
    </>
  )
}

export default App
