import './App.css';
import HomePage from './views/HomePage';
// import { CarouselWithContent } from './CarouselWithContent'

import APITest from './Components/GameSearch';
import { Routes, Route, Link } from 'react-router-dom';
import SignIn from './Components/SignIn';
import EditPage from './Components/EditPage';
import AllListPage from './Components/AllListPage';


function App() {
  return (
    <div className="App">
      <p>First Merge Commit</p>
      <Routes>
        <Route path="/" element={<HomePage />} />        
        <Route path='/register' element={<SignIn />} />
        <Route path='/edit' element={<EditPage />} />
        <Route path='/alllist' element={<AllListPage />} />
      </Routes>
      <APITest/>
    </div>
  );
}

export default App;
