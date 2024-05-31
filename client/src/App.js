import './App.css';
import HomePage from './components/Home/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/register/Signup';
import NavBar from './components/Navbar/Header';
import { useState } from 'react';
import Footer from './components/Footer/Footer';
import Blog from './components/blog/Blog';
function App() {
  return (
    <Router>
      <NavBar />
      <div className='App'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/new' element={<Blog />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
