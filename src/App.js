import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import NoteState from './context/NoteState'
import PageState from './context/PageState'
import ThemeState from './context/ThemeState'
import Alert from '../src/components/Alert'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { useState } from 'react'
import Archive from './components/Archive'
import Search from './components/Search'
import PageManagement from './components/PageManagement'

function App() {
  const [alert, setAlert] = useState(null)

  const alertFunction = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }

  return (
    <Router>
      <ThemeState>
        <NoteState>
          <PageState>
            <Navbar />
            <Alert alert={alert} />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home showAlert={alertFunction} />} />
                <Route path="/about" element={<About showAlert={alertFunction} />} />
                <Route path="/login" element={<Login showAlert={alertFunction} />} />
                <Route path="/signUp" element={<SignUp showAlert={alertFunction} />} />
                <Route path="/archive" element={<Archive showAlert={alertFunction} />} />
                <Route path="/search" element={<Search showAlert={alertFunction} />} />
                <Route path="/pages" element={<PageManagement showAlert={alertFunction} />} />
              </Routes>
            </div>
          </PageState>
        </NoteState>
      </ThemeState>
    </Router>
  );
}

export default App;
