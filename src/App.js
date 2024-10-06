import './App.css'
import { BrowserRouter,  Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import User from './pages/User';



function App() {
  return (
    <div className='p-5 md:p-7 max-w-[1240px] mx-auto ' >
      <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="user/:id" element={<User/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
