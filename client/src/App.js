import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/register/Signup';
import NavBar from './components/Navbar/Header';
import Home from './components/Home/homePage';
import ProfilePage from './components/Profile/profilePage';

function App() {
  return (
    <Router>
      <NavBar />
      <div className='App'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
