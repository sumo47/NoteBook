import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import NoteState from './context/NoteState'
import Alert from '../src/components/Alert'

function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert/>
       <div className="container">
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
       </div>
      </Router>
      </NoteState>
  );
}

export default App;
