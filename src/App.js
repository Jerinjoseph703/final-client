import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Properties from './components/Properties/Properties';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Admin from './components/Admin/Admin';
import Signup from './components/Login/Signup';
import Sidebar from './components/Admin/Sidebar';
import ShowProperty from './components/Properties/ShowProperty';
import AdminLogin from './components/Admin/AdminLogin';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/poperties' element={<Properties/>} />
          <Route path='/Login' element={<Login/>} />
          <Route path='/Signup' element={<Signup/>} />
          <Route path='/Admin' element={<Admin/>} />
          <Route path='/ShowProperty' element={<ShowProperty/>}/>
          <Route path='/adminLogin' element={<AdminLogin/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
