import './App.css';
import {
  BrowserRouter, Routes, Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import TodoState from './context/todos/TodoState';
function App() {
 
  return (
    <>
      <TodoState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert}  />
          <div className='container'>
            <Routes>
              <Route exact path='/' element={<Home />}  />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/signup' element={<Signup />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TodoState>
    </>
  );
}

export default App;
