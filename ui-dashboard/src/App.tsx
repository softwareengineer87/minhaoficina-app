
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Sidebar } from './components/Sidebar';
import { CreateLaunch } from './pages/CreateLaunch';
import { Header } from './components/Header';
import { useContext } from 'react';
import { AuthContext } from './data/contexts/AuthContext';
import Login from './pages/Login';

function App() {

  const { business } = useContext(AuthContext);
  console.log(business);

  if (business?.token) {
    return (
      <div className='app'>
        <Sidebar />
        <div className='content'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create-launch' element={<CreateLaunch />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </div>
    )
  } else {
    return (
      <Login />
    );
  }
}

export default App
